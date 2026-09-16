import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'
import ja from './locales/ja'
import ko from './locales/ko'
import fr from './locales/fr'
import de from './locales/de'
import es from './locales/es'
import ru from './locales/ru'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { zh, en, ja, ko, fr, de, es, ru },
})

export default i18n
