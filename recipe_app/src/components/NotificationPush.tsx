import {Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";
import React, {useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {useLanguage} from "../translation/LanguageContext";


interface NotificationPushProps {
    title: string | undefined;
    body: string | undefined;
}

const NotificationPush = ({title, body}: NotificationPushProps) => {

    const {colors} = useTheme();
    const theme = useTheme();
    const {language,setLanguage, t} = useLanguage();
    const [translationTitle, setTranslationTitle] = useState(title);
    const [translationBody, setTranslationBody] = useState(body);

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const translationOfTitle = await t(String(translationTitle));
                    const translationOfBody = await t(String(translationBody));
                    setTranslationTitle(translationOfTitle);
                    setTranslationBody(translationOfBody);
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
