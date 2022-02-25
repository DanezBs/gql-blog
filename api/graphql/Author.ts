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


export const SignupAuthorInput = inputObjectType({
  name: 'SignupAuthorInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('surname')
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

export const AuthorMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signupAuthor', {
      type: 'Author',
      args: {
        data: nonNull(
          arg({
            type: 'SignupAuthorInput',
          }),
        ),
      },
      async resolve(_root, args, ctx) {
        //const password = await bcrypt.hash(args.data.password, 10);
        return ctx.db.author.create({
          data: {
            name: args.data.name,
            surname: args.data.surname,
            email: args.data.email,
            password: args.data.password,
            
          },
        })
    },
    })
    
    
  },
  
})
