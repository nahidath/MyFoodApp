import {View, Text, Switch, Platform} from "react-native";
import styles from "../stylesheets/NS_stylesheet";
import React, {useEffect, useRef, useState} from "react";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const NotificationSettings = () => {
    const [isEnabledPush, setIsEnabledPush] = useState(false);
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);

    const toggleSwitchPush = () => setIsEnabledPush(previousStatePush => !previousStatePush);
    const toggleSwitchEmail = () => setIsEnabledEmail(previousStateEmail => !previousStateEmail);


    //Push Notifications
    const [expoPushToken, setExpoPushToken] = useState<string|undefined>('');
    const [notification, setNotification] = useState<boolean>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
    const [data, setData] = useState<any>({});

    // Notifications.setNotificationHandler({
    //     handleNotification: async () => ({
    //         shouldShowAlert: true,
    //         shouldPlaySound: false,
    //         shouldSetBadge: false,
    //     }),
    // });
    //
    // Notifications.scheduleNotificationAsync({
    //     content: {
    //         title: data.title,
    //         body: data.body,
    //     },
    //     trigger: {
    //         seconds: 5,
    //     }
    // }).then(r => console.log(r));
    //
    // const sendPushNotification = async (expoPushToken: string | undefined) => {
    //     const message = {
    //         to: expoPushToken,
    //         sound: 'default',
    //         title: 'Original Title',
    //         body: 'And here is the body!',
    //         data: {data: 'goes here'},
    //         _displayInForeground: true,
    //     };
    //
    //     const response = await fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(message),
    //     });
    //     // const data = await response.json();
    //     // console.log(data);
    //     setData(response.json());
    // }
    //
    // const registerForPushNotificationsAsync = async () => {
    //     let token;
    //     if (Device.isDevice) {
    //         const {status: existingStatus} = await Notifications.getPermissionsAsync();
    //         let finalStatus = existingStatus;
    //         if (existingStatus !== 'granted') {
    //             const {status} = await Notifications.requestPermissionsAsync();
    //             finalStatus = status;
    //         }
    //         if (finalStatus !== 'granted') {
    //             alert('Failed to get push token for push notification!');
    //             return;
    //         }
    //         token = (await Notifications.getExpoPushTokenAsync()).data;
    //         console.log("token",token);
    //     } else {
    //         alert('Must use physical device for Push Notifications');
    //     }
    //
    //     if (Platform.OS === 'android') {
    //         Notifications.setNotificationChannelAsync('default', {
    //             name: 'default',
    //             importance: Notifications.AndroidImportance.MAX,
    //             vibrationPattern: [0, 250, 250, 250],
    //             lightColor: '#FF231F7C',
    //         });
    //     }
    //
    //     return token;
    // }
    //
    //
    // useEffect(() => {
    //     if (isEnabledPush) {
    //         console.log("Push notifications enabled");
    //         registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    //
    //         notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //             // @ts-ignore
    //             setNotification(notification);
    //         });
    //
    //         responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //             // @ts-ignore
    //             setNotification(response.notification);
    //         });
    //
    //         return () => {
    //             Notifications.removeNotificationSubscription(notificationListener.current);
    //             Notifications.removeNotificationSubscription(responseListener.current);
    //         };
    //
    //         sendPushNotification(expoPushToken).then(r => console.log(r));
    //     }
    // }, [isEnabledPush]);

    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
            <View style={styles.switchContainer}>
                <View style={[styles.pusherContainer, general.shadow]}>
                    <Text style={styles.textTitle}>Notification Push</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#b1dad6'}}
                        thumbColor={isEnabledPush ? '#008375' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPush}
                        value={isEnabledPush}
                    />
                </View>
                <View style={[styles.pusherContainer, general.shadow]}>
                    <Text style={styles.textTitle}>Notification Email</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#b1dad6'}}
                        thumbColor={isEnabledEmail? '#008375' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchEmail}
                        value={isEnabledEmail}
                    />
                </View>
            </View>
        </View>
    )
}
export default NotificationSettings;