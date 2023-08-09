module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
    
        "prettier",
        "eslint:recommended", 
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
    
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["@typescript-eslint"],
    // add your custom rules here
    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "indent": ["warn", 4],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }
        ],
        "no-undef":"off",
        "vue/multi-word-component-names": ["error", {
            "ignores": ["default","Default","index"]
        }],
        "vue/html-self-closing": ["error", {
            "svg": "never",
            "math": "never"
        }],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }]
    }
};
