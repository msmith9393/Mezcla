import React from 'react';
import PropTypes from 'prop-types';
import { client } from '../graphql';
import { gql } from 'apollo-server-micro';
import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';

export default function Favorites({ recipes }) {
    return (
        <Layout
            pageTitle="Favorites"
            pageDescription="Browse your favorite recipes"
            image=""
        >
            <RecipeList recipes={recipes} />
        </Layout>
    );
}

Favorites.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getServerSideProps() {
    const userId = 1;
    const { data } = await client.query({
        query: gql`{
            favoriteRecipes(user_id: ${userId}) {
                recipe {
                    name,
                    slug,
                    image,
                    liked(user_id: ${userId}) {
                        value,
                    },
                },
            },
        }`,
    });

    const recipes = data.favoriteRecipes.map(({ recipe }) => recipe);

    return {
        props: {
            recipes,
        },
    };
}
