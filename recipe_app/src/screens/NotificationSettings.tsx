import {View, Text, Switch, Platform, Button} from "react-native";
import styles from "../stylesheets/NS_stylesheet";
import React, {useEffect, useRef, useState} from "react";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {useTheme} from "@react-navigation/native";



const NotificationSettings = () => {
    const [isEnabledPush, setIsEnabledPush] = useState(false);
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);

    const toggleSwitchEmail = () => setIsEnabledEmail(previousStateEmail => !previousStateEmail);


    //Push Notifs
    const [data, setData] = useState<any>({});
    const {colors} = useTheme();
    const theme = useTheme();

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState<any>(false);

    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    async function sendPushNotification(expoPushToken: any) {
        console.log("from function send push notification:",expoPushToken);
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { someData: 'goes here' },
        };
        console.log("message:",message);
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        console.log('Response status code:', response.status);

        const responseJson = await response.json();

        console.log('Response JSON:', responseJson);

    }
    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("token:",token);
        } else {
            alert('Must use physical device for Push Notifs');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    useEffect(() => {
        console.log("useEffect");
        // @ts-ignore
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        // console.log("notificationListener.current:",notificationListener.current);

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("response",response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const toggleSwitchPush = () => {
        setIsEnabledPush(previousStatePush => !previousStatePush);
        if (!isEnabledPush) {
            sendPushNotification(expoPushToken)
                .then(() => {
                    console.log('Notification sent successfully');
                })
                .catch(error => {
                    console.log('Error sending notification:', error);
                });
        }
    }

    // useEffect(() => {
    //     if (isEnabledPush) {
    //         sendPushNotification(expoPushToken).then(r => console.log("spn:",r));
    //         console.log("Push Notifications Enabled");
    //         console.log("expoPushToken:",expoPushToken);
    //     }
    // }, [isEnabledPush]);


    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={{margin: 10}}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, {color: colors.text}]}>System notifications</Text>
                    <Text style={styles.subTitle}>Receive notifications about latest recipes updates.</Text>
                </View>
                <View style={styles.switchContainer}>
                    <View style={[styles.pusherContainer, general.shadow, {backgroundColor:colors.notification}]}>
                        <Text style={[styles.textTitle, {color:colors.text}]}>Notification Push</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#b1dad6'}}
                            thumbColor={isEnabledPush ? '#008375' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchPush}
                            value={isEnabledPush}
                        />
                    </View>
                    <View style={[styles.pusherContainer, general.shadow, {backgroundColor: colors.notification}]}>
                        <Text style={[styles.textTitle, {color: colors.text}]}>Notification Email</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#b1dad6'}}
                            thumbColor={isEnabledEmail? '#008375' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchEmail}
                            value={isEnabledEmail}
                        />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Title: {notification && notification.request.content.title} </Text>
                        <Text>Body: {notification && notification.request.content.body}</Text>
                        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                    {/*<Button*/}
                    {/*    title="Press to Send Notification"*/}
                    {/*    onPress={async () => {*/}
                    {/*        await sendPushNotification(expoPushToken);*/}
                    {/*    }}*/}
                    {/*/>*/}
                </View>
            </View>
        </View>
    )
}
export default NotificationSettings;