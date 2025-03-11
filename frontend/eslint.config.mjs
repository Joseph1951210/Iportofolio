import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      // 控制缩进为2个空格
      indent: ["error", 2, {
        SwitchCase: 1,
        VariableDeclarator: { var: 2, let: 2, const: 3 },
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
      }],

      // 禁用 react-in-jsx-scope 规则
      "react/react-in-jsx-scope": "off",
      // 禁用 props-types 规则
      "react/prop-types": "off",
      // 禁止行尾空格
      "no-trailing-spaces": "error",

      // 禁止混用空格和 tab 进行缩进
      "no-mixed-spaces-and-tabs": "error",

      // 要求操作符周围有空格
      "space-infix-ops": "error",

      // 在一元操作符后/前要求或禁止空格
      "space-unary-ops": ["error", { words: true, nonwords: false }],

      // 要求块之前有空格
      "space-before-blocks": ["error", "always"],

      // 强制在 function 的左括号前加上空格
      "space-before-function-paren": ["error", "always"],

      // 强制在括号内使用一致的空格
      "space-in-parens": ["error", "never"],

      // 要求逗号后有空格，逗号前不要有空格
      "comma-spacing": ["error", { before: false, after: true }],

      // 要求对象字面量属性中冒号前后有空格
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],

      // 强制在点号之前和之后不允许有空格
      "dot-location": ["error", "property"],

      // 强制在大括号内换行符前有一个空格
      "object-curly-spacing": ["error", "always"],

      // 数组方括号内不允许有空格
      "array-bracket-spacing": ["error", "never"],

      // 禁止 function 圆括号前有空格
      "func-call-spacing": ["error", "never"],

      // 要求箭头函数的箭头前后有空格
      "arrow-spacing": ["error", { before: true, after: true }],

      // 在逗号前后保持一致的空格
      "comma-style": ["error", "last"],

      // 要求行尾注释前有空格
      "spaced-comment": ["error", "always", {
        line: { markers: ["/"] },
        block: { balanced: true },
      }],

      // 强制在 if、else、while、do 和 for 关键字之后要求空格
      "keyword-spacing": ["error", { before: true, after: true }],

      // 禁止在块语句的开始或末尾存在空行
      "padded-blocks": ["error", "never"],

      // 强制多行注释的特定风格
      "multiline-comment-style": ["error", "starred-block"],

      // 设置最大字符限制
      "max-len": ["error", { code: 120, ignoreUrls: true, ignoreStrings: false, ignoreTemplateLiterals: false }],

      // 禁止多行空行
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],

      // 禁止多个空格
      "no-multi-spaces": ["error", {
        ignoreEOLComments: false, // Ensure this rule applies even if comments are on the same line
      }],
    },
  },
];
