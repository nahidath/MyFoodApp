import React, {useEffect, useState} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {FC} from "react";
import styles from "../stylesheets/Notifications_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import {useNavigation, useTheme} from "@react-navigation/native";
import {auth} from "../firebase/config";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {NotificationsStackList} from "../types/types";


// @ts-ignore
type NotificationsProps = MyStackNavigationProp<NotificationsStackList, 'Notifs'>;
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
    const user = auth.currentUser;
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const navigation = useNavigation<NotificationsProps>();

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {user == null ? <View style={[styles.restricted, {backgroundColor: colors.background}]}>
                <Text style={[styles.restrictedText, {color: colors.text}]}>You must be logged in to view this page.</Text>
                <TouchableOpacity style={[styles.button,  {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View> :
            <ScrollView>
            <View style={styles.notificationContainer}>
                <View style={[styles.notification, general.shadow, {backgroundColor: colors.notification}]}>
                    <Text style={[styles.notificationText, {color: colors.text}]}>Notification 1</Text>
                </View>
            </View>
        </ScrollView>
            }
        {/*{notifications.map((notification) => (*/}
        {/*    <Text key={notification.id}>{notification.message}</Text>*/}
        {/*))}*/}
        </View>
    );
};


export default Notifications;