import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-server-micro';
import client from '../graphql';
import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';
import Search from '../components/search';

export default function Home({ recipes }) {
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

Home.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getServerSideProps() {
    const { data } = await client.query({
        query: gql`{
            recipes {
                name,
                slug,
            },
        }`,
    });

    return {
        props: {
            recipes: data.recipes,
        },
    };
}
