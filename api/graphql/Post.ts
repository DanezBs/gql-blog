// api/graphql/Post.ts
import { objectType, extendType, stringArg, nonNull, intArg, inputObjectType, arg, booleanArg, enumType, list, asNexusMethod } from 'nexus'

export const Post = objectType({
  name: 'Post',            // <- Name of your type
  definition(t) {
    t.int('id')            // <- Field named `id` of type `Int`
    t.string('title')      // <- Field named `title` of type `String`
    t.string('body')       // <- Field named `body` of type `String`
    t.boolean('published') // <- Field named `published` of type `Boolean`
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
        resolve: (_root, args, ctx) => {
         
          return ctx.db.post.create({
            data: {
              title: args.data.title,
              body: args.data.body,
              published: args.data.published
            },
          })
        },
      })
     
      
      
    },
    
  })