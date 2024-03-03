import { PrismaClient } from '@prisma/client';

export interface IPrismaContext {
  prisma: PrismaClient;
}

export interface ICreateResources<T> {
  id?: string;
  dto: T;
}
