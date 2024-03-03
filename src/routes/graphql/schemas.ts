import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { MembersType, PostsType, ProfilesType, UsersType } from './types/queryTypes.js';
import { IMemberTypeId, IPrismaContext } from './types/generalTypes.js';
import { UUIDType } from './types/uuid.js';
import { MemberTypeEnum } from './types/enums.js';
import { User } from '@prisma/client';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      memberTypes: {
        type: new GraphQLList(MembersType),
        resolve: (_obj, _args, { prisma }: IPrismaContext) =>
          prisma.memberType.findMany(),
      },
      memberType: {
        type: MembersType,
        args: {
          id: { type: MemberTypeEnum },
        },
        resolve: (_obj, { id }: IMemberTypeId, { prisma }: IPrismaContext) =>
          prisma.memberType.findUnique({ where: { id } }),
      },
      posts: {
        type: new GraphQLList(PostsType),
        resolve: (_obj, _args, { prisma }: IPrismaContext) => prisma.post.findMany(),
      },
      post: {
        type: PostsType,
        args: {
          id: { type: UUIDType },
        },
        resolve: (_obj, { id }: User, { prisma }: IPrismaContext) =>
          prisma.post.findUnique({ where: { id } }),
      },
      users: {
        type: new GraphQLList(UsersType),
        resolve: (_obj, _args, { prisma }: IPrismaContext) => prisma.user.findMany(),
      },
      user: {
        type: UsersType,
        args: {
          id: { type: UUIDType },
        },
        resolve: (_obj, { id }: User, { prisma }: IPrismaContext) =>
          prisma.user.findUnique({ where: { id } }),
      },
      profiles: {
        type: new GraphQLList(ProfilesType),
        resolve: (_obj, _args, { prisma }: IPrismaContext) => prisma.profile.findMany(),
      },
      profile: {
        type: ProfilesType,
        args: {
          id: { type: UUIDType },
        },
        resolve: (_obj, { id }: User, { prisma }: IPrismaContext) =>
          prisma.profile.findUnique({ where: { id } }),
      },
    },
  }),
});
