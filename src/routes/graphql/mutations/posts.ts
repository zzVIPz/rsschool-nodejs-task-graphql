import { Prisma } from '@prisma/client';
import { ICreateResources, IPrismaContext } from '../types/generalTypes.js';
import { PostsType } from '../queries/queryTypes.js';
import { CreatePostInputType } from './inputTypes.js';

export default {
  createPost: {
    type: PostsType,
    args: {
      dto: { type: CreatePostInputType },
    },
    resolve: async (
      _obj,
      { dto }: ICreateResources<Prisma.PostCreateInput>,
      { prisma }: IPrismaContext,
    ) => await prisma.post.create({ data: dto }),
  },
};
