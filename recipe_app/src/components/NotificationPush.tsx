import {Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";
import React from "react";
import {useTheme} from "@react-navigation/native";


interface NotificationPushProps {
    title: string | undefined;
    body: string | undefined;
}

const NotificationPush = ({title, body}: NotificationPushProps) => {

    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <TouchableOpacity style={[styles.notification, general.shadow, {backgroundColor: colors.notification}]}>
            <Text style={[styles.notificationTitle, {color: colors.text}]}>{title}</Text>
            <Text style={[styles.notificationBody, {color: colors.text}]}>{body}</Text>
        </TouchableOpacity>
    );
};

export default NotificationPush;
