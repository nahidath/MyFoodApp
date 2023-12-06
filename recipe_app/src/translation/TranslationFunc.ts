

interface TranslationFuncProps {
    params?: any[];
}

const TranslationFunc = ({ params }: TranslationFuncProps) => {
    const { t } = useTranslation();

    return t(...params);
}