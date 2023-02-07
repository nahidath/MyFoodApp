import React, {useEffect, useState} from "react";
import {ScrollView, Text, View} from "react-native";
import {FC} from "react";
import styles from "../stylesheets/Notifications_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import {useTheme} from "@react-navigation/native";

const Notifications : FC = () => {
    // const [notifications, setNotifications] = useState<Notification[]>([]);
    //
    // useEffect(() => {
    //     const unsubscribe = NotificationsService.subscribe((notifications) => {
    //     setNotifications(notifications);
    //     });
    //
    //     return () => unsubscribe();
    // }, []);
    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView>
            <View style={styles.notificationContainer}>
                <View style={[styles.notification, general.shadow, {backgroundColor: colors.notification}]}>
                    <Text style={[styles.notificationText, {color: colors.text}]}>Notification 1</Text>
                </View>
            </View>
        </ScrollView>
        {/*{notifications.map((notification) => (*/}
        {/*    <Text key={notification.id}>{notification.message}</Text>*/}
        {/*))}*/}
        </View>
    );
};


export default Notifications;