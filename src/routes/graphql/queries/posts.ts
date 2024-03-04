import { GraphQLList } from 'graphql';
import { User } from '@prisma/client';
import { IPrismaContext } from '../types/generalTypes.js';
import { PostsType } from './queryTypes.js';
import { UUIDType } from '../types/uuid.js';

export default {
  posts: {
    type: new GraphQLList(PostsType),
    resolve: async (_obj, _args, { prisma }: IPrismaContext) =>
      await prisma.post.findMany(),
  },
  post: {
    type: PostsType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_obj, { id }: User, { prisma }: IPrismaContext) =>
      await prisma.post.findUnique({ where: { id } }),
  },
};
