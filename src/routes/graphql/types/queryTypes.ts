import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const MembersType = new GraphQLObjectType({
  name: 'MembersType',
  fields: {
    id: { type: GraphQLID },
    postsLimitPerMonth: { type: GraphQLInt },
    discount: { type: GraphQLFloat },
  },
});

export const PostsType = new GraphQLObjectType({
  name: 'PostsType',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export const UsersType = new GraphQLObjectType({
  name: 'UsersType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLInt },
    balance: { type: GraphQLFloat },
  },
});

export const ProfilesType = new GraphQLObjectType({
  name: 'ProfilesType',
  fields: {
    id: { type: GraphQLID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  },
});
