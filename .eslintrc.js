module.exports = {
    extends: 'airbnb-base',
    plugins: ['jest'],
    env: {
        'jest/globals': true,
    },
    rules: {
        // Allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // Allow console during development
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,

        // Other custom rules
        'max-len': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'acc', // for reduce accumulators
                'e', // for e.returnvalue
                'state', // for Vuex state handling
            ],
        }],

        // Operator precedence is a thing for a reason; there are plenty of cases where forcing extra brackets does not lead to an improvement
        'no-mixed-operators': 0,

        // Simple function bodies can sometimes still be complex enough to benefit of the extra readability provided by a simple newline
        'arrow-body-style': 0,

        // In some cases, regular string concatenation still looks and feels superior
        'prefer-template': 0,

        // This seems like a fairly stupid rule to enable; it disables simple anonymous functions and arrow functions, even when only used as callback
        'no-loop-func': 0,

        // Even AirBnB themselves allow this, just use with caution
        'no-bitwise': 0,

        /** @see https://github.com/airbnb/javascript#modules--no-webpack-loader-syntax */
        'import/no-webpack-loader-syntax': 2,

        // For this Node application, for .. of loops are just fine
        'no-restricted-syntax': 0,
    },
};
