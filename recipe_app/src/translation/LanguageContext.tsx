import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {translateText} from "./TranslationService";


type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => Promise<string>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const defaultLang = String(AsyncStorage.getItem('lang')) || 'en';
    const [language, setLanguage] = useState(defaultLang);

    const t = async (key: string): Promise<string> => {
        try {
            const translation = await translateText(key, language);

            return translation;
        } catch (error) {
            console.error('Erreur de traduction:', error);
            return key; // En cas d'erreur, renvoyer la clé non traduite
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
