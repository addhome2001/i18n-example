// must be the first import in entry point
import './localSetup';
import { t, ngettext, msgid } from 'ttag';

const content = document.querySelector('#content');
let duration = 0;

const view = (duration) => `
  <h3>${ t`Hi, all.`}</h3>
  <h3>${ ngettext(msgid`Duration on this page: ${duration} second`, `Duration on this page: ${duration} seconds`, duration)}</h3 >
`;

setInterval(() => {
  content.innerHTML = view(++duration);
}, 1000);
