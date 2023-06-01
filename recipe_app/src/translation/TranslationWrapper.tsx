import React, {ReactNode, useEffect} from 'react';
import {Text} from 'react-native';
import { traverseComponentTree } from './TranslationUtils';
import { TranslationService }  from './TranslationService';


const TranslationWrapper = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        traverseComponentTree(children, handleTranslation);
    }, []);

    const handleTranslation = async (component: React.ReactNode, targetLanguage: string) => {
        if (isTextComponent(component)) {
            // Perform translation for the text component
            const translatedText = translateAndDisplayText(component.props.children, targetLanguage);
            // Update the translated text in the component
            component.props.children = await translatedText;
            
            // ...
        }
    };

    const isTextComponent = (component: ReactNode): component is React.ReactElement<{ children: React.ReactNode }> => {
        return (
            React.isValidElement(component) &&
            component.type === Text &&
            typeof component.props.children === 'string'
        );
    };

    const translateAndDisplayText = async (originalText: React.ReactNode, targetLanguage: string) => {
        const translationService = new TranslationService();
        try {
            const translatedText = await translationService.translateText(originalText, targetLanguage);
            console.log(`Translated text: ${translatedText}`);
            // Display the translated text in your app
            return translatedText;
            // ...
        } catch (error) {
            console.error('Translation error:', error);
        }
    };

    return <>{children}</>;
};
