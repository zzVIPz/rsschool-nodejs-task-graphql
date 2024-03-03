import { GraphQLList } from 'graphql';
import { User } from '@prisma/client';
import { IPrismaContext } from '../types/generalTypes.js';
import { UsersType } from './queryTypes.js';
import { UUIDType } from '../types/uuid.js';

export default {
  users: {
    type: new GraphQLList(UsersType),
    resolve: async (_obj, _args, { prisma }: IPrismaContext) =>
      await prisma.user.findMany(),
  },
  user: {
    type: UsersType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_obj, { id }: User, { prisma }: IPrismaContext) =>
      await prisma.user.findUnique({ where: { id } }),
  },
};
