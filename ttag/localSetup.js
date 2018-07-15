import { addLocale, useLocale } from 'ttag';

if (IS_DEV && LOCALE !== 'default') {
  const localFile = require(`./lang/${LOCALE}.po`);
  addLocale(LOCALE, localFile);
  useLocale(LOCALE);
}