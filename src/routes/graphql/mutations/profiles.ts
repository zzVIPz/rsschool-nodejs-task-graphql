import { Prisma, Profile } from '@prisma/client';
import { ICreateResources, IPrismaContext } from '../types/generalTypes.js';
import { ProfilesType } from '../queries/queryTypes.js';
import { CreateProfileInputType } from './inputTypes.js';
import { UUIDType } from '../types/uuid.js';

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

  deleteProfile: {
    type: UUIDType,
    args: { id: { type: UUIDType } },
    resolve: async (_obj, { id }: Pick<Profile, 'id'>, { prisma }: IPrismaContext) => {
      await prisma.profile.delete({ where: { id } });

      return id;
    },
  },
};
