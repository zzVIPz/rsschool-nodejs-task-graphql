import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library.js';
import { HttpCompatibleError } from './handle-http-error.js';
import { HttpErrorCodes } from '@fastify/sensible/lib/httpError.js';

export default fp(async (fastify) => {
  const prisma = new PrismaClient({
    log: ['warn', 'error'],
  }).$extends({
    query: {
      $allOperations: ({ args, query }) => {
        fastify.prismaCallsCount += 1;
        return query(args).catch(handlePrismaError);
      },
    },
  }) as PrismaClient;

  fastify.decorate('prismaCallsCount', 0);
  fastify.decorate('prisma', prisma);
});

function handlePrismaError(error: unknown) {
  const info: { code: HttpErrorCodes; mes: string } = {
    code: 502,
    mes: 'Unexpected database error.',
  };

  if (error instanceof PrismaClientKnownRequestError) {
    let errorField = 'unknown';
    if (error.meta?.target && Array.isArray(error.meta.target)) {
      errorField = error.meta.target.join(', ');
    } else if (typeof error.meta?.field_name === 'string') {
      errorField = error.meta.field_name;
    }

    switch (error.code) {
      case 'P2002':
        info.mes = `Unique constraint: ${errorField}.`;
        info.code = 422;
        break;
      case 'P2003':
        info.mes = `Foreign key constraint: ${errorField}.`;
        info.code = 422;
        break;
      case 'P2025':
        info.mes = `One or more records that were required but not found: ${errorField}.`;
        info.code = 422;
        break;
      default:
        info.mes = `Known database client error.`;
        info.code = 502;
    }
  }
  if (error instanceof PrismaClientUnknownRequestError) {
    info.mes = 'Unknown database client error.';
    info.code = 502;
  }
  if (error instanceof PrismaClientValidationError) {
    info.mes = 'Database validation error.';
    info.code = 400;
  }
  if (error instanceof PrismaClientRustPanicError) {
    info.mes = 'Database is unavailable.';
    info.code = 502;
  }

  throw new HttpCompatibleError(info.code, info.mes);
}

declare module 'fastify' {
  export interface FastifyInstance {
    prisma: PrismaClient;
    prismaCallsCount: number;
  }
}
