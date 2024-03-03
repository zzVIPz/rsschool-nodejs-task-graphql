import { Prisma, User } from '@prisma/client';
import { ICreateResources, IPrismaContext } from '../types/generalTypes.js';
import { UsersType } from '../queries/queryTypes.js';
import { CreateUserInputType } from './inputTypes.js';
import { UUIDType } from '../types/uuid.js';

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

  deleteUser: {
    type: UUIDType,
    args: { id: { type: UUIDType } },
    resolve: async (_obj, { id }: Pick<User, 'id'>, { prisma }: IPrismaContext) => {
      await prisma.user.delete({ where: { id } });

      return id;
    },
  },
};
