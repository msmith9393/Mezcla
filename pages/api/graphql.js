import { gql, ApolloServer } from 'apollo-server-micro';
import Knex from 'knex';
import Dataloader from 'dataloader';
// TODO - Prod versus dev
const db = new Knex({
    client: 'pg',
    connection: 'postgres://megansmith@localhost:5432/mezcla'
});

const typeDefs = gql`
    type Query {
        recipes(first: Int = 2, skip: Int = 0): [Recipe!]!
    }

    type Recipe {
        id: ID!
        name: String!
        description: String!
        instructions: String!
        ingredients: String!
        active_time: String!
        total_time: String!
        serves: String!
        level: String!
        image: String!
        slug: String!
        tags(first: Int = 10, skip: Int = 0): [Tag!]!
        reviews(first: Int = 10, skip: Int = 0): [Review!]!
    }

    type Tag {
        id: ID!
        tag: String!
        recipe: Recipe!
    }

    type Review {
        id: ID!
        review: Int!
        comment: String!
    }
`;

const resolvers = {
    Query: {
        recipes: (_parent, args, { loader }) => {
            return db
                .select('*')
                .from('recipes')
                .orderBy('created_at', 'desc')
                .limit(Math.min(args.first, 50))
                .offset(args.skip);
        },
    },

    Recipe: {
        tags: (recipe, _args, { loader }) => {
            return loader.tags.load(recipe.id);
        },
        reviews: (recipe, _args, { loader }) => {
            return loader.reviews.load(recipe.id);
        }
    },
};

const loader = {
    tags: new Dataloader((ids) => {
        return db.select('*')
            .from('tags')
            .whereIn('recipe_id', ids)
            .then((rows) => {
                return ids.map((id) => {
                    return rows.filter((row) => {
                        return row.recipe_id === id;
                    });
                });
            });
    }),
    reviews: new Dataloader((ids) => {
        return db.select('*')
            .from('reviews')
            .whereIn('recipe_id', ids)
            .then((rows) => {
                return ids.map((id) => {
                    return rows.filter((row) => {
                        return row.recipe_id === id;
                    });
                });
            });
    }),
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {
            loader,
        };
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
