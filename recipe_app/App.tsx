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
// import {REACT_APP_VAPIDKEY, REACT_APP_CLOUD_MESSAGING} from "@env";
import axios from "axios";
import {request, PERMISSIONS, RESULTS, checkNotifications} from 'react-native-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthStack} from "./src/components/AllStackScreen";
import SwiperStarter from "./src/components/SwiperStarter";
import AppIntroSlider from "react-native-app-intro-slider";
import FocusAwareStatusBar from "./src/components/StatusBarStyle";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Constants from 'expo-constants';
import {LanguageProvider} from "./src/translation/LanguageContext";
// @ts-ignore
export const ThemeContext = React.createContext();
// @ts-ignore
export const NotifsParamsContext = React.createContext<any>(null);
export const IncomingNotificationsContext = React.createContext<any>(null);



export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const NOTIF_PUSH_SWITCH_KEY = 'notifPushSwitch';
    const [notifEnabled, setNotifEnabled] = useState(true);
    const [params, setParams] = useState<any>({title: "", body: ""});
    const [incomingNotifs, setIncomingNotifs] = useState<boolean>(false);
    // const cloudMessaging : string | undefined = REACT_APP_CLOUD_MESSAGING;
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
    const [isMounted, setIsMounted] = useState(true);
    const [showIntro, setShowIntro] = useState(false);
    const [isWelcome, setIsWelcome] = useState(true);
    const [appReloading, setAppReloading] = useState(false);


    //user management section
    const checkTokenValidity = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const tokenExpiration = await AsyncStorage.getItem('tokenExpiration');
                const currentTime = Date.now();

                if (currentTime < parseInt(tokenExpiration as string)) {
                    // Token is still valid, proceed with app logic
                    setLoggedIn(true);
                } else {
                    // Token has expired, reauthenticate the user
                    console.log('Token has expired, reauthenticate user');
                    // You can redirect to the sign-in screen or trigger the authentication flow
                    setLoggedIn(false)
                }
            } else {
                // No user is currently signed in, handle accordingly
                console.log('No user signed in');
            }
        } catch (error) {
            console.log('Error checking token validity:', error);
        }
    }

    useEffect(() => {
        checkTokenValidity();
    }, [auth]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                AsyncStorage.setItem('userToken', user.uid);
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

        return unsubscribe;
    }, [auth]);

    //notification push section
    async function loadNotifEnabled() {
        const value = await AsyncStorage.getItem(NOTIF_PUSH_SWITCH_KEY);
        if (value !== null) {
            setNotifEnabled(value === 'true');
        }
    }
    useEffect(() => {
        loadNotifEnabled();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(NOTIF_PUSH_SWITCH_KEY, notifEnabled.toString());
    }, [notifEnabled]);
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
                saveTokenToDatabase(token);
            }
        } catch (error) {
            console.log('Error requesting notification permission: ', error);
        }
    };
    const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
        if (nextAppState === 'active' && loggedIn) {
            checkNotificationPermission();

        }
        setAppState(nextAppState);
        const isReloading = appState.match(/inactive|background/) && nextAppState === 'active';
        // @ts-ignore
        setAppReloading(isReloading);
        setAppState(appState);
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

    const saveTokenToDatabase = async (token: string | undefined) => {
        // Assume user is already signed in
        const userId = auth.currentUser?.uid || "undefined";

        await setDoc(doc(cloudFS, "devicesUsers",userId), {
            tokens: token
        }, { merge: true });

    }

    // const sendWelcomeNotification = async (deviceToken : string) => {
    //     const payload = {
    //         notification: {
    //             title: 'Welcome to Recipe App!',
    //             body: 'Get ready to explore a world of delicious recipes and culinary inspiration. From mouth-watering appetizers to delectable desserts, we have a wide variety of recipes to suit every taste. Start your culinary journey today and let your taste buds be delighted!'
    //         },
    //         to: deviceToken
    //     };
    //
    //
    //     try {
    //         const response = await axios.post('https://fcm.googleapis.com/fcm/send', payload, {
    //
    //             headers: {'Content-Type': 'application/json', 'Authorization': 'key=' + cloudMessaging},
    //         });
    //
    //         console.log('Notification sent successfully: ', response.data);
    //     }catch(e) {
    //         console.log('Error sending notification: ', e)
    //     };
    //
    //     setIsWelcome(false);
    //
    // }
    // const fetchDeviceTokenAndSendWelcomeNotification = async () => {
    //     try {
    //         if(!loggedIn){
    //             console.log('User not logged in, not fetching device token');
    //             return;
    //         }
    //         const userId = auth.currentUser?.uid || "undefined";
    //         const docRef = doc(cloudFS, 'devicesUsers', userId);
    //         const docSnapshot = await getDoc(docRef);
    //
    //         if (docSnapshot.exists()) {
    //             const userData = docSnapshot.data();
    //             const deviceToken = userData.tokens;
    //
    //             if (deviceToken) {
    //                 // Send the notification using the retrieved device token
    //                 await sendWelcomeNotification(deviceToken);
    //             } else {
    //                 console.log('Device token not found');
    //             }
    //         } else {
    //             console.log('User document does not exist');
    //         }
    //     } catch (error) {
    //         console.log('Error fetching device token:', error);
    //     }
    // };
    // const sendNotification = async (deviceToken : string) => {
    //        console.log('Sending notification to device: ', deviceToken);
    //     const payload = {
    //         notification: {
    //             title: 'Welcome to Recipe App!',
    //             body: 'Get ready to explore a world of delicious recipes and culinary inspiration. From mouth-watering appetizers to delectable desserts, we have a wide variety of recipes to suit every taste. Start your culinary journey today and let your taste buds be delighted!'
    //         },
    //         to: deviceToken
    //     };
    //
    //
    //     try {
    //         const response = await axios.post('https://fcm.googleapis.com/fcm/send', payload, {
    //
    //             headers: {'Content-Type': 'application/json', 'Authorization': 'key=' + cloudMessaging},
    //         });
    //
    //         console.log('Notification sent successfully: ', response.data);
    //     }catch(e) {
    //         console.log('Error sending notification: ', e)
    //     };
    //
    //     setIsWelcome(false);
    //
    // }
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
                    // await sendNotification(deviceToken);
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

    if (!isMounted) {
        return null; // Or render a placeholder component if needed
    }


    useEffect(() => {
        if(notifEnabled) {
            // if(loggedIn && isWelcome) fetchDeviceTokenAndSendWelcomeNotification();
            if(loggedIn) fetchDeviceTokenAndSendNotification();
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
        if(showIntro) {
            AsyncStorage.getItem('showIntro').then((value) => {
                if (value === 'false') {
                    setShowIntro(false);
                }
            });
        }
    }, [showIntro]);


    //theme section
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


    // if(showIntro) {
    //     // setShowIntro(false);
    //     return (
    //         <GestureHandlerRootView style={{ flex: 1 }}>
    //             <ThemeContext.Provider value={themeData}>
    //                 <NotifsParamsContext.Provider value={params}>
    //                     <IncomingNotificationsContext.Provider value={{incomingNotifs, setIncomingNotifs}}>
    //                         <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
    //
    //                         </NavigationContainer>
    //                     </IncomingNotificationsContext.Provider>
    //                 </NotifsParamsContext.Provider>
    //             </ThemeContext.Provider>
    //         </GestureHandlerRootView>
    //     );
    // }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <LanguageProvider>
                <ThemeContext.Provider value={themeData}>
                    <NotifsParamsContext.Provider value={params}>
                        <IncomingNotificationsContext.Provider value={{incomingNotifs, setIncomingNotifs}}>
                            <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
                                {/*{appInstalled ? <SwiperStarter doneNavigation={true}/> : null}*/}
                                {showIntro ?  <SwiperStarter/> : loggedIn ? <BottomNavigation />  : <AuthStack />}
                                {/*<BottomNavigation />*/}
                            </NavigationContainer>
                        </IncomingNotificationsContext.Provider>
                    </NotifsParamsContext.Provider>
                </ThemeContext.Provider>
            </LanguageProvider>
        </GestureHandlerRootView>


    );



}