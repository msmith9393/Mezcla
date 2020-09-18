/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/layout';
import Heart from '../../components/heart';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from 'apollo-server-micro';

export default function Recipe({
    slug,
    name,
    description,
    instructions,
    ingredients,
    image,
    activeTime,
    totalTime,
    serves,
    level,
    tags,
    reviews,
    authorFirstName,
    authorLastName,
    liked,
}) {
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
                        <h5 className="headingSm subtitle">{authorFirstName} {authorLastName}</h5>
                        <p>{description}</p>
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
                            <div className="instructions">
                                <h6 className="headingLg">Instructions</h6>
                                {instructions.map((paragraph, index) => (
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

                    .instructions {
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

Recipe.propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    instructions: PropTypes.array.isRequired,
    ingredients: PropTypes.array.isRequired,
    activeTime: PropTypes.string.isRequired,
    totalTime: PropTypes.string.isRequired,
    serves: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired,
    authorFirstName: PropTypes.string.isRequired,
    authorLastName: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
};

export async function getServerSideProps({ params }) {
    const cache = new InMemoryCache();
    const link = createHttpLink({
        uri: 'http://localhost:3000/api/graphql',
    });
    const client = new ApolloClient({
        cache: cache,
        link: link,
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
    const userId = 1;
    const { data } = await client.query({
        query: gql`{
            recipeBySlug(slug: "${params.slug}") {
                id,
                name,
                description,
                instructions,
                ingredients,
                active_time,
                total_time,
                serves,
                level,
                image,
                tags {
                    value,
                },
                reviews {
                    review,
                    comment,
                    user {
                        first_name,
                        last_name,
                    },
                },
                user {
                    first_name,
                    last_name,
                },
                liked(user_id: ${userId}) {
                    value
                }
            },
        }`,
    });

    const ingredients = data.recipeBySlug.ingredients.split('\\n');
    const instructions = data.recipeBySlug.instructions.split('\\n');

    return {
        props: {
            slug: params.slug,
            name: data.recipeBySlug.name,
            description: data.recipeBySlug.description,
            instructions,
            ingredients,
            image: data.recipeBySlug.image,
            activeTime: data.recipeBySlug.active_time,
            totalTime: data.recipeBySlug.total_time,
            serves: data.recipeBySlug.serves,
            level: data.recipeBySlug.level,
            tags: data.recipeBySlug.tags,
            reviews: data.recipeBySlug.reviews,
            authorFirstName: data.recipeBySlug.user.first_name,
            authorLastName: data.recipeBySlug.user.last_name,
            liked: data.recipeBySlug.liked.value,
        },
    };
}
