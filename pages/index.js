/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import { DownloadIcon } from '../components/icons';

export default function Home() {
    return (
        <Layout
            pageTitle="Mezcla Recipe"
            pageDescription="Homepage for Mezcla recipes"
            image=""
        >
            <div>
                <div className="container">
                    <img src="profile-picture.png" alt="Megans Profile" className="image" />
                    <div>
                        <h2 className="headingLg center">Hello, I&apos;m Megan!</h2>
                        <p>
                            I am a Software Engineer in the Bay Area. The last 4 years I have worked at <a className="link" href="https://tile.com" target="_blank" rel="noreferrer">Tile</a>, the perfect gift for people who misplace their keys! Now, I am enjoying a transition stage, where I am focused on developing new skills through personal projects.
                        </p>
                        <p>
                            I love cooking and I love Spanish, so I decided to create Mezcla to showcase my development skills and delicious recipes in English and Spanish. <Link href="/spanish"><a className="link">Click Here</a></Link> to change to Spanish.
                        </p>
                    </div>
                </div>
                <div className="line-break" />
                <div className="center">
                    <div className="header-container">
                        <h2 className="headingLg">About Mezcla!</h2>
                        <img src="lemon.png" alt="Mezcla Logo" className="logo" />
                    </div>
                    <p>Mezcla is  a site to share your favorite recipes! <Link href="/log-in"><a className="link">Log In</a></Link> to get started.</p>
                    <h4 className="headingMd">About the tech stack:</h4>
                    <ul>
                        <li>Next.js - React Framework</li>
                        <li>GraphQL</li>
                    </ul>
                    <p><a className="link" href="https://github.com/msmith9393/Mezcla" target="_blank" rel="noreferrer">Checkout the Repo!</a></p>
                </div>
                <div className="line-break" />
                <div className="center">
                    <h2 className="headingLg center">I&apos;m looking for a job!</h2>
                    <p>Please to reach out to me by <a className="link" href="https://www.linkedin.com/in/msmith93/" target="_blank" rel="noreferrer">LinkedIn</a> or <a className="link" href="mailto:megan@tokaypress.com">Email.</a></p>
                    <a href="../resume.pdf" download className="link-button button-center">
                        <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512">
                            <title>Download Icon</title>
                            <path d="M382.56,233.38A16,16,0,0,0,368,224H304V16A16,16,0,0,0,288,0H224a16,16,0,0,0-16,16V224H144a16,16,0,0,0-12,26.53l112,128a16,16,0,0,0,24.06,0l112-128A16,16,0,0,0,382.56,233.38Z" />
                            <path d="M432,352v96H80V352H16V480a32,32,0,0,0,32,32H464a32,32,0,0,0,32-32V352Z" />
                        </svg>
                        Resume
                    </a>
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

                    .image {
                        width: 150px;
                        height: 150px;
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

                    .download-icon {
                        width: 16px;
                        padding-right: 8px;
                    }

                    .download-icon path {
                        fill: #037272;
                    }

                    .link-button:hover path {
                        fill: #2EC3CC;
                    }
                `}
                </style>
            </div>
        </Layout>
    );
}
