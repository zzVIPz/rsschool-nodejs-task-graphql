import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { MembersType, PostsType, ProfilesType, UsersType } from './types/queryTypes.js';
import { PrismaContext } from './types/generalTypes.js';

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
        resolve: (_obj, _args, { prisma }: PrismaContext) => prisma.memberType.findMany(),
      },
      posts: {
        type: new GraphQLList(PostsType),
        resolve: (_obj, _args, { prisma }: PrismaContext) => prisma.post.findMany(),
      },
      users: {
        type: new GraphQLList(UsersType),
        resolve: (_obj, _args, { prisma }: PrismaContext) => prisma.user.findMany(),
      },
      profiles: {
        type: new GraphQLList(ProfilesType),
        resolve: (_obj, _args, { prisma }: PrismaContext) => prisma.profile.findMany(),
      },
    },
  }),
});
