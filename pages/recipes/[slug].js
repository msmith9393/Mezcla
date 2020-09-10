/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/layout';
import Heart from '../../components/heart';

export default function Recipe({
    name,
    // slug,
    image,
    liked,
}) {
    const author = 'Megan Smith';
    const summary = 'This is a summary written by the author. Perhaps a story about the recipe or maybe an experience while eating this recipe.';
    const activeTime = '1 hour';
    const totalTime = '4 hours';
    const serves = '8';
    const level = 'Intermediate';
    const ingredients = [
        '1 1/4 cups flour',
        '1 tablespoon sugar',
        '1/2 teaspoon salt',
        '7 tablespoons unsalted butter, very cold and diced into small cubes',
        '3 tablespoons very cold water',
        '2 cups whole milk',
        '6 egg yolks',
        '1/2 cup sugar',
        '3 tablespoons cornstarch',
        '1/4 teaspoon salt',
        '1 1/2 teaspoons vanilla',
        '1 tablespoon cold unsalted butter',
        '1 pint strawberries, hulled and cut in half',
        '1/4 cup apricot jam',
    ];
    const directions = [
        'In a food processor, combine the flour, sugar and salt. Add the butter and toss to coat in the flour mixture. Pulse the butter and the dry ingredients until only pea-sized chunks of butter remain. Add the water, a little at a time, and pulse just until the dough begins to come together. Remove the dough to a floured board and shape into a disk. Wrap in plastic and refrigerate until chilled, 2 hours.',
        'Roll out the dough into a thirteen inch circle. Transfer to a 9 1/2 inch tart pan with a removable bottom. Fit the dough nicely into the pan, fitting it snuggly into the bottom and up the sides, but don’t stretch the dough. Trim the edge leaving a 1/2 inch overhang. Fold the overhang over itself and press it onto the sides of the pan, creating a strong border to hold the cream for the tart. Loosely cover with plastic and freeze until firm, 30 minutes.',
        'Preheat the oven to 425 degrees. Line the frozen shell with foil and fill with pie weights, such as dried beans or rice. Bake for 15 minutes. Remove the foil and weights and continue to bake until the shell is pale gold, 5-10 minutes longer. Let cool completely on a rack.',
        'To make the pastry cream, in a medium pot over medium heat warm the milk just until tiny bubbles appear on the surface. In a bowl, whisk together the egg yolks and sugar. Add the cornstarch and salt. Pour half of the hot milk while whisking constantly. Whisk in the remaining milk and return to the pot. Cook over medium heat, whisking constantl y until the mixture just starts to thicken into a nice consistency, about 5 minutes. Pour into a clean bowl. Whisk in the vanilla and the butter. Cover with plastic wrap, directly on the surface of the cream and refrigerate until cold, at least 3 hours.',
        'To assemble the tart, place the baked tart shell on a platter and stir the cold pastry cream until smooth. Pour the cream into the tart shell and spread evenly. Arrange the strawberries on top of the cream starting with a ring around the outer edge of the tart and working your way toward the center. Heat the jam in a small pot until it liquefies. Lightly brush the top of the strawberries with the jam so that they are shiny. Cover loosely with plastic wrap and refrigerate until ready to serve.',
    ];

    return (
        <Layout
            pageTitle={name}
            pageDescription={`Instructions and Ingredients for ${name}`}
            image=""
        >
            <div>
                <div>
                    <img src={`/../${image}`} alt={name} className="header-image" />
                    <div className="container">
                        <h4 className="headingXl title">{name}</h4>
                        <Heart liked={liked} />
                        <h5 className="headingSm subtitle">{author}</h5>
                        <p>{summary}</p>
                        <div className="information">
                            <div>
                                <h6 className="headingMd">Active Time</h6>
                                <p>{activeTime}</p>
                            </div>
                            <div>
                                <h6 className="headingMd">Total Time</h6>
                                <p>{totalTime}</p>
                            </div>
                            <div>
                                <h6 className="headingMd">Serves</h6>
                                <p>{serves}</p>
                            </div>
                            <div>
                                <h6 className="headingMd">Level</h6>
                                <p>{level}</p>
                            </div>
                        </div>
                        <div className="recipe">
                            <div className="ingredients">
                                <h6 className="headingLg">Ingredients</h6>
                                <ul className="list">
                                    {ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="directions">
                                <h6 className="headingLg">Directions</h6>
                                {directions.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>
                    {`
                    .header-image {
                        display: block;
                        max-width: 100%;
                        margin: 0 auto;

                    }

                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        text-align: center;
                    }

                    .title {
                        display: inline-block;
                        padding-right: 8px;
                        margin-bottom: 0;
                    }

                    .subtitle {
                        margin: 0 0 1rem 0;
                    }

                    .information {
                        display: flex;
                        justify-content: space-between;
                        color: #00848C;
                        border-top: 1px solid #00848C;
                        border-bottom: 1px solid #00848C;
                        padding: 0 16px;
                        margin: 16px 0;
                    }

                    .information h6 {
                        margin-bottom: 0;
                    }

                    .recipe {
                        display: flex;
                        text-align: left;
                    }

                    .ingredients {
                        padding: 0 16px;
                    }

                    .list {
                        width: 300px;
                        border-right: 1px solid #2C2C2C;
                        padding-right: 16px;
                    }

                    .directions {
                        padding: 0 16px;
                        flex-grow: 2;
                    }

                    @media (max-width: 768px) {
                        .information {
                            flex-wrap: wrap;
                        }

                        .information div {
                            width: 50%;
                        }

                        .recipe {
                            flex-direction: column;
                        }

                        .list {
                            width: initial;
                            text-align: center;
                            border-right: none;
                            border-bottom: 1px solid #2C2C2C;
                            padding-bottom: 16px;
                        }

                        .ingredients h6 {
                            text-align: center;
                        }
                    }
                `}
                </style>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    // const paths = getAllPostIds()
    const paths = [
        { params: { slug: 'pecan-dreams' } },
        { params: { slug: 'strawberry-tart' } },
        { params: { slug: 'rice-pudding' } },
        { params: { slug: 'strawberry-shortcake' } },
        { params: { slug: 'banana-bread' } },
        { params: { slug: 'myriams-cake' } },
    ];

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const recipes = [
        {
            name: 'Pecan Dreams',
            id: '1',
            slug: 'pecan-dreams',
            image: 'pecan-dreams.jpg',
            liked: true,
        },
        {
            name: 'Strawberry Tart',
            id: '2',
            slug: 'strawberry-tart',
            image: 'strawberry-tart.jpg',
            liked: false,
        },
        {
            name: 'Rice Pudding',
            id: '3',
            slug: 'rice-pudding',
            image: 'rice-pudding.jpg',
            liked: true,
        },
        {
            name: 'Strawberry Shortcake',
            id: '4',
            slug: 'strawberry-shortcake',
            image: 'strawberry-shortcake.jpg',
            liked: false,
        },
        {
            name: 'Banana Bread',
            id: '5',
            slug: 'banana-bread',
            image: 'banana-bread.jpg',
            liked: true,
        },
        {
            name: 'Myriam\'s Cake',
            id: '6',
            slug: 'myriams-cake',
            image: 'myriams-cake.jpg',
            liked: false,
        },
    ];
    const {
        name,
        slug,
        image,
        liked,
    } = recipes.filter((recipe) => recipe.slug === params.slug)[0];

    return {
        props: {
            name,
            slug,
            image,
            liked,
        },
    };
}

Recipe.propTypes = {
    name: PropTypes.string.isRequired,
    // slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
};
