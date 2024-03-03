import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { MemberTypeEnum } from './enums.js';
import { UUIDType } from './uuid.js';

export const MembersType = new GraphQLObjectType({
  name: 'MembersType',
  fields: {
    id: { type: MemberTypeEnum },
    postsLimitPerMonth: { type: GraphQLInt },
    discount: { type: GraphQLFloat },
  },
});

export const PostsType = new GraphQLObjectType({
  name: 'PostsType',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export const UsersType = new GraphQLObjectType({
  name: 'UsersType',
  fields: {
    id: { type: UUIDType },
    name: { type: GraphQLInt },
    balance: { type: GraphQLFloat },
  },
});

export const ProfilesType = new GraphQLObjectType({
  name: 'ProfilesType',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  },
});
