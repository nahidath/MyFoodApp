import axios from 'axios';

const translateText = async (text: string, targetLanguage: string) => {
    try {
        const response = await axios.post(
            "https://api-free.deepl.com/v2/translate",
            {
                text: text,
                target_lang: targetLanguage,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'DeepL-Auth-Key 7b3b4238-9839-99bb-97e5-2c6a88231edf:fx',
                },
            }
        );

        return response.data.translations[0].text;
    } catch (error) {
        console.error('Erreur de traduction:', error);
        throw error;
    }
};

export { translateText };
