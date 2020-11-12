/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-server-micro';
import client from '../../graphql';
import Layout from '../../components/layout';
// import Heart from '../../components/heart';

export default function Recipe({
    slug,
    name,
    description,
    instructions,
    ingredients,
    activeTime,
    totalTime,
    serves,
    level,
    author,
}) {
    return (
        <Layout
            pageTitle={name}
            pageDescription={`Instructions and Ingredients for ${name}`}
            image=""
        >
            <div>
                <div>
                    <img src={`/../${slug}.jpg`} alt={name} className="header-image" />
                    <div className="container">
                        <h4 className="headingXl title">{name}</h4>
                        {/* <Heart liked={true} /> */}
                        <h5 className="headingSm subtitle">
                            {author}
                        </h5>
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
                        max-width: calc(100% + 32px);
                        margin-left: -16px;
                        margin-right: -16px;
                    }

                    @media (min-width: 1200px) {
                        .header-image {
                            margin: 0 auto;
                            max-width: 100%;
                        }
                    }

                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        text-align: center;
                    }

                    .title {
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
                        border-right: 1px solid #003366;
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
                            border-bottom: 1px solid #003366;
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
    description: PropTypes.string.isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTime: PropTypes.string.isRequired,
    totalTime: PropTypes.string.isRequired,
    serves: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export async function getServerSideProps({ params }) {
    const { data } = await client.query({
        query: gql`{
            recipeBySlug(slug: "${params.slug}") {
                name,
                slug,
                description,
                instructions,
                ingredients,
                activeTime,
                totalTime,
                serves,
                level,
                author
            }
        }`,
    });

    return {
        props: {
            ...data.recipeBySlug,
        },
    };
}
