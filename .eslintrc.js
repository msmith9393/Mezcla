module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    plugins: [
        'react',
        'prettier',
        'graphql',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    settings: {
        react: {
            version: '16.13.1',
        },
    },
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'jsx-a11y/label-has-associated-control': [
            'error', { assert: 'either' },
        ],
        'jsx-a11y/anchor-is-valid': 0,
        "graphql/template-strings": ['error', {
            env: 'apollo',
            schemaJson: require('./graphql/schema.json'),
        }]
    },
};
