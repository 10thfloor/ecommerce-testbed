
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';

export const useTranslation = () => {
  const { language, currency } = useLanguage();
  
  const t = (key: string): string => {
    if (!key) {
      console.warn('Empty translation key provided');
      return '';
    }
    
    try {
      return translate(key, language);
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key.split('.').pop() || key;
    }
  };
  
  return { t, language, currency };
};
