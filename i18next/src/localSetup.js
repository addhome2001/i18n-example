import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import langDetector from 'i18next-browser-languagedetector';

// for event handler
window.i18next = i18next;

i18next
  .use(XHR)
  .use(langDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    ns: ['glossary', 'common'],
    defaultNS: 'glossary',
    backend: {
      loadPath: 'lang/{{lng}}/{{ns}}.json',
    }
  });