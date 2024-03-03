import { PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';

export interface IPrismaContext {
  prisma: PrismaClient;
}

export interface IUUID {
  id: string;
}
export interface IMemberTypeId {
  id: MemberTypeId;
}

