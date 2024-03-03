import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { MemberTypeEnum } from './enums.js';
import { UUIDType } from './uuid.js';
import { IPrismaContext } from './generalTypes.js';
import { Profile, User } from '@prisma/client';

export const MembersType = new GraphQLObjectType({
  name: 'MembersType',
  fields: {
    id: { type: MemberTypeEnum },
    postsLimitPerMonth: { type: GraphQLInt },
    discount: { type: GraphQLFloat },
  },
});

export const PostsType = new GraphQLObjectType({
  name: 'PostsType',
  fields: {
    id: { type: UUIDType },
    authorId: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export const ProfilesType = new GraphQLObjectType({
  name: 'ProfilesType',
  fields: {
    id: { type: UUIDType },
    userId: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MembersType },
    memberType: {
      type: MembersType,
      resolve: async ({ memberTypeId }: Profile, _args, { prisma }: IPrismaContext) =>
        await prisma.memberType.findUnique({ where: { id: memberTypeId } }),
    },
  },
});

export const UsersType = new GraphQLObjectType({
  name: 'UsersType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfilesType,
      resolve: async ({ id }: User, _args, { prisma }: IPrismaContext) =>
        await prisma.profile.findUnique({ where: { userId: id } }),
    },
    posts: {
      type: new GraphQLList(PostsType),
      resolve: async ({ id }: User, _args, { prisma }: IPrismaContext) =>
        await prisma.post.findMany({ where: { authorId: id } }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UsersType),
      resolve: async ({ id }: User, _args, { prisma }: IPrismaContext) =>
        await prisma.subscribersOnAuthors
          .findMany({
            where: { subscriberId: id },
            include: { author: true },
          })
          .then((data) => data.map(({ author }) => author)),
    },
    subscribedToUser: {
      type: new GraphQLList(UsersType),
      resolve: async ({ id }: User, _args, { prisma }: IPrismaContext) =>
        await prisma.subscribersOnAuthors
          .findMany({
            where: { authorId: id },
            include: { subscriber: true },
          })
          .then((data) => data.map(({ subscriber }) => subscriber)),
    },
  }),
});
