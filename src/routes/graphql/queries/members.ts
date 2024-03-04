import { GraphQLList } from 'graphql';
import { MemberType } from '@prisma/client';
import { IPrismaContext } from '../types/generalTypes.js';
import { MembersType } from './queryTypes.js';
import { MemberTypeEnum } from '../types/enums.js';

export default {
  memberTypes: {
    type: new GraphQLList(MembersType),
    resolve: async (_obj, _args, { prisma }: IPrismaContext) =>
      await prisma.memberType.findMany(),
  },
  memberType: {
    type: MembersType,
    args: {
      id: { type: MemberTypeEnum },
    },
    resolve: async (_obj, { id }: MemberType, { prisma }: IPrismaContext) =>
      await prisma.memberType.findUnique({ where: { id } }),
  },
};
