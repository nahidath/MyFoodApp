import axios from 'axios';
// @ts-ignore
import {REACT_APP_DEEPL_AUTH_KEY} from "@env";
axios.defaults.withCredentials = true;

const translateText = async (text: string, targetLanguage: string) => {
    const deepLApiKey = REACT_APP_DEEPL_AUTH_KEY;
    const url = 'https://api-free.deepl.com/v2/translate';
    const headers = {
        Authorization: `DeepL-Auth-Key ${deepLApiKey}`,
        'Content-Type': 'application/json',
    }
    const data = {
        text: [text],
        target_lang: targetLanguage,
    }

    const response = await axios.post(url, data, {headers: headers}).then((response) => {
        return  response.data.translations[0].text;
    }).catch((error) => {
        console.log('DeepL failed translations:',error);
        return '';
    });

    return response;

};

export { translateText };