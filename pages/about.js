/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';
import { signin, useSession } from 'next-auth/client';
import Layout from '../components/layout';
import Footer from '../components/footer';

export default function About() {
    const [session] = useSession();

    return (
        <Layout
            pageTitle="About"
            pageDescription="About Mezcla and About the Author"
            image=""
        >
            <div style={{ paddingBottom: 112 }}>
                <div className="">
                    <div className="container">
                        <h2 className="headingSpecial">¡Hola Soy Megan!</h2>
                        <img src="me.jpg" alt="Megan in Costa Rica" className="image" />
                        <p>
                            <strong>Welcome!</strong>
                            {' '}
                            My name is Megan Smith and I am a Software Developer from California. I&apos;ve spent the past four years working at
                            {' '}
                            <a href="https://www.tile.com" target="_blank" className="link" rel="noreferrer">Tile</a>
                            {' '}
                            on their e-commerce website! Now (November 2020), I will begin a new adventure and start working at
                            {' '}
                            <a href="https://www.box.com/home" target="_blank" className="link" rel="noreferrer">Box!</a>
                        </p>
                        <div className="line-break" />
                        <div className="header-container">
                            <h2 className="headingSpecial">Mezcla</h2>
                            <img src="lemon.png" alt="Mezcla Logo" className="logo" />
                        </div>
                        <p>I created Mezcla.dev to practice my technical skills and create something that I think is cool! The idea is for you to be able to create and share your favorite recipes with the world and browse through recipes that other people have shared.</p>
                        <p>I chose the name Mezcla, because it means &quot;Mixture&quot; in Spanish, and I am hoping to have a mixture of different cuisines and recipes on this site!</p>
                        <div className="line-break" />
                        <h2 className="headingSpecial">¡Gracias por leer!</h2>
                        {!session
                            && (
                                <p>
                                    <Link href="/api/auth/signin">
                                        <a
                                            role="button"
                                            tabIndex="0"
                                            onKeyPress={(e) => {
                                                e.preventDefault();
                                                signin();
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                signin();
                                            }}
                                            className="link"
                                        >
                                            Log in
                                        </a>
                                    </Link>
                                    {' '}
                                    to create and share your favorite recipes!
                                </p>
                            )}
                        {session
                            && (
                                <Link href="/create">
                                    <a
                                        role="button"
                                        tabIndex="0"
                                        className="link"
                                    >
                                        Create a Recipe!
                                    </a>
                                </Link>
                            )}
                    </div>
                </div>
                <style jsx>
                    {`
                    .container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        padding-left: 64px;
                        padding-right: 64px;
                        padding-top: 16px;
                        max-width: 800px;
                        margin: 0 auto;
                    }

                    @media (max-width: 768px) {
                        .container {
                            padding-left: 8px;
                            padding-right: 8px;
                        }
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

                    .image {
                        width: 100%;
                        max-width: 400px;
                        margin-bottom: 24px;
                    }
                `}
                </style>
            </div>
            <Footer />
        </Layout>
    );
}
