import React from 'react';
import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';

const recipes = [
    {
        name: 'Pecan Dreams',
        slug: 'pecan-dreams',
        image: 'pecan-dreams.jpg',
        liked: true,
    },
    {
        name: 'Strawberry Tart',
        slug: 'strawberry-tart',
        image: 'strawberry-tart.jpg',
        liked: false,
    },
    {
        name: 'Rice Pudding',
        slug: 'rice-pudding',
        image: 'rice-pudding.jpg',
        liked: true,
    },
    {
        name: 'Strawberry Shortcake',
        slug: 'strawberry-shortcake',
        image: 'strawberry-shortcake.jpg',
        liked: false,
    },
    {
        name: 'Banana Bread',
        slug: 'banana-bread',
        image: 'banana-bread.jpg',
        liked: true,
    },
    {
        name: 'Myriam\'s Cake',
        slug: 'myriams-cake',
        image: 'myriams-cake.jpg',
        liked: false,
    },
];

export default function AllRecipes() {
    return (
        <Layout
            pageTitle="All Recipes"
            pageDescription="Search all recipes"
            image=""
        >
            <RecipeList recipes={recipes} />
        </Layout>
    );
}
