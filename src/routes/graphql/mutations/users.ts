import { Prisma, SubscribersOnAuthors, User } from '@prisma/client';
import { ICreateResources, IPrismaContext } from '../types/generalTypes.js';
import { UsersType } from '../queries/queryTypes.js';
import { ChangeUserInputType, CreateUserInputType } from './inputTypes.js';
import { UUIDType } from '../types/uuid.js';
import { GraphQLString } from 'graphql';

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

  changeUser: {
    type: UsersType,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeUserInputType },
    },
    resolve: async (
      _obj,
      { id, dto }: ICreateResources<Prisma.UserUpdateInput>,
      { prisma }: IPrismaContext,
    ) => await prisma.user.update({ where: { id }, data: dto }),
  },

  subscribeTo: {
    type: UsersType,
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    resolve: async (
      _obj,
      { userId, authorId }: SubscribersOnAuthors & { userId: string },
      { prisma }: IPrismaContext,
    ) =>
      await prisma.subscribersOnAuthors.create({
        data: { subscriberId: userId, authorId },
      }),
  },

  unsubscribeFrom: {
    type: GraphQLString,
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    resolve: async (
      _obj,
      { userId: subscriberId, authorId }: SubscribersOnAuthors & { userId: string },
      { prisma }: IPrismaContext,
    ) => {
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId,
            authorId,
          },
        },
      });

      return subscriberId;
    },
  },
};
