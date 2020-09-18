import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';
import Search from '../components/search';

export default function Recipes({ recipes }) {
    return (
        <Layout
            pageTitle="All Recipes"
            pageDescription="Search all recipes"
            image=""
        >
            <Search />
            <RecipeList recipes={recipes} />
        </Layout>
    );
}

Recipes.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getServerSideProps() {
    const cache = new InMemoryCache();
    const link = createHttpLink({
        uri: 'http://localhost:3000/api/graphql',
    });
    const client = new ApolloClient({
        cache,
        link,
        name: 'react-web-client',
        version: '1.1',
        queryDeduplication: false,
        ssrMode: true,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
            },
        },
    });
    const userId = 0;
    const { data } = await client.query({
        query: gql`{
            recipes {
                name,
                slug,
                image,
                liked(user_id: ${userId}) {
                    value
                }
            },
        }`,
    });

    return {
        props: {
            recipes: data.recipes,
        },
    };
}
