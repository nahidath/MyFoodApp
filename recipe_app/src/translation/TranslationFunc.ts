import {useLanguage} from "./LanguageContext";


interface TranslationFuncProps {
    params?: any[];
}

const TranslationFunc = ({ params }: TranslationFuncProps) => {
    const {language,setLanguage, t} = useLanguage();

    let translated = [];
    try{
        if(params) {
            for (let i = 0; i < params.length; i++) {
                const tt = t(params[i]);
                translated.push(tt);
            }
        }
    }
    catch(err){
        console.log(err);
    }
    return translated;

}

export default TranslationFunc;