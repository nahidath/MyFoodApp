import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {FC} from "react";
import styles from "../stylesheets/Notifications_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";

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

    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#064851" />
            <ScrollView>
            <View style={styles.notificationContainer}>
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>Notification 1</Text>
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