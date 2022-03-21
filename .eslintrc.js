module.exports = {
    root: true,
    env: {
        "node": true,
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "parserOptions": {
        "parser": "babel-eslint"
    },
    rules: {
        // 格式化规则
        // 格式化不加分号
        "semi": [2, "never"],
        // 格式化为单引号
        "quotes": [2, "single"],
        // 逗号前后的空格
        "comma-spacing": [2, { "before": false, "after": true }],
        // =>的前/后括号
        "arrow-spacing": [2, { "before": true, "after": true }],
        "camelcase": "off",
        "eqeqeq": [2, "always"],
        // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
        "comma-dangle": [2, {
            "arrays": "never",
            "objects": "never",
            "imports": "never",
            "exports": "never",
            "functions": "never",
        }],
        // 禁止条件表达式中出现赋值操作符
        "no-cond-assign": 2,
        // 禁止 function 定义中出现重名参数
        "no-dupe-args": 2,
        //函数表达式必须有名字
        "func-names": 0,
        // 禁止对象字面量中出现重复的 key
        "no-dupe-keys": 2,
        // 禁止重复的 case 标签
        "no-duplicate-case": 2,
        //一行结束后面不要有空格
        "no-trailing-spaces": 1,
        // 函数名前面是否要空格
        "space-before-function-paren": [2, "always"],
        // 注释的空格
        "spaced-comment": [2, "always"],
        // 禁止或强制在单行代码块中使用空格
        "block-spacing": [2, "always"],
        // 禁止不必要的括号 //(a * b) + c;//报错
        "no-extra-parens": 0,
        // typeof foo === "undefimed" 错误
        "valid-typeof": 2,
        // 禁止使用多个空格
        "no-multi-spaces": 2,
        // 未使用变量或参数、函数
        "no-unused-vars": 1,
        // vue 规则
        "vue/require-prop-types": "off",
        "vue/require-default-prop": "off",
        "vue/no-reserved-keys": "off",
        "vue/prop-name-casing": 2,
        // 配置成可允许一行attribute跟着标签
        "vue/max-attributes-per-line": [2, {
            "singleline": 10,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/this-in-template": 2,

    },
}