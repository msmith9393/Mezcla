/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
import React from 'react';
import '../styles/global.css';
import '../styles/utils.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
