// must be the first import in entry point
import './localSetup';
import i18next from 'i18next';

const content = document.querySelector('#content');
let duration = 0;

function changeLng(lng) {
  i18next.changeLanguage(lng);
}

const view = duration => `
  <h3>${ i18next.t('title', { name: 'seven' })}</h3>
  <h3>${ i18next.t('glossary:duration', { count: duration })}</h3 >
  <span>${ i18next.t('common:currentLang', { lang: i18next.language })}</span>
  <button onclick="i18next.changeLanguage('en')">
      english
  </button>
  <button onclick="i18next.changeLanguage('zh-TW')">
      繁體中文
  </button>
`;

const blankView = duration => {
  // load additional namespaces after initialization
  i18next.loadNamespaces('special', () => {
    console.info('Special namespace has been loaded.');
  });


  return `<h3>${i18next.t('special:blank', { duration })}</h3>`;
};

i18next.on('languageChanged', () => {
  content.innerHTML = view(duration);
});

setInterval(() => {
  ++duration;
  content.innerHTML = duration > 10 ? blankView(duration) : view(duration);
}, 1000);

