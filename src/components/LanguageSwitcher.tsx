
import * as React from "react";
import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LANGUAGE_NAMES = {
  en: "English",
  fr: "Français",
  ja: "日本語"
};

const CURRENCY_SYMBOLS = {
  en: "$",
  fr: "€",
  ja: "¥"
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          <span>{LANGUAGE_NAMES[language]}</span>
          <span className="ml-1 text-xs opacity-60">{CURRENCY_SYMBOLS[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className="flex items-center gap-2"
          >
            {language === code && <Check className="h-4 w-4" />}
            <span className={language === code ? "font-medium" : ""}>
              {name} ({CURRENCY_SYMBOLS[code as Language]})
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
