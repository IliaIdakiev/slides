module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],

    files: [
      { pattern: "src/**/*.ts" },
      'https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js'
    ],

    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [
          require("karma-typescript-es6-transform")()
        ]
      }
    },

    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    typescriptPreprocessor: {
      options: {
        project: '../../tsconfig.spec.json'
      }
    },

    reporters: ["progress", "karma-typescript"],

    browsers: ["Chrome"]
  });
};
