import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = createHttpLink({
    uri: 'http://localhost:3000/api/graphql',
});

export const client = new ApolloClient({
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
