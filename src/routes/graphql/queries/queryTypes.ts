import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { MemberTypeEnum } from '../types/enums.js';
import { UUIDType } from '../types/uuid.js';
import { IPrismaContext } from '../types/generalTypes.js';
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
      resolve: async ({ memberTypeId }: Profile, _args, { loaders }: IPrismaContext) =>
        await loaders?.members.load(memberTypeId),
    },
  },
});

export const UsersType: GraphQLObjectType<User, IPrismaContext> = new GraphQLObjectType({
  name: 'UsersType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfilesType,
      resolve: async ({ id }: User, _args, { loaders }: IPrismaContext) =>
        await loaders?.profiles.load(id),
    },
    posts: {
      type: new GraphQLList(PostsType),
      resolve: async ({ id }: User, _args, { loaders }: IPrismaContext) =>
        await loaders?.posts.load(id),
    },
    userSubscribedTo: {
      type: new GraphQLList(UsersType),
      resolve: async ({ id }: User, _args, { loaders }: IPrismaContext) =>
        await loaders?.userSubscribedTo.load(id),
    },

    subscribedToUser: {
      type: new GraphQLList(UsersType),
      resolve: async ({ id }: User, _args, { loaders }: IPrismaContext) =>
        await loaders?.subscribedToUser.load(id),
    },
  }),
});
