module.exports = {
    extends: 'airbnb-base',
    plugins: ['jest'],
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    globals: {
        // Temporary workaround as long as ESLint can't properly support BigInt
        BigInt: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        // Allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // Allow console during development
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,

        // Other custom rules
        'max-len': 0,
        indent: ['error', 4, { SwitchCase: 1 }],

        // This rule sounds good in theory, but there are too many exceptions where reassignment is wanted/needed, and the whitelist doesn't suffice
        'no-param-reassign': 'off',

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

        // Specifying unused function arguments isn't a problem and can add clarity
        /** @see https://blog.javascripting.com/2015/09/07/fine-tuning-airbnbs-eslint-config/ */
        'no-unused-vars': ['error', {
            vars: 'local',
            args: 'none',
        }],

        // In some cases it can be way more logical to use an else return, allow both styles
        /** @see https://blog.javascripting.com/2015/09/07/fine-tuning-airbnbs-eslint-config/ */
        'no-else-return': 'off',

        // For this Node application, for .. of loops are just fine
        'no-restricted-syntax': 0,

        // Used 'after' since before airbnb-base enforced this rule with 'before', no need to change now
        'operator-linebreak': [2, 'after'],
    },
};
