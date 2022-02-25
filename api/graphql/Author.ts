// api/graphql/Author.ts
import { objectType, extendType, stringArg, nonNull, intArg, inputObjectType, arg, booleanArg, enumType, list, asNexusMethod} from 'nexus'
import { Post } from '.'
import { GraphQLDate } from 'graphql-iso-date'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')


export const Author = objectType({
  name: 'Author',            
  definition(t) {
    t.int('id')            
    t.string('name')      
    t.string('surname') 
    t.string('email')
    t.string('password')
    t.date('ts_created')
    t.list.field('posts', {
      type: Post,
      resolve(_root, args, ctx) {
        return ctx.db.post.findMany({
          where: { authorId: _root.id },
      })
      },
    })
    
    
  },
})
