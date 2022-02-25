// api/graphql/Author.ts
import { objectType, extendType, stringArg, nonNull, intArg, inputObjectType, arg, booleanArg, enumType, list, asNexusMethod} from 'nexus'
import { Post } from '.'
import { GraphQLDate } from 'graphql-iso-date'
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from '../utils/auth';

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


export const generateHashPassword = (password: String) => {
  if (password.length < 8) {
      throw new Error("Password should be greater than 8 characters");
  }
 
  return bcrypt.hash(password, 10);
};

export const LoginAuthorInput = inputObjectType({
  name: 'LoginAuthorInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
      t.nonNull.string("token");
      t.nonNull.field("author", {
          type: "Author",
      });
  },
});

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
        const password = await generateHashPassword(args.data.password);
        return ctx.db.author.create({
          data: {
            name: args.data.name,
            surname: args.data.surname,
            email: args.data.email,
            password: password,
            
          },
        })
    },
    }),
    t.nonNull.field("loginAuthor", { 
      type: "AuthPayload",
      args: {
        data: nonNull(
          arg({
            type: 'LoginAuthorInput',
          }),
        ),
      },
      async resolve(_root, args, ctx) {
          // 1
          const author = await ctx.db.author.findUnique({
              where: { email: args.data.email },
          });
          if (!author) {
              throw new Error("No such user found");
          }

          // 2
          const valid = await bcrypt.compare(
              args.data.password,
              author.password,
          );
          if (!valid) {
              throw new Error("Invalid password"+args.data.password+"  "+author.password);
          }

          // 3
          const token = jwt.sign({ userId: author.id }, APP_SECRET);

          // 4
          return {
              token,
              author
          };
      },
  })
    
    
    
  },
  
})
