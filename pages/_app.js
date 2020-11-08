/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'next-auth/client';
import '../styles/global.css';
import '../styles/utils.css';
import 'reflect-metadata';

export default function App({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}
