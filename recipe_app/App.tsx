import {NavigationContainer, DarkTheme, DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import React, {createContext, useEffect, useRef, useState} from "react";
import { auth, cloudFS } from "./src/firebase/config";
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
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
import {request, PERMISSIONS} from 'react-native-permissions';
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
    const [notifEnabled, setNotifEnabled] = useState(false);
    // const notifEnabled = { notification, setNotification };


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

    // const [registrationToken, setRegistrationToken] = useState<string[]>([]);
    // const userId = auth.currentUser?.uid;
    // const vapidkey : string | undefined = REACT_APP_VAPIDKEY;
    // const cloudMessaging : string | undefined = REACT_APP_CLOUD_MESSAGING;
    // let messagingSW = getMessaging();
    const [permissionResult, setPermissionResult] = useState<boolean>(false);

    const requestUserPermission = async () => {
        // console.log('Requesting user permission');
        // let enabled = false;
        // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(r => enabled = (r === PermissionsAndroid.RESULTS.GRANTED));
        // console.log('User permission granted:', enabled);
        // if(enabled){
        //     console.log('User has authorised notifications');
        //     return true;
        // }else{
        //     console.log('User has not authorised notifications');
        //     return false;
        // }
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status enabled:', authStatus);
            return true;
        }else{
            console.log('Authorization status not enabled:', authStatus);
            return false;
        }
        // return enabled;
        // try {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        //         {
        //             title: 'My Recipe App Notification Permission',
        //             message:
        //                 'My Recipe App needs access to your notifications ' +
        //                 'so you can receive notifications.',
        //             buttonNeutral: 'Ask Me Later',
        //             buttonNegative: 'Cancel',
        //             buttonPositive: 'OK',
        //         },
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         console.log('You can send notifications');
        //         return true;
        //     } else {
        //         console.log('Notifications permission denied');
        //         return false;
        //     }
        // } catch (err) {
        //     console.warn(err);
        // }
        // console.log('Requesting user permission');
        // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(r => setEnabled(r === PermissionsAndroid.RESULTS.GRANTED));
        // messaging().getToken().then(token => {
        //     console.log('Token: ', token);
        // });
        // try {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        //         {
        //             title: 'Notification Permission',
        //             message: 'App needs access to your notifications',
        //             buttonNeutral: 'Ask Me Later',
        //             buttonNegative: 'Cancel',
        //             buttonPositive: 'OK',
        //         },
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         console.log('User has authorised notifications');
        //         return true;
        //     } else {
        //         console.log('User has not authorised notifications');
        //         return false;
        //     }
        // } catch (err) {
        //     console.warn(err);
        //     return false;
        // }

    }

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

    useEffect(() => {
        if(notifEnabled){
            console.log('Requesting user permission');
            requestUserPermission().then((granted) =>{
                if(granted){
                   setPermissionResult(true);
                    saveTokenToDatabase().then(r => console.log('Token saved to database: ', r)).catch(e => console.log('Error saving token to database: ', e));
                }
               setPermissionResult(false)
            });
            console.log('Permission result: ', permissionResult);
        }else{
            console.log('Notifications not enabled');
        }
    }, [notifEnabled]);




    useEffect(() => {
        if(permissionResult){
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
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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

    }, [permissionResult]);

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
    console.log("notification :", notifEnabled);
    return (
        <ThemeContext.Provider value={themeData}>
            <NotificationContext.Provider value={{ notifEnabled, setNotifEnabled }}>
                <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
                    {loggedIn ? <BottomNavigation />  : <BottomNavigation />}
                    {/*<BottomNavigation />*/}
                </NavigationContainer>
            </NotificationContext.Provider>
        </ThemeContext.Provider>

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
