
import { Language } from '@/contexts/LanguageContext';

interface TranslationObject {
  [key: string]: {
    [key in Language]: string;
  };
}

export const recommendedTranslations: TranslationObject = {
  // Recommended items
  'recommended.title': {
    en: 'Recommended For You',
    fr: 'Recommandé pour vous',
    ja: 'おすすめ'
  },
  'recommended.empty': {
    en: 'No recommendations yet',
    fr: 'Pas encore de recommandations',
    ja: 'まだおすすめはありません'
  }
};
