import translate from 'google-translate-api';

// export class TranslationService {
//     static async translateText(text: string, targetLanguage: string): Promise<string> {
//         try {
//             const res = await translate(text, { to: targetLanguage });
//             return res.text;
//         } catch (error) {
//             console.error('Translation error:', error);
//             throw error; // or handle the error as needed
//         }
//     }
// }

export const translateText = async (text: string, targetLanguage: string) => {
    try {
        const res = await translate(text, { to: targetLanguage });
        const translatedText = res.text;
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
};


