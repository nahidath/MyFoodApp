import {View, Text, Switch, Platform, Button} from "react-native";
import styles from "../stylesheets/NS_stylesheet";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {useTheme} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {child, ref, remove, set} from "firebase/database";
import {auth, database} from "../firebase/config";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";



const NotificationSettings = () => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const {colors} = useTheme();
    const theme = useTheme();
    const [isEnabledPush, setIsEnabledPush] = useState(false);
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [translation1, setTranslation1] = useState<string>("System notifications");
    const [translation2, setTranslation2] = useState<string>("Receive notifications about latest recipes updates.");
    const [translation3, setTranslation3] = useState<string>("Notification Push");
    const [translation4, setTranslation4] = useState<string>("Notification Email");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);

                } catch (error) {
                    console.error('Erreur de traduction NotificationSettings:', error);
                }
            }else {
                setTranslation1("System notifications");
                setTranslation2("Receive notifications about latest recipes updates.");
                setTranslation3("Notification Push");
                setTranslation4("Notification Email");
            }
        }
        fetchTranslation();
    }, [language])

    //Email Notifs
    const toggleSwitchEmail = () => setIsEnabledEmail(previousStateEmail => !previousStateEmail);
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

    //Push Notifs
    const toggleSwitchPush = () => {
        setIsEnabledPush(previousStatePush => !previousStatePush);
    }
    const NOTIF_PUSH_SWITCH_KEY = 'notifPushSwitch';
    const getNotifPushSwitch = useCallback(
        async () => {
            const notifPushSwitch = await AsyncStorage.getItem(NOTIF_PUSH_SWITCH_KEY);
            if (notifPushSwitch) {
                setIsEnabledPush(notifPushSwitch === 'true');
                setIsInitialized(true);
            }
    }, []);

    useEffect(() => {
        getNotifPushSwitch();
    }, [getNotifPushSwitch]);

    const setNotifPushSwitch = useCallback(
        async (pIsEnabledPush: { toString: () => string; }) => {
            await AsyncStorage.setItem(NOTIF_PUSH_SWITCH_KEY, pIsEnabledPush.toString());
        }
    , []);

    useEffect(() => {
        setNotifPushSwitch(isEnabledPush);
    }, [setNotifPushSwitch, isEnabledPush]);




    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={{margin: 10}}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, {color: colors.text}]}>{translation1}</Text>
                    <Text style={styles.subTitle}>{translation2}</Text>
                </View>
                <View style={styles.switchContainer}>
                    <View style={[styles.pusherContainer, general.shadow, {backgroundColor:colors.notification}]}>
                        <Text style={[styles.textTitle, {color:colors.text}]}>{translation3}</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#b1dad6'}}
                            thumbColor={isEnabledPush ? '#008375' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchPush}
                            value={isEnabledPush}
                        />
                    </View>
                    <View style={[styles.pusherContainer, general.shadow, {backgroundColor: colors.notification}]}>
                        <Text style={[styles.textTitle, {color: colors.text}]}>{translation4}</Text>
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