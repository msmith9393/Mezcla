/* eslint-disable no-unused-vars */
import { gql, ApolloServer } from 'apollo-server-micro';
import Dataloader from 'dataloader';
import { makeExecutableSchema } from 'graphql-tools';
import { MongoClient } from 'mongodb';
import uniqid from 'uniqid';

require('dotenv').config();

const typeDefs = gql`
    type Query {
        recipes(first: Int = 20, skip: Int = 0): [Recipe!]!
        users: [User]!
        recipeBySlug(slug: String!): Recipe!
    }

    type Mutation {
        createRecipe(name: String, description: String, instructions: [String], ingredients: [String], activeTime: String, totalTime: String, serves: String, level: String, author: String, email: String, imageUrl: String): Recipe
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }

    type Recipe {
        _id: ID!
        name: String!
        slug: String!
        description: String!
        instructions: [String!]!
        ingredients: [String!]!
        activeTime: String!
        totalTime: String!
        serves: Int!
        level: String!
        language: String!
        createdAt: String!
        modifiedAt: String!
        author: String!
        email: String!
        imageUrl: String!
    }
`;
// recipesByUser(user_id: Int, first: Int = 10, skip: Int = 0): [Recipe!]!
// favoriteRecipes(user_id: Int, first: Int = 10, skip: Int = 0): [Liked!]!
//

const resolvers = {
    Query: {
        users(_parent, _args, context) {
            return context.db
                .collection('users')
                .find()
                .toArray()
                .then((data) => data);
        },
        recipes(_parent, args, context) {
            return context.db
                .collection('recipes')
                .find()
                .skip(args.skip)
                .limit(Math.min(args.first, 50))
                .toArray()
                .then((data) => data);
        },
        recipeBySlug(_parent, args, context) {
            return context.db
                .collection('recipes')
                .findOne({ slug: args.slug })
                .then((data) => data);
        },
    },
    Mutation: {
        createRecipe: async (_, params, context) => {
            const date = Date.now();
            const slug = uniqid();

            context.db
                .collection('recipes')
                .insertOne({
                    slug,
                    language: 'en',
                    createdAt: date,
                    modifiedAt: date,
                    ...params,
                }, {
                    writeConcern: {
                        w: 'majority',
                        wtimeout: 100,
                    },
                });

            return context.db
                .collection('recipes')
                .findOne({ slug })
                .then((data) => data);
        },
    },
//         recipes: (_parent, args, _context) => db
//             .select('*')
//             .from('recipes')
//             .orderBy('created_at', 'desc')
//             .limit(Math.min(args.first, 50))
//             .offset(args.skip),
//         recipesByUser: (_parent, args, _context) => db
//             .select('*')
//             .from('recipes')
//             .where('user_id', args.user_id)
//             .orderBy('created_at', 'desc')
//             .limit(Math.min(args.first, 50))
//             .offset(args.skip),
//         favoriteRecipes: (_parent, args, _context) => db.select('*')
//             .from('liked')
//             .where('liked.user_id', args.user_id)
//             .orderBy('created_at', 'desc')
//             .limit(Math.min(args.first, 50))
//             .offset(args.skip),
//         recipeBySlug: (_parent, args, _context) => db
//             .select('*')
//             .from('recipes')
//             .where('slug', args.slug)
//             .first(),
//     },
//
//     Liked: {
//         recipe: (liked, _args, { loader }) => db
//             .select('*')
//             .from('recipes')
//             .where('id', liked.recipe_id)
//             .first(),
//         user: (liked, _args, _context) => db
//             .select('*')
//             .from('users')
//             .where('id', liked.user_id)
//             .first(),
//     },
//
//     Recipe: {
//         tags: (recipe, _args, { loader }) => loader.tags.load(recipe.id),
//         reviews: (recipe, _args, { loader }) => loader.reviews.load(recipe.id),
//         user: (recipe, _args, _context) => db
//             .select('*')
//             .from('users')
//             .where('id', recipe.user_id)
//             .first(),
//         liked: (recipe, args, _context) => db
//             .select('*')
//             .from('liked')
//             .where({
//                 user_id: args.user_id,
//                 recipe_id: recipe.id,
//             })
//             .first() || false,
//     },
//
//     Review: {
//         user: (review, _args, _context) => db
//             .select('*')
//             .from('users')
//             .where('id', review.user_id)
//             .first(),
//     },
};

const loader = {
//     recipes: new Dataloader((ids) => db.select('*')
//         .from('recipes')
//         .whereIn('id', ids)
//         .then((rows) => ids.map((id) => rows.filter((row) => row.recipe_id === id)))),
//     tags: new Dataloader((ids) => db.select('*')
//         .from('tags')
//         .whereIn('recipe_id', ids)
//         .then((rows) => ids.map((id) => rows.filter((row) => row.recipe_id === id)))),
//     reviews: new Dataloader((ids) => db.select('*')
//         .from('reviews')
//         .whereIn('recipe_id', ids)
//         .then((rows) => ids.map((id) => rows.filter((row) => row.recipe_id === id)))),
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

let db;

const apolloServer = new ApolloServer({
    schema,
    context: async () => {
        if (!db) {
            try {
                const dbClient = new MongoClient(
                    process.env.MONGO_DB_URI,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                );

                if (!dbClient.isConnected()) {
                    await dbClient.connect();
                }

                db = dbClient.db('next-graphql');
            } catch (e) {
                console.error('--->error while connecting with graphql context (db)', e);
            }
        }

        return { db };
    },
});

const handler = apolloServer.createHandler({
    path: '/api/graphql',
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
