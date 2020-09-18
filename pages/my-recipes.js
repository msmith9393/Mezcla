import React from 'react';
import PropTypes from 'prop-types';
import { client } from '../graphql';
import { gql } from 'apollo-server-micro';
import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';

export default function MyRecipes({ recipes }) {
    return (
        <Layout
            pageTitle="My Recipes"
            pageDescription="Browse recipes that you created"
            image=""
        >
            <RecipeList recipes={recipes} />
        </Layout>
    );
}

MyRecipes.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getServerSideProps() {
    const userId = 1;
    const { data } = await client.query({
        query: gql`{
            recipesByUser(user_id: ${userId}) {
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
            recipes: data.recipesByUser,
        },
    };
}
