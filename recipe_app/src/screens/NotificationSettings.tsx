import {View, Text, Switch, Platform, Button} from "react-native";
import styles from "../stylesheets/NS_stylesheet";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {useTheme} from "@react-navigation/native";
import {NotificationContext} from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {child, ref, remove, set} from "firebase/database";
import {auth, database} from "../firebase/config";



const NotificationSettings = () => {
    const [isEnabledPush, setIsEnabledPush] = useState(false);
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    // @ts-ignore
    const { notifEnabled, setNotifEnabled} = React.useContext(NotificationContext);

    const toggleSwitchEmail = () => setIsEnabledEmail(previousStateEmail => !previousStateEmail);
    // const toggleSwitchPush = () => {
    //     setIsEnabledPush(previousStatePush => !previousStatePush);
    //     setNotification(notification === 'On' ? 'Off' : 'On');
    // }

    //Push Notifs
    const {colors} = useTheme();
    const theme = useTheme();
    const NOTIF_EMAIL_SWITCH_KEY = 'notifEmailSwitch';

    const getNotifEmailSwitch = useCallback(
        async () => {
        const notifEmailSwitch = await AsyncStorage.getItem(NOTIF_EMAIL_SWITCH_KEY);
        if (notifEmailSwitch) {
            setIsEnabledEmail(notifEmailSwitch === 'true');
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        getNotifEmailSwitch();
    }, [getNotifEmailSwitch]);

    const setNotifEmailSwitch = useCallback(
        async (pIsEnabledEmail: { toString: () => string; }) => {
            await AsyncStorage.setItem(NOTIF_EMAIL_SWITCH_KEY, pIsEnabledEmail.toString());
        }
    , []);

    useEffect(() => {
       setNotifEmailSwitch(isEnabledEmail);
    }, [setNotifEmailSwitch, isEnabledEmail]);

    useEffect(() => {
        if(!isInitialized) return;
        console.log("useEffect SUB")
        // setNotifEmailSwitch();
        // remove in db
        const db = ref(database);
        const user = auth.currentUser;
        const email = user?.email;
        // @ts-ignore
        const emailEncoded = encodeURIComponent(email).replace(/\./g, '%2E');
        const emailRef = child(db, `subscribers/${emailEncoded}`);
        if (!isEnabledEmail) {
            console.log('remove sub');
            remove(emailRef).then(() => {
                console.log('removed');
            }).catch((error) => {
                console.log(error);
            });
        }else{
            console.log('add sub');
            // @ts-ignore
            set(emailRef, true).then(r => {
                console.log('user subscribed');
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [isEnabledEmail, isInitialized ]);



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
                            thumbColor={notifEnabled ? '#008375' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => setNotifEnabled(value)}
                            value={notifEnabled}
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
                </View>
            </View>
        </View>
    )
}
export default NotificationSettings;