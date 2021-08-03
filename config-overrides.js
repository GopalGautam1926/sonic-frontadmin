const {addDecoratorsLegacy,override,disableEsLint} = require('customize-cra');

// https://www.freecodecamp.org/news/how-to-build-a-custom-pwa-with-workbox-in-create-react-app-be580686cf73/
module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint()
);