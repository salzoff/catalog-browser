
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 0,
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'no-new': 0,
        'comma-dangle': 0,
        'no-plusplus': 0,
        'space-before-function-paren': 0,
        'semi': ['error', 'always']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
