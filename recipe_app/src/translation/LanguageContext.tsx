import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {translateText} from "./TranslationService";
import {TargetLanguageCode, TextResult} from "deepl-node";
import * as deepl from "deepl-node";
// @ts-ignore
import {REACT_APP_DEEPL_AUTH_KEY} from "@env";


type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => Promise<string>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const defaultLang = String(AsyncStorage.getItem('lang'));
    const [language, setLanguage] = useState(defaultLang.length===2 ? defaultLang : 'en-GB');
    const authKey :string | undefined = REACT_APP_DEEPL_AUTH_KEY;
    const translator = new deepl.Translator(String(authKey));

    // @ts-ignore
    const t = async (key : string): Promise<string> => {
        try {
            const result = await translator.translateText(key, null, language as "bg" | "cs" | "da" | "de" | "el" | "es" | "et" | "fi" | "fr" | "hu" | "id" | "it" | "ja" | "ko" | "lt" | "lv" | "nb" | "nl" | "pl" | "ro" | "ru" | "sk" | "sl" | "sv" | "tr" | "uk" | "zh" | "en-GB" | "en-US" | "pt-BR" | "pt-PT");
            return result.text;
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
