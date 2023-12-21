import {useLanguage} from "./LanguageContext";


export const useTranslation = () => {
    const {t} = useLanguage();
    const translationFunc = async (params?: any[]) => {


        let translated = [];
        try {
            if (params) {
                for (let i = 0; i < params.length; i++) {
                    const tt = await t(params[i]);
                    translated.push(tt);
                }

            }
        } catch (err) {
            console.log(err);
        }
        return translated;

    }
    return {translationFunc : translationFunc};

}


