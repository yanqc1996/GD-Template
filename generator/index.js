module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    // 命令
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "build:test": "NODE_ENV='test' vue-cli-service build",
      "lint": "vue-cli-service lint"
    },
    "dependencies": {
      "axios": "^0.21.1",
      "core-js": "^3.8.1",
      "echarts": "^5.0.0",
      "element-ui": "^2.14.1",
      "js-cookie": "^2.2.1",
      "query-string": "^6.13.8",
      "sass": "^1.32.0",
      "sass-loader": "^10.1.0",
      "vue": "^2.6.12",
      "vue-router": "^3.4.9",
      "vuex": "^3.6.0"
    },
    "devDependencies": {
      "@vue/cli-plugin-babel": "~4.5.9",
      "@vue/cli-plugin-eslint": "~4.5.9",
      "@vue/cli-plugin-router": "~4.5.9",
      "@vue/cli-plugin-vuex": "~4.5.9",
      "@vue/cli-service": "~4.5.9",
      "@vue/eslint-config-prettier": "^6.0.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^7.16.0",
      "eslint-plugin-prettier": "^3.3.0",
      "eslint-plugin-vue": "^7.4.0",
      "less": "^4.0.0",
      "less-loader": "^7.2.1",
      "lint-staged": "^10.5.3",
      "mockjs": "^1.1.0",
      "prettier": "^2.2.1",
      "vue-template-compiler": "^2.6.12"
    },
  });
  // 复制template模版，生成初始化项目
  api.render('../user');
};