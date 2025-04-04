import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(ChainedBackend)
  .init({
    supportedLngs: ['uk', 'en'],
    fallbackLng: 'uk',
    debug: true,

    interpolation: {
      escapeValue: false
    },
    backend: {
      backends: [
        LocalStorageBackend,
        HttpBackend
      ],
      backendOptions: [
        {
          // TODO: uncommit after finish project
          /* expirationTime: 1 * 24 * 60 * 60 * 1000,  // 2 days
          versions: {
            en: 'v1.0',
            uk: 'v1.0',
          } */
        },
        // options for HttpBackend
        { loadPath: '/locales/{{lng}}/{{ns}}.json' }
      ]
    }
    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    /*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
  });


export default i18n