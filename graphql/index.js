import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();

const baseUrl = process.env.ENVIRONMENT === 'local'
    ? 'http://localhost:3000'
    : undefined;

const link = createHttpLink({
    uri: `${baseUrl}/api/graphql`,
});

const client = new ApolloClient({
    cache,
    link,
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

export default client;
