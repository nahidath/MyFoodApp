import {NavigationContainer, DarkTheme, DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import React, {createContext, useEffect, useRef, useState} from "react";
import { auth, cloudFS } from "./src/firebase/config";
import messaging from '@react-native-firebase/messaging';
import {Alert, AppState, AppStateStatus, Linking, PermissionsAndroid, Platform} from 'react-native';
import * as Permissions from 'expo-permissions';
import NotificationPush from "./src/components/NotificationPush";
// import admin, {firestore} from "firebase-admin";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
// import {getToken, onMessage} from "firebase/messaging";
// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";
import Notifs from "./src/screens/Notifs";
// @ts-ignore
import {REACT_APP_VAPIDKEY, REACT_APP_CLOUD_MESSAGING} from "@env";
// import DocumentData = firestore.DocumentData;
import axios from "axios";
// import firebase from "firebase/compat";
// import DocumentData = firebase.firestore.DocumentData;
import * as permissions from 'react-native-permissions';
// you may also import just the functions or constants that you will use from this library
import {request, PERMISSIONS, RESULTS, checkNotifications} from 'react-native-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
export const ThemeContext = React.createContext();
// @ts-ignore
export const NotificationContext = React.createContext();
// export const NotificationContext = createContext<{notification:boolean, setNotification : (value:boolean) => void}>({
//     notification: true,
//     setNotification: () => {},
// });


export default function App() {

    // const admin = require('firebase-admin');
    //refresh the whole app when the user is logged in or out
    const [loggedIn, setLoggedIn] = useState(false);
    // const navigation = useNavigation();
    const [enabled, setEnabled] = useState(false);
    const NOTIF_SWITCH_KEY = 'notifSwitch';
    // const [notifEnabled, setNotifEnabled] = useState(true);
    // const notifEnabled = { notification, setNotification };

    //
    // useEffect(() => {
    //     async function loadNotifEnabled() {
    //         const value = await AsyncStorage.getItem(NOTIF_SWITCH_KEY);
    //         if (value !== null) {
    //             setNotifEnabled(value === 'true');
    //         }
    //     }
    //     loadNotifEnabled().then(r => console.log('Notif enabled: ', notifEnabled));
    // }, []);
    // useEffect(() => {
    //     AsyncStorage.setItem(NOTIF_SWITCH_KEY, notifEnabled.toString()).then(r => console.log('Notif enabled: ', notifEnabled));
    // }, [notifEnabled]);

    // const [registrationToken, setRegistrationToken] = useState<string[]>([]);
    // const userId = auth.currentUser?.uid;
    // const vapidkey : string | undefined = REACT_APP_VAPIDKEY;
    // const cloudMessaging : string | undefined = REACT_APP_CLOUD_MESSAGING;
    // let messagingSW = getMessaging();
    const [permissionResult, setPermissionResult] = useState<boolean>(false);

    // const requestUserPermission = async () => {
    //
    //
    // }

    const saveTokenToDatabase = async () => {
        // console.log('Saving token to database')
        // // Assume user is already signed in
        // // Add the token to the users datastore
        // await setDoc(doc(cloudFS, "users"), {
        //     tokens: token,
        // }, {merge: true});
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            try{
                const token = await messaging().getToken();
                if (token) {
                    console.log('Token: ', token);
                    await AsyncStorage.setItem('fcmToken', token);
                }
            }catch (e) {
                console.log('Error getting token: ', e);
            }
        }
    }




    // const sendNotification = async () => {
    //     console.log('Sending notification')
    //     console.log('get token from database')
    //     let tokenU : DocumentData | undefined;
    //     // Get the token from the users datastore
    //     const userToken = await getDoc(doc(cloudFS, "users"));
    //     if (userToken.exists()) {
    //         console.log("Document data:", userToken.data());
    //         tokenU = userToken.data();
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    //
    //     if(!tokenU) {
    //         await axios.post('https://fcm.googleapis.com/fcm/send', {
    //             headers: { 'Authorization': 'key=' + cloudMessaging},
    //
    //             data: {
    //                 message: {
    //                     token: tokenU,
    //                     notification: {
    //                         title: 'New recipe',
    //                         body: 'Hey come check out this new recipe!'
    //                     }
    //                 }
    //             }
    //         }).then(r =>
    //             console.log('Notification sent successfully: ', r)
    //         ).catch(e =>
    //             console.log('Error sending notification: ', e)
    //         );
    //     }else{
    //         console.log('No token available');
    //     }
    //
    // }

    // useEffect(() => {
    //     request( PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((result) => {
    //         result === 'granted' ? setNotification(true) : setNotification(false)
    //         // setPermissionResult(result)
    //         console.log(result)
    //     });
    // }, []);

    // useEffect(() => {
    //     console.log('Checking permission');
    //     async function checkPermission() {
    //         const granted = await requestUserPermission();
    //         return granted;
    //     }
    //     checkPermission().then((granted) =>{
    //         granted ? setPermissionResult(true) : setPermissionResult(false);
    //     });
    //     console.log('Permission result: ', permissionResult);
    // }, [notifEnabled]);

    // useEffect(() => {
    //     if(notifEnabled){
    //         console.log('Requesting user permission');
    //         requestUserPermission().then((granted) =>{
    //             if(granted){
    //                setPermissionResult(true);
    //                 saveTokenToDatabase().then(r => console.log('Token saved to database: ', r)).catch(e => console.log('Error saving token to database: ', e));
    //             }
    //            setPermissionResult(false)
    //         });
    //         console.log('Permission result: ', permissionResult);
    //     }else{
    //         console.log('Notifications not enabled');
    //     }
    // }, [notifEnabled]);
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        // Subscribe to app state changes
        AppState.addEventListener('change', handleAppStateChange);

        // Check initial notification permission status
        checkNotificationPermission();

        return () => {
            // Unsubscribe from app state changes when the component unmounts
            setIsMounted(false);
        };
    }, []);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        setAppState(nextAppState);
        if (nextAppState === 'active') {
            checkNotificationPermission();
        }
    };
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
            }
        } catch (error) {
            console.log('Error requesting notification permission: ', error);
        }
    };


    useEffect(() => {
            console.log('Requesting user permission');
            // async function registerForPushNotificationsAsync() {
            //     // const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            //     // let finalStatus = existingStatus;
            //     //
            //     // if (existingStatus !== 'granted') {
            //     //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            //     //     finalStatus = status;
            //     //     console.log(finalStatus);
            //     // }
            //     //
            //     // if (finalStatus !== 'granted') {
            //     //     Alert.alert(
            //     //         'Notification Permission Required',
            //     //         'Please grant permission for notifications in your device settings to receive updates.',
            //     //         [
            //     //             { text: 'Cancel', style: 'cancel' },
            //     //             {
            //     //                 text: 'Open Settings',
            //     //                 onPress: () => {
            //     //                     Linking.openSettings();
            //     //
            //     //                 },
            //     //             },
            //     //         ],
            //     //         { cancelable: false }
            //     //     );
            //     //     return;
            //     // }
            //     //
            //     // const token = await messaging().getToken();
            //     // console.log('Device token:', token);
            //     // if (Platform.OS === 'android') {
            //     //     try {
            //     //         console.log('Requesting permission');
            //     //         const granted = await PermissionsAndroid.request(
            //     //             PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            //     //             {
            //     //                 title: 'Notification Permission',
            //     //                 message: 'Allow this app to receive notifications?',
            //     //                 buttonPositive: 'OK',
            //     //                 buttonNegative: 'Cancel',
            //     //             }
            //     //         );
            //     //
            //     //         if (granted === PermissionsAndroid.RESULTS.DENIED || granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            //     //             console.log('Permission denied');
            //     //             Alert.alert(
            //     //                 'Notification Permission Required',
            //     //                 'Please grant permission for notifications in your device settings to receive updates.',
            //     //                 [
            //     //                     { text: 'Cancel', style: 'cancel' },
            //     //                     {
            //     //                         text: 'Open Settings',
            //     //                         onPress: () => {
            //     //                             Linking.openSettings();
            //     //
            //     //                         },
            //     //                     },
            //     //                 ],
            //     //                 { cancelable: false }
            //     //             );
            //     //
            //     //         } else if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //     //             const token = await messaging().getToken();
            //     //             console.log('Device token:', token);
            //     //         }
            //     //     } catch (err) {
            //     //         console.log(err);
            //     //     }
            //     // }
            //     try {
            //         const status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
            //         console.log(status);
            //
            //         if (status === RESULTS.DENIED || status === RESULTS.BLOCKED ) {
            //             Alert.alert(
            //                 'Notification Permission Required',
            //                 'Please grant permission for notifications in your device settings to receive updates.',
            //                 [
            //                     { text: 'Cancel', style: 'cancel' },
            //                     {
            //                         text: 'Open Settings',
            //                         onPress: () => {
            //                             Linking.openSettings();
            //
            //                         },
            //                     },
            //                 ],
            //                 { cancelable: false }
            //             );
            //
            //         } else if (status === RESULTS.GRANTED) {
            //             const token = await messaging().getToken();
            //             console.log('Device token:', token);
            //         }
            //
            //         console.log(await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS));
            //     } catch (error) {
            //         console.log('Error requesting notification permission: ', error);
            //     }
            // }
            //
            // registerForPushNotificationsAsync();
        checkNotificationPermission();

    }, []);



    // useEffect(() => {
    //     // if(notifEnabled) {
    //     //     requestNotificationPermission().then((granted) => {
    //     //         if (granted) {
    //     //             setPermissionResult(true);
    //     //         }
    //     //         setPermissionResult(false)
    //     //     });
    //     // }
    //     if(notifEnabled) {
    //         // console.log(permissionResult);
    //         saveTokenToDatabase().then(r => console.log('Token saved to database: ', r)).catch(e => console.log('Error saving token to database: ', e));
    //         messaging()
    //             .getInitialNotification()
    //             .then(async (remoteMessage) => {
    //                 if (remoteMessage) {
    //                     console.log(
    //                         'Notification caused app to open from quit state:',
    //                         remoteMessage.notification,
    //                     );
    //                 }
    //             });
    //         messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //             //add a navigation to the recipe page
    //             console.log(
    //                 'Notification caused app to open from background state:',
    //                 remoteMessage.notification,
    //             );
    //         });
    //         //incoming message when the app is in the background
    //         messaging().setBackgroundMessageHandler(async remoteMessage => {
    //             console.log('Message handled in the background!', remoteMessage);
    //         });
    //         //incoming message when the app is in the foreground
    //         // messaging().onMessage(async (remoteMessage) => {
    //         //
    //         //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //         //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //         //
    //         //     // return <Notifs title={remoteMessage?.notification?.title} body={remoteMessage?.notification?.body} />;
    //         // });
    //         const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //             Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //         });
    //
    //         return unsubscribe;
    //     }
    //
    //     // messaging().onTokenRefresh(token => {
    //     //     saveTokenToDatabase(token).then(r => console.log('Token refreshed successfully: ', r)).catch(e => console.log('Error refreshing token: ', e));
    //     // });
    //     // else {
    //     //     //delete the token from the database
    //     //     messaging().deleteToken().then(r => console.log('Token deleted successfully: ', r)).catch(e => console.log('Error deleting token: ', e));
    //     // }
    //
    // }, [notifEnabled]);

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
    // console.log("notification :", notifEnabled);
    return (
        // <NotificationContext.Provider value={{ notifEnabled, setNotifEnabled }}>
            <ThemeContext.Provider value={themeData}>
                <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
                    {loggedIn ? <BottomNavigation />  : <BottomNavigation />}
                    {/*<BottomNavigation />*/}
                </NavigationContainer>
            </ThemeContext.Provider>
        // </NotificationContext.Provider>

  );
}


// import {NavigationContainer, DarkTheme, DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
// import BottomNavigation from "./src/components/BottomNavigation";
// import React, {createContext, useEffect, useRef, useState} from "react";
// import { auth } from "./src/firebase/config";
// import messaging from '@react-native-firebase/messaging';
// import {Alert, PermissionsAndroid, Platform} from 'react-native';
// import NotificationPush from "./src/components/NotificationPush";
// import Notifs from "./src/screens/Notifs";
// // @ts-ignore
// export const ThemeContext = React.createContext();
// export const NotificationContext = createContext<{notification:boolean, setNotification : (value:boolean) => void}>({
//     notification: true,
//     setNotification: () => {},
// });
//
//
// export default function App() {
//
//     // const admin = require('firebase-admin');
//     //refresh the whole app when the user is logged in or out
//     const [loggedIn, setLoggedIn] = useState(false);
//     // const navigation = useNavigation();
//     const [enabled, setEnabled] = useState(false);
//     const [notification, setNotification] = useState<boolean>(true);
//     const [registrationToken, setRegistrationToken] = useState<string[]>([]);
//     const userId = auth.currentUser?.uid;
//
//     // const saveTokenToDatabase = async (token: string) => {
//     //     // Assume user is already signed in
//     //     // Add the token to the users datastore
//     //     await admin.firestore().collection('users').doc(userId).set({
//     //         tokens: admin.firestore.FieldValue.arrayUnion(token),
//     //     }, {merge: true});
//     // }
//
//     const requestUserPermission =  () => {
//         console.log('Requesting user permission');
//         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(r => setEnabled(r === PermissionsAndroid.RESULTS.GRANTED));
//         if(enabled){
//             return true;
//         }else{
//             return false;
//         }
//
//     }
//
//     // const sendNotification = async () => {
//     //     const userToken = admin.firestore().collection('users').doc(userId).get().then((doc: { exists: any; data: () => any; }) => {
//     //         if (doc.exists) {
//     //             console.log("Document data:", doc.data());
//     //             return doc.data();
//     //         } else {
//     //             // doc.data() will be undefined in this case
//     //             console.log("No such document!");
//     //         }
//     //     }).catch((error: any) => {
//     //         console.log("Error getting document:", error);
//     //     });
//     //
//     //     await admin.messaging().sendToDevice(userToken.tokens, {
//     //         notification: {
//     //             title: 'New recipe',
//     //             body: 'Hey come check out this new recipe!',
//     //         },
//     //         contentAvailable: true,
//     //         priority: 'high',
//     //     });
//     //
//     // }
//
//
//
//
//     useEffect(() => {
//         if(notification){
//             if (requestUserPermission()){
//                 messaging().getToken().then(token => {
//                     console.log('Token: ', token);
//                     // return saveTokenToDatabase(token);
//                 });
//             }
//             // sendNotification().then(r => console.log('Notification sent successfully: ', r)).catch(e => console.log('Error sending notification: ', e));
//
//             messaging()
//                 .getInitialNotification()
//                 .then(async (remoteMessage) => {
//                     if (remoteMessage) {
//                         console.log(
//                             'Notification caused app to open from quit state:',
//                             remoteMessage.notification,
//                         );
//                     }
//                 });
//             messaging().onNotificationOpenedApp(async (remoteMessage) => {
//                 //add a navigation to the recipe page
//                 console.log(
//                     'Notification caused app to open from background state:',
//                     remoteMessage.notification,
//                 );
//             });
//             messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//                 console.log('Message handled in the background!', remoteMessage);
//             });
//
//             messaging().onMessage(async (remoteMessage) => {
//
//                 // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//                 console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
//
//                 return <Notifs title={remoteMessage?.notification?.title} body={remoteMessage?.notification?.body} />;
//             });
//
//             messaging().onTokenRefresh(token => {
//                 // saveTokenToDatabase(token).then(r => console.log('Token refreshed successfully: ', r)).catch(e => console.log('Error refreshing token: ', e));
//                 console.log('Token refreshed successfully: ', token);
//             });
//         }else {
//             //delete the token from the database
//             messaging().deleteToken().then(r => console.log('Token deleted successfully: ', r)).catch(e => console.log('Error deleting token: ', e));
//         }
//
//     }, [notification]);
//
//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if (user) {
//                 setLoggedIn(true);
//             } else {
//                 setLoggedIn(false);
//             }
//         });
//
//         return unsubscribe;
//     }, [auth]);
//
//     const [theme, setTheme] = useState('Light');
//     const themeData = { theme, setTheme };
//     const MyDarkTheme = {
//         dark: true,
//         colors: {
//             primary: '#121212',
//             background: '#121212',
//             card: '#9fc131',
//             text: '#f2f2f2',
//             border: '#fff',
//             notification: '#252525',
//         },
//     };
//     const MyLightTheme = {
//         dark: false,
//         colors: {
//             primary: '#9fc131',
//             background: '#FAF9F6',
//             card: '#fff',
//             text: '#041721',
//             border: '#041721',
//             notification: '#fefefe',
//         }
//     }
//     return (
//         <ThemeContext.Provider value={themeData}>
//             <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
//                 <NotificationContext.Provider value={{notification, setNotification}}>
//                     {loggedIn ? <BottomNavigation />  : <BottomNavigation />}
//                     {/*<BottomNavigation />*/}
//                 </NotificationContext.Provider>
//             </NavigationContainer>
//         </ThemeContext.Provider>
//
//     );
// }
