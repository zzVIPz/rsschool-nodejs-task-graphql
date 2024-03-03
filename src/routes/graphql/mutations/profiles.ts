import { Prisma } from '@prisma/client';
import { ICreateResources, IPrismaContext } from '../types/generalTypes.js';
import { ProfilesType } from '../queries/queryTypes.js';
import { CreateProfileInputType } from './inputTypes.js';

export default {
  createProfile: {
    type: ProfilesType,
    args: {
      dto: { type: CreateProfileInputType },
    },
    resolve: async (
      _obj,
      { dto }: ICreateResources<Prisma.ProfileCreateInput>,
      { prisma }: IPrismaContext,
    ) => await prisma.profile.create({ data: dto }),
  },
};
