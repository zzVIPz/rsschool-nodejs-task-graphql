import { Prisma } from '@prisma/client';
import { ICreateResources, IPrismaContext } from '../types/generalTypes.js';
import { UsersType } from '../queries/queryTypes.js';
import { CreateUserInputType } from './inputTypes.js';

export default {
  createUser: {
    type: UsersType,
    args: {
      dto: { type: CreateUserInputType },
    },
    resolve: async (
      _obj,
      { dto }: ICreateResources<Prisma.UserCreateInput>,
      { prisma }: IPrismaContext,
    ) => await prisma.user.create({ data: dto }),
  },
};
