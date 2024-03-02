module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ["standard", "plugin:react/recommended"],
	overrides: [
		{
			env: {
				node: true
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script"
			}
		}
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["react"],
	rules: {
		quotes: ["error", "double", { allowTemplateLiterals: true }],
		"no-undef": 1,
		"no-use-before-define": 1,
		"react/prop-types": "off",
		"prefer-const": 0,
		"space-before-function-paren": 0,
		"no-tabs": 0,
		indent: ["error", "tab", { SwitchCase: 1 }],
		"no-useless-escape": 0,
		"multiline-ternary": 0,
		"array-callback-return": 0,
		"react/jsx-no-comment-textnodes": 0
	}
}
