/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../components/layout';
import RecipeList from '../components/recipe-list';

export default function ComingSoon({ recipes }) {
    return (
        <Layout
            pageTitle="Coming Soon"
            pageDescription="Infomation on what Mezcla will be"
            image=""
        >
            <div>
                <div className="center">
                    <div className="header-container">
                        <h2 className="headingLg">About Mezcla!</h2>
                        <img src="lemon.png" alt="Mezcla Logo" className="logo" />
                    </div>
                    <p>Mezcla.dev will be a site to add your favorite
                    recipes and expore recipes that others have uploaded!</p>
                    <p>Users will be able to create an account and log in.
                    Then they can browse recipes and mark them as their favorites. They will also be able to create recipes and upload them to the world.</p>
                </div>
                <div className="line-break" />
                <div className="container">
                    <h4 className="headingMd">About the tech stack:</h4>
                    <ul>
                        <li className="list-item">Next.js - React Framework</li>
                        <li className="list-item">GraphQL</li>
                        <li className="list-item">Postgres</li>
                    </ul>
                    <p><a className="link" href="https://github.com/msmith9393/Mezcla" target="_blank" rel="noreferrer">Checkout the Repo!</a></p>
                </div>
                <div className="line-break" />
                <div className="container">
                    <h4 className="headingMd">Example of what it will look like:</h4>
                    <RecipeList recipes={recipes} />
                </div>
                <style jsx>{`
                    .container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        padding-left: 64px;
                        padding-right: 64px;
                        padding-top: 16px;
                    }

                    .header-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-left: 64px;
                        padding-right: 64px;
                    }

                    .logo {
                        width: 32px;
                        padding-left: 8px;
                        transform: rotate(25deg);
                    }

                    .list-item::before {
                        content: "► "
                    }
                `}
                </style>
            </div>
        </Layout>
    );
}

ComingSoon.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function getStaticProps() {
    const recipes = [
        {
            name: 'Pecan Dreams',
            image: 'pecan-dreams.jpg',
            slug: 'pecan-dreams',
            liked: true,
        },
        {
            name: 'Strawberry Tart',
            image: 'strawberry-tart.jpg',
            slug: 'strawberry-tart',
            liked: true,
        },
        {
            name: 'Rice Pudding',
            image: 'rice-pudding.jpg',
            slug: 'rice-pudding',
            liked: true,
        },
        {
            name: 'Strawberry Shortcake',
            image: 'strawberry-shortcake.jpg',
            slug: 'strawberry-shortcake',
            liked: true,
        },
        {
            name: 'Banana Bread',
            image: 'banana-bread.jpg',
            slug: 'banana-bread',
            liked: true,
        },
        {
            name: 'Myriam\'s Cake',
            image: 'myriams-cake.jpg',
            slug: 'myriams-cake',
            liked: true,
        },
    ];

    return {
        props: {
            recipes,
        },
    };
}
