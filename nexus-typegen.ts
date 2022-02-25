/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./api/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  LoginAuthorInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  PostCreateInput: { // input type
    authorId: number; // Int!
    body?: string | null; // String
    published?: boolean | null; // Boolean
    title: string; // String!
  }
  SignupAuthorInput: { // input type
    email: string; // String!
    name: string; // String!
    password: string; // String!
    surname: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    author: NexusGenRootTypes['Author']; // Author!
    token: string; // String!
  }
  Author: { // root type
    email?: string | null; // String
    id?: number | null; // Int
    name?: string | null; // String
    password?: string | null; // String
    surname?: string | null; // String
    ts_created?: NexusGenScalars['Date'] | null; // Date
  }
  Mutation: {};
  Post: { // root type
    body?: string | null; // String
    id?: number | null; // Int
    published?: boolean | null; // Boolean
    title?: string | null; // String
    ts_created?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    author: NexusGenRootTypes['Author']; // Author!
    token: string; // String!
  }
  Author: { // field return type
    email: string | null; // String
    id: number | null; // Int
    name: string | null; // String
    password: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    surname: string | null; // String
    ts_created: NexusGenScalars['Date'] | null; // Date
  }
  Mutation: { // field return type
    createPost: NexusGenRootTypes['Post']; // Post!
    loginAuthor: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signupAuthor: NexusGenRootTypes['Author']; // Author!
  }
  Post: { // field return type
    body: string | null; // String
    id: number | null; // Int
    published: boolean | null; // Boolean
    title: string | null; // String
    ts_created: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: { // field return type
    ok: boolean; // Boolean!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    author: 'Author'
    token: 'String'
  }
  Author: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    password: 'String'
    posts: 'Post'
    surname: 'String'
    ts_created: 'Date'
  }
  Mutation: { // field return type name
    createPost: 'Post'
    loginAuthor: 'AuthPayload'
    signupAuthor: 'Author'
  }
  Post: { // field return type name
    body: 'String'
    id: 'Int'
    published: 'Boolean'
    title: 'String'
    ts_created: 'DateTime'
  }
  Query: { // field return type name
    ok: 'Boolean'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createPost: { // args
      data: NexusGenInputs['PostCreateInput']; // PostCreateInput!
    }
    loginAuthor: { // args
      data: NexusGenInputs['LoginAuthorInput']; // LoginAuthorInput!
    }
    signupAuthor: { // args
      data: NexusGenInputs['SignupAuthorInput']; // SignupAuthorInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}