import axios from 'axios';
import * as deepl from 'deepl-node';
import {TargetLanguageCode} from "deepl-node";

const translateText = async (text: string, targetLanguage: string) => {
    console.log('targetLanguage', targetLanguage);
    const authKey = process.env.REACT_APP_DEEPL_AUTH_KEY;
    const translator = new deepl.Translator(String(authKey));
    const result = await translator.translateText(text, null, <TargetLanguageCode>targetLanguage);
    return result;
};

export { translateText };
