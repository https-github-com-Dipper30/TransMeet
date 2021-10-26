module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "semi": ["warn", "never"],
    "quotes": ["warn", "single"],
    "key-spacing": ["warn", { "beforeColon": false, "afterColon": true }],
    "new-cap": ["warn", { "newIsCap": true, "capIsNew": false}],
    "no-multiple-empty-lines": ["warn", {"max": 1}],
    "comma-style": ["warn", "last"],
    "comma-spacing": ["warn", { "before": false, "after": true }],
    "comma-dangle": ["warn", "always-multiline"],
    "no-implicit-coercion": "warn",
    "no-invalid-this": "warn",
    "no-multi-spaces": "warn",
    "no-new-func": "warn",
    "global-require": "warn",
    // 'no-console': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    "space-before-function-paren": ['warn', "always"],
  }
}