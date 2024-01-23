import {Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";
import React, {useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {useLanguage} from "../translation/LanguageContext";
import {useTranslation} from "../translation/TranslationFunc";


interface NotificationPushProps {
    title: string | undefined;
    body: string | undefined;
}

const NotificationPush = ({title, body}: NotificationPushProps) => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const {colors} = useTheme();
    const theme = useTheme();
    const [translationTitle, setTranslationTitle] = useState(title);
    const [translationBody, setTranslationBody] = useState(body);

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translationTitle, translationBody]);
                    setTranslationTitle(elementsTranslated[0]);
                    setTranslationBody(elementsTranslated[1]);
                } catch (error) {
                    console.error('Erreur de traduction notificationPush:', error);
                }

            }else {
                setTranslationTitle(title);
                setTranslationBody(body);
            }
        }
        fetchTranslation();
    }, [language]);

    return (
        <TouchableOpacity style={[styles.notification, general.shadow, {backgroundColor: colors.notification}]} activeOpacity={0.95}>
            <Text style={[styles.notificationTitle, {color: colors.text}]}>{translationTitle}</Text>
            <Text style={[styles.notificationBody, {color: colors.text}]}>{translationBody}</Text>
        </TouchableOpacity>
    );
};

export default NotificationPush;
