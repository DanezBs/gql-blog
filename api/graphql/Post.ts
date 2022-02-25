// api/graphql/Post.ts
import { objectType, extendType, stringArg, nonNull, intArg, inputObjectType, arg, booleanArg, enumType, list, asNexusMethod } from 'nexus'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import { z } from "zod"

export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'datetime')

export const Post = objectType({
  name: 'Post',            // <- Name of your type
  definition(t) {
    t.int('id')            // <- Field named `id` of type `Int`
    t.string('title')      // <- Field named `title` of type `String`
    t.string('body')       // <- Field named `body` of type `String`
    t.boolean('published') // <- Field named `published` of type `Boolean`
    t.datetime('ts_created')
    t.int('authorId')            // <- Field named `id` of type `Int`
    t.field("postedBy", {   // 1
      type: "Author",
      resolve(parent, args, context) {  // 2
          return context.db.author
              .findUnique({ where: { id: parent.authorId } });
      },
  });
    
  },
})


export const PostCreateInput = inputObjectType({
    name: 'PostCreateInput',
    definition(t) {
      t.nonNull.string('title')
      t.string('body')
      t.boolean('published')
    },
  })

  async function validateCreatePost(args: any, ctx:any) {
    const schema = z.object({
      title: z
        .string()
        .min(5,{ message: "Il titolo deve essera almeno di 5 lettere" })
        
    })
  
    await schema.parseAsync(args)
  }

  export const PostMutation = extendType({
    type: 'Mutation',
    definition(t) {
     
      t.nonNull.field('createPost', {
        type: 'Post',
        args: {
          data: nonNull(
            arg({
              type: 'PostCreateInput',
            }),
          ),
        },
        validate: async (_, args, ctx) => {
          await validateCreatePost(args.data, ctx)
        },
        resolve: (_root, args, ctx) => {
          const { userId } = ctx;
          if (!userId) {  // 1
            throw new Error("Cannot post without logging in.");
        }
          return ctx.db.post.create({
            data: {
              title: args.data.title,
              body: args.data.body,
              published: args.data.published,
              authorId: userId
              
            },
          })
        },
      })
      
      
      t.field('deletePost', {
        type: 'Post',
        args: {
          id: nonNull(intArg())
        },
        resolve(_root, args, ctx) {
          const { userId } = ctx;
          if (!userId) {  // 1
            throw new Error("Log in!");
        }
          return ctx.db.post.delete({
            where: {
              id: args.id
            }
          })
        },
      })
      
    },
    
  })


  export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
      t.field('viewPost', {
        type: 'Post',
        args: {
          id: nonNull(intArg()),
        },
        resolve(_root, args, ctx) {
          const { userId } = ctx;
          if (!userId) {  // 1
            throw new Error("Cannot post without logging in.");
          }
          return ctx.db.post.findUnique({
            where: { 
              id: args.id
            }
          })
        },
      })
  
      
      /*
      t.nonNull.list.nonNull.field("listPosts", {
        type: "Post",
        args: {
            filter: stringArg(),   // 1
            myWhere: arg({
              type: 'PostWhereInput',
            }),
            skip: intArg(),   // 1
            take: intArg(),   // 1
            myCursor: intArg(),   // 1
            orderBy: arg({ type: list(nonNull(PostOrderByInput)) }),  // 1
        },
        resolve(parent, args, ctx) {
            return ctx.db.post.findMany({
              
              where: {
                OR: [
                  { title: { contains: args.filter || undefined } },
                  { body: { contains: args.filter || undefined } },
                ],
              },
              
              //where: args?.myWhere,
              skip: args?.skip as number | undefined,    // 2
              take: args?.take as number | undefined,
              cursor: {
                id: args.myCursor,
              },
              orderBy: args?.orderBy as db.Enumerable<db.PostOrderByInput> | undefined,
            });
        },
    })
    */
    },
  })