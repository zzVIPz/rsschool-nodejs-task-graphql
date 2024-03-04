import { GraphQLList } from 'graphql';
import { User } from '@prisma/client';
import { IPrismaContext } from '../types/generalTypes.js';
import { ProfilesType } from './queryTypes.js';
import { UUIDType } from '../types/uuid.js';

export default {
  profiles: {
    type: new GraphQLList(ProfilesType),
    resolve: async (_obj, _args, { prisma }: IPrismaContext) =>
      await prisma.profile.findMany(),
  },
  profile: {
    type: ProfilesType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_obj, { id }: User, { prisma }: IPrismaContext) =>
      await prisma.profile.findUnique({ where: { id } }),
  },
};
