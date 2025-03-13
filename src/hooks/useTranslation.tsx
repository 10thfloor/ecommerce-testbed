
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';

export const useTranslation = () => {
  const { language, currency } = useLanguage();
  
  const t = (key: string): string => {
    return translate(key, language);
  };
  
  return { t, language, currency };
};
