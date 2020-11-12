/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'next-auth/client';
import {
    ApolloClient, ApolloProvider, InMemoryCache, HttpLink,
} from '@apollo/client';
import '../styles/global.css';
import '../styles/utils.css';
import 'reflect-metadata';

const createApolloClient = () => new ApolloClient({
    link: new HttpLink({
        uri: 'api/graphql',
    }),
    cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
    const client = createApolloClient();

    return (
        <ApolloProvider client={client}>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </ApolloProvider>
    );
}
