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
      "axios": "^0.19.2",
      "core-js": "^3.6.4",
      "echarts": "^4.8.0",
      "element-ui": "^2.13.0",
      "query-string": "^6.9.0",
      "vue": "^2.6.11",
      "vue-router": "^3.1.6",
      "vuex": "^3.1.3",
      "js-cookie": "^2.2.1",
      "sass": "^1.26.10",
      "sass-loader": "^9.0.2",
    },
    "devDependencies": {
      "@vue/cli-plugin-babel": "^4.3.0",
      "@vue/cli-plugin-eslint": "^4.3.0",
      "@vue/cli-service": "^4.3.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "less": "^3.11.1",
      "less-loader": "^4.1.0",
      "mockjs": "^1.1.0",
      "vue-template-compiler": "^2.6.11"
    }
  });
  // 复制template模版
  api.render('../template');
};