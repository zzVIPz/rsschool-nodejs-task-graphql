import { Post, Prisma } from '@prisma/client';
import { ICreateResources, IPrismaContext } from '../types/generalTypes.js';
import { PostsType } from '../queries/queryTypes.js';
import { CreatePostInputType, ChangePostInputType } from './inputTypes.js';
import { UUIDType } from '../types/uuid.js';

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

  deletePost: {
    type: UUIDType,
    args: { id: { type: UUIDType } },
    resolve: async (_obj, { id }: Pick<Post, 'id'>, { prisma }: IPrismaContext) => {
      await prisma.post.delete({ where: { id } });

      return id;
    },
  },

  changePost: {
    type: PostsType,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangePostInputType },
    },
    resolve: async (
      _obj,
      { id, dto }: ICreateResources<Prisma.PostUpdateInput>,
      { prisma }: IPrismaContext,
    ) => await prisma.post.update({ where: { id }, data: dto }),
  },
};