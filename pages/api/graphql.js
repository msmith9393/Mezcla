/* eslint-disable no-unused-vars */
import { gql, ApolloServer } from 'apollo-server-micro';
import Knex from 'knex';
import Dataloader from 'dataloader';

// TODO - Prod versus dev
const db = new Knex({
    client: 'pg',
    connection: 'postgres://megansmith@localhost:5432/mezcla',
});

const typeDefs = gql`
    type Query {
        recipes(first: Int = 10, skip: Int = 0): [Recipe!]!
        recipesByUser(user_id: Int, first: Int = 10, skip: Int = 0): [Recipe!]!
        favoriteRecipes(user_id: Int, first: Int = 10, skip: Int = 0): [Liked!]!
        recipeBySlug(slug: String!): Recipe!
    }

    type Recipe {
        id: ID!
        slug: String!
        name: String!
        image: String!
        description: String!
        ingredients: String!
        instructions: String!
        active_time: String!
        total_time: String!
        serves: String!
        level: String!
        language: String!
        tags(first: Int = 10, skip: Int = 0): [Tag!]!
        reviews(first: Int = 10, skip: Int = 0): [Review!]!
        user: User!
        liked(user_id: Int): Liked
    }

    type Tag {
        id: ID!
        value: String!
    }

    type User {
        first_name: String!
        last_name: String!
        language: String!
    }

    type Review {
        id: ID!
        review: Int!
        comment: String!
        user: User!
    }

    type Liked {
        id: ID!
        value: Boolean!
        user: User!
        recipe: Recipe!
    }
`;

const resolvers = {
    Query: {
        recipes: (_parent, args, _context) => db
            .select('*')
            .from('recipes')
            .orderBy('created_at', 'desc')
            .limit(Math.min(args.first, 50))
            .offset(args.skip),
        recipesByUser: (_parent, args, _context) => db
            .select('*')
            .from('recipes')
            .where('user_id', args.user_id)
            .orderBy('created_at', 'desc')
            .limit(Math.min(args.first, 50))
            .offset(args.skip),
        favoriteRecipes: (_parent, args, _context) => db.select('*')
            .from('liked')
            .where('liked.user_id', args.user_id)
            .orderBy('created_at', 'desc')
            .limit(Math.min(args.first, 50))
            .offset(args.skip),
        recipeBySlug: (_parent, args, _context) => db
            .select('*')
            .from('recipes')
            .where('slug', args.slug)
            .first(),
    },

    Liked: {
        recipe: (liked, _args, { loader }) => db
            .select('*')
            .from('recipes')
            .where('id', liked.recipe_id)
            .first(),
        user: (liked, _args, _context) => db
            .select('*')
            .from('users')
            .where('id', liked.user_id)
            .first(),
    },

    Recipe: {
        tags: (recipe, _args, { loader }) => loader.tags.load(recipe.id),
        reviews: (recipe, _args, { loader }) => loader.reviews.load(recipe.id),
        user: (recipe, _args, _context) => db
            .select('*')
            .from('users')
            .where('id', recipe.user_id)
            .first(),
        liked: (recipe, args, _context) => db
            .select('*')
            .from('liked')
            .where({
                user_id: args.user_id,
                recipe_id: recipe.id,
            })
            .first() || false,
    },

    Review: {
        user: (review, _args, _context) => db
            .select('*')
            .from('users')
            .where('id', review.user_id)
            .first(),
    },
};

const loader = {
    recipes: new Dataloader((ids) => db.select('*')
        .from('recipes')
        .whereIn('id', ids)
        .then((rows) => ids.map((id) => rows.filter((row) => row.recipe_id === id)))),
    tags: new Dataloader((ids) => db.select('*')
        .from('tags')
        .whereIn('recipe_id', ids)
        .then((rows) => ids.map((id) => rows.filter((row) => row.recipe_id === id)))),
    reviews: new Dataloader((ids) => db.select('*')
        .from('reviews')
        .whereIn('recipe_id', ids)
        .then((rows) => ids.map((id) => rows.filter((row) => row.recipe_id === id)))),
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        loader,
    }),
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
