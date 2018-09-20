module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "no-console": "off",
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"], // Specific for windows
    "no-underscore-dangle": "off"
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "document": false
  }

};