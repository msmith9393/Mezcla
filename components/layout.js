import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import MainNav from './main-nav';
import Footer from './footer';

export default function Layout({
    children,
    pageTitle,
    pageDescription,
    image,
}) {
    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                <meta name="og:title" content={pageTitle} />
                <meta name="description" content={pageDescription} />
                <meta property="og:image" content={image} />
            </Head>
            <MainNav />
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.element.isRequired,
    pageTitle: PropTypes.string.isRequired,
    pageDescription: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};
