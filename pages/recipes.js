import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-server-micro';
import client from '../graphql';
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
            <div>
                <Search />
                <RecipeList recipes={recipes} />
            </div>
        </Layout>
    );
}

Recipes.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getServerSideProps() {
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
