import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {translateText} from "./TranslationService";


type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => Promise<string>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [language, setLanguage] = useState<string>("EN-US");

    const getLanguage = async () => {
        try {
            const lang = await AsyncStorage.getItem('lang');
            if (lang !== null) {
                setLanguage(lang);
            }
        } catch (error) {
            console.error('Erreur de récupération de la langue:', error);
        }
    };

    useEffect(() => {
        getLanguage();
    }, []);

    // const setLanguage = async (lang: string) => {
    //     try {
    //         await AsyncStorage.setItem('lang', lang);
    //         setLanguage(lang);
    //     } catch (error) {
    //         console.error('Erreur de sauvegarde de la langue:', error);
    //     }
    // };


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