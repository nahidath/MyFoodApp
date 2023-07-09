// import React, {ReactNode, useEffect} from 'react';
// import {Text} from 'react-native';
// import { traverseComponentTree } from './TranslationUtils';
// import { TranslationService }  from './TranslationService';
//
//
// const TranslationWrapper = ({ children }: { children: React.ReactNode }) => {
//     useEffect(() => {
//         traverseComponentTree(children, handleTranslation);
//     }, []);
//
//     const handleTranslation = async (component: React.ReactNode, targetLanguage: string) => {
//         if (isTextComponent(component)) {
//             // Perform translation for the text component
//             const translatedText = translateAndDisplayText(component.props.children, targetLanguage);
//             // Update the translated text in the component
//             component.props.children = await translatedText;
//
//             // ...
//         }
//     };
//
//     const isTextComponent = (component: ReactNode): component is React.ReactElement<{ children: React.ReactNode }> => {
//         return (
//             React.isValidElement(component) &&
//             component.type === Text &&
//             typeof component.props.children === 'string'
//         );
//     };
//
//     const translateAndDisplayText = async (originalText: React.ReactNode, targetLanguage: string) => {
//         const translationService = new TranslationService();
//         try {
//             const translatedText = await translationService.translateText(originalText, targetLanguage);
//             console.log(`Translated text: ${translatedText}`);
//             // Display the translated text in your app
//             return translatedText;
//             // ...
//         } catch (error) {
//             console.error('Translation error:', error);
//         }
//     };
//
//     return <>{children}</>;
// };

import React, { useEffect } from 'react';
import { traverseComponentTree } from './TranslationUtils';
import {translateText} from "./TranslationService";

const TranslationWrapper = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        traverseComponentTree(children, handleTranslation);
    }, []);

    const handleTranslation = (component: React.ReactNode) => {
        if (isTextComponent(component)) {
            // @ts-ignore
            if (component.props.children) {
                // @ts-ignore
                const textContent = component.props.children;
                const translatedText = translationText(textContent);
                updateComponentWithTranslation(component, translatedText);
            }
        }
    };

    const isTextComponent = (component: React.ReactNode) => {
        return (
            typeof component === 'object' &&
            'type' in component &&
            component.type === 'Text' // Assuming you're using React Native's Text component
        );
    };

    const translationText = (text: string) => {
        // Implement your translation logic using the translation service module
        // For example, you can use the previously defined `translateText` function
        // from the translation service module.
        // Replace the implementation below with your actual translation logic.
        return translateText(text, 'es'); // Translates to Spanish as an example
    };
    const updateComponentWithTranslation = (component: React.ReactNode, translatedText: string) => {
        // Replace the text content of the component with the translated text
        // Adjust this implementation based on the specific component library you are using
        // For example, if you're using React Native's Text component, you can create a new
        // React element with the translated text and update the `children` prop.
        const updatedComponent = React.cloneElement(component, { children: translatedText });
        // Further update or render the updatedComponent as needed
        // ...
    };

    return <>{children}</>;
};

export default TranslationWrapper;