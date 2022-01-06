// translationRunner.js
const manageTranslations = require("react-intl-translations-manager").default;

// es2015 import
// import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
  messagesDirectory: "./public/messages",
  translationsDirectory: "./public/locales",
  languages: ["az", "ru", "en"] // any language you need // add en lang
});
