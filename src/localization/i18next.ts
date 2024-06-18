/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { uz } from './translation/uz';
import { ru } from './translation/ru';

export type Language = "ru" | "uz"

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
  },
  lng: 'uz',
  fallbackLng: 'uz',
  interpolation: {
    escapeValue: false,
  },
});
