// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    // dist: build output. pannellum.js: vendored 3rd-party VR library (minified,
    // not our code). .expo: generated router/types. None should be linted.
    ignores: ["dist/*", "assets/vr/pannellum.js", ".expo/*"],
  },
  {
    // eslint-config-expo enables React Compiler rules that only exist in
    // eslint-plugin-react-hooks v6; the pinned v5.2.0 doesn't define them,
    // which floods lint with "rule definition not found". Turn them off until
    // the plugin is upgraded (deferred: avoids a package-lock/EAS change).
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  }
]);
