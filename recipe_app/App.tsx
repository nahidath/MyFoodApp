import {NavigationContainer, DarkTheme, DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import React, {createContext, useCallback, useEffect, useRef, useState} from "react";
import { auth, cloudFS } from "./src/firebase/config";
import messaging from '@react-native-firebase/messaging';
import {
    Alert,
    AppState,
    AppStateStatus, Dimensions, Image,
    Linking,
    PermissionsAndroid,
    PixelRatio,
    Platform,
    StyleSheet, Text, View
} from 'react-native';
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import Notifs from "./src/screens/Notifs";
// @ts-ignore
import {REACT_APP_VAPIDKEY, REACT_APP_CLOUD_MESSAGING} from "@env";
import axios from "axios";
import {request, PERMISSIONS, RESULTS, checkNotifications} from 'react-native-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthStack} from "./src/components/AllStackScreen";
import SwiperStarter from "./src/components/SwiperStarter";
import AppIntroSlider from "react-native-app-intro-slider";
import FocusAwareStatusBar from "./src/components/StatusBarStyle";
import {GestureHandlerRootView} from "react-native-gesture-handler";
// @ts-ignore
export const ThemeContext = React.createContext();
// @ts-ignore
export const NotificationContext = React.createContext();
export const NotifsParamsContext = React.createContext<any>(null);
export const IncomingNotificationsContext = React.createContext<any>(null);



export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const NOTIF_SWITCH_KEY = 'notifSwitch';
    const [notifEnabled, setNotifEnabled] = useState(true);
    const [params, setParams] = useState<any>({title: "", body: ""});
    const [incomingNotifs, setIncomingNotifs] = useState<boolean>(false);
    const userId : string | undefined = auth.currentUser?.uid;
    const cloudMessaging : string | undefined = REACT_APP_CLOUD_MESSAGING;
    const [permissionResult, setPermissionResult] = useState<boolean>(false);
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
    const [isMounted, setIsMounted] = useState(true);
    const [showIntro, setShowIntro] = useState(true);


    useEffect(() => {
        async function loadNotifEnabled() {
            const value = await AsyncStorage.getItem(NOTIF_SWITCH_KEY);
            if (value !== null) {
                setNotifEnabled(value === 'true');
            }
        }
        loadNotifEnabled().then(r => console.log('Notif enabled: ', notifEnabled));
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(NOTIF_SWITCH_KEY, notifEnabled.toString()).then(r => console.log('Notif enabled: ', notifEnabled));
    }, [notifEnabled]);


    const saveTokenToDatabase = async (token: string | undefined) => {
        // Assume user is already signed in
        const userId = auth.currentUser?.uid || "undefined";

        await setDoc(doc(cloudFS, "devicesUsers",userId), {
            tokens: token
        }, { merge: true });

    }


    const sendNotification = async (deviceToken : string) => {
           console.log('Sending notification to device: ', deviceToken);
        const payload = {
            notification: {
                title: 'New recipe',
                body: 'Hey come check out this new recipe!'
            },
            to: deviceToken
        };


        try {
            const response = await axios.post('https://fcm.googleapis.com/fcm/send', payload, {

                headers: {'Content-Type': 'application/json', 'Authorization': 'key=' + cloudMessaging},
            });

            console.log('Notification sent successfully: ', response.data);
        }catch(e) {
            console.log('Error sending notification: ', e)
        };


    }
    const fetchDeviceTokenAndSendNotification = async () => {
        try {
            if(!loggedIn){
                console.log('User not logged in, not fetching device token');
                return;
            }
            const userId = auth.currentUser?.uid || "undefined";
            const docRef = doc(cloudFS, 'devicesUsers', userId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const deviceToken = userData.tokens;

                if (deviceToken) {
                    // Send the notification using the retrieved device token
                    await sendNotification(deviceToken);
                } else {
                    console.log('Device token not found');
                }
            } else {
                console.log('User document does not exist');
            }
        } catch (error) {
            console.log('Error fetching device token:', error);
        }
    };


    const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
        setAppState(nextAppState);
        if (nextAppState === 'active' && loggedIn) {
            checkNotificationPermission();

        }
    }, [loggedIn]);

    useEffect(() => {
        let isMounted = true;

        const handleAppStateChangeRef = (nextAppState: AppStateStatus) => {
            if (isMounted) {
                handleAppStateChange(nextAppState);
            }
        };

        // Subscribe to app state changes
        AppState.addEventListener('change', handleAppStateChangeRef);
        console.log('Checking notification permission')
        if(loggedIn) checkNotificationPermission();

        return () => {
            // Unsubscribe from app state changes when the component unmounts
            isMounted = false;
        };
    }, [handleAppStateChange, loggedIn]);

    useEffect(() => {
        return () => {
            // Set the mounted flag to false when the component unmounts
            setIsMounted(false);
        };
    }, []);


    const checkNotificationPermission = async () => {
        try {
            const status = await checkNotifications();
            if (status.status === RESULTS.UNAVAILABLE) {
                console.log('Notification permission is not available on this device');
            } else if (status.status === RESULTS.DENIED || status.status === RESULTS.BLOCKED) {
                // Alert is denied or blocked, show the alert dialog
                Alert.alert(
                    'Notification Permission Required',
                    'Please grant permission for notifications in your device settings to receive updates.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Settings',
                            onPress: () => {
                                Linking.openSettings();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                // Request permission if it hasn't been requested before
                requestNotificationPermission();
            }
        } catch (error) {
            console.log('Error checking notification permission: ', error);
        }
    };

    const requestNotificationPermission = async () => {
        try {
            const status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
            if (status === RESULTS.GRANTED) {
                const token = await messaging().getToken();
                console.log('Device token:', token);
                saveTokenToDatabase(token);
            }
        } catch (error) {
            console.log('Error requesting notification permission: ', error);
        }
    };



    useEffect(() => {
        if(notifEnabled) {
            if(loggedIn) fetchDeviceTokenAndSendNotification().catch(e => console.log('Error fetching device token: ', e));
            messaging()
                .getInitialNotification()
                .then(async (remoteMessage) => {
                    if (remoteMessage) {
                        console.log(
                            'Notification caused app to open from quit state:',
                            remoteMessage.notification,
                        );
                    }
                });
            messaging().onNotificationOpenedApp(async (remoteMessage) => {
                //add a navigation to the recipe page
                console.log(
                    'Notification caused app to open from background state:',
                    remoteMessage.notification,
                );
            });
            //incoming message when the app is in the background
            messaging().setBackgroundMessageHandler(async remoteMessage => {
                setIncomingNotifs(true);
                setParams({title: remoteMessage?.notification?.title, body: remoteMessage?.notification?.body})
                console.log('Message handled in the background!', remoteMessage);
            });
            //incoming message when the app is in the foreground
            // messaging().onMessage(async (remoteMessage) => {
            //
            //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            //
            //     // return <Notifs title={remoteMessage?.notification?.title} body={remoteMessage?.notification?.body} />;
            // });
            const unsubscribe = messaging().onMessage(async (remoteMessage) => {
                // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
                setIncomingNotifs(true);
                setParams({title: remoteMessage?.notification?.title, body: remoteMessage?.notification?.body})
                // return <Notifs title={remoteMessage?.notification?.title} body={remoteMessage?.notification?.body} />
            });

            return unsubscribe;
        }

        // messaging().onTokenRefresh(token => {
        //     saveTokenToDatabase(token).then(r => console.log('Token refreshed successfully: ', r)).catch(e => console.log('Error refreshing token: ', e));
        // });
        // else {
        //     //delete the token from the database
        //     messaging().deleteToken().then(r => console.log('Token deleted successfully: ', r)).catch(e => console.log('Error deleting token: ', e));
        // }


    }, [notifEnabled, loggedIn]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

        return unsubscribe;
    }, [auth]);

    const [theme, setTheme] = useState('Light');
    const themeData = { theme, setTheme };
    const MyDarkTheme = {
        dark: true,
        colors: {
            primary: '#121212',
            background: '#121212',
            card: '#9fc131',
            text: '#f2f2f2',
            border: '#fff',
            notification: '#252525',
        },
    };
    const MyLightTheme = {
        dark: false,
        colors: {
            primary: '#9fc131',
            background: '#FAF9F6',
            card: '#fff',
            text: '#041721',
            border: '#041721',
            notification: '#fefefe',
        }
    }
    if (!isMounted) {
        return null; // Or render a placeholder component if needed
    }

    if(showIntro && !loggedIn) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeContext.Provider value={themeData}>
                    <NotificationContext.Provider value={{ notifEnabled, setNotifEnabled }}>
                        <NotifsParamsContext.Provider value={params}>
                            <IncomingNotificationsContext.Provider value={{incomingNotifs, setIncomingNotifs}}>
                                <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
                                    <SwiperStarter setShowIntro={setShowIntro} />
                                </NavigationContainer>
                            </IncomingNotificationsContext.Provider>
                        </NotifsParamsContext.Provider>
                    </NotificationContext.Provider>
                </ThemeContext.Provider>
            </GestureHandlerRootView>


        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeContext.Provider value={themeData}>
                <NotificationContext.Provider value={{ notifEnabled, setNotifEnabled }}>
                    <NotifsParamsContext.Provider value={params}>
                        <IncomingNotificationsContext.Provider value={incomingNotifs}>
                            <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
                                {loggedIn ? <BottomNavigation />  : <AuthStack />}
                                {/*<BottomNavigation />*/}
                            </NavigationContainer>
                        </IncomingNotificationsContext.Provider>
                    </NotifsParamsContext.Provider>
                </NotificationContext.Provider>
            </ThemeContext.Provider>
        </GestureHandlerRootView>
    );
}