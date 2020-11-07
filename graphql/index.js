import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();

const link = createHttpLink({
    uri: `${process.env.BASE_URL}/api/graphql`,
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
