import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';

const recipes = [
    {
        name: 'Pecan Dreams',
        image: 'pecan-dreams.png',
        liked: true,
    },
    {
        name: 'Strawberry Tart',
        image: 'strawberry-tart.png',
        liked: false,
    },
    {
        name: 'Rice Pudding',
        image: 'rice-pudding.png',
        liked: true,
    },
    {
        name: 'Strawberry Shortcake',
        image: 'strawberry-shortcake.png',
        liked: false,
    },
    {
        name: 'Banana Bread',
        image: 'banana-bread.png',
        liked: true,
    },
    {
        name: 'Myriam\'s Cake',
        image: 'myriams-cake.png',
        liked: false,
    },
];

export default function AllRecipes() {
    return (
        <Layout
            pageTitle='All Recipes'
            pageDescription='Search all recipes'>
            <RecipeList recipes={recipes} />
        </Layout>
    );
}
