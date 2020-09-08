import React from 'react';
import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';

const recipes = [
    {
        name: 'Pecan Dreams',
        id: '1',
        image: 'pecan-dreams.png',
        liked: true,
    },
    {
        name: 'Strawberry Tart',
        id: '2',
        image: 'strawberry-tart.png',
        liked: false,
    },
    {
        name: 'Rice Pudding',
        id: '3',
        image: 'rice-pudding.png',
        liked: true,
    },
    {
        name: 'Strawberry Shortcake',
        id: '4',
        image: 'strawberry-shortcake.png',
        liked: false,
    },
    {
        name: 'Banana Bread',
        id: '5',
        image: 'banana-bread.png',
        liked: true,
    },
    {
        name: 'Myriam\'s Cake',
        id: '6',
        image: 'myriams-cake.png',
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
