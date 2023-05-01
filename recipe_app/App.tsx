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
// @ts-ignore
export const ThemeContext = React.createContext();
export const NotificationContext = createContext<{notification:boolean, setNotification : (value:boolean) => void}>({
    notification: true,
    setNotification: () => {},
});


export default function App() {

    // const admin = require('firebase-admin');
    //refresh the whole app when the user is logged in or out
    const [loggedIn, setLoggedIn] = useState(false);
    // const navigation = useNavigation();
    // const [enabled, setEnabled] = useState(false);
    const [notification, setNotification] = useState<boolean>(true);
    // const [registrationToken, setRegistrationToken] = useState<string[]>([]);
    // const userId = auth.currentUser?.uid;
    // const vapidkey : string | undefined = REACT_APP_VAPIDKEY;
    // const cloudMessaging : string | undefined = REACT_APP_CLOUD_MESSAGING;
    // let messagingSW = getMessaging();
    const [permissionResult, setPermissionResult] = useState<boolean>(false);

    const requestUserPermission =  () => {
        console.log('Requesting user permission');
        let enabled = false;
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(r => enabled = (r === PermissionsAndroid.RESULTS.GRANTED));
        console.log('User permission granted:', enabled);
        // if(enabled){
        //     console.log('User has authorised notifications');
        //     return true;
        // }else{
        //     console.log('User has not authorised notifications');
        //     return false;
        // }
        // const authStatus = await messaging().requestPermission();
        // const enabled =
        //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        //
        // if (enabled) {
        //     console.log('Authorization status enabled:', authStatus);
        //     return true;
        // }else{
        //     console.log('Authorization status not enabled:', authStatus);
        //     return false;
        // }
        return enabled;

    }

    const saveTokenToDatabase = async (token: string) => {
        console.log('Saving token to database')
        // Assume user is already signed in
        // Add the token to the users datastore
        await setDoc(doc(cloudFS, "users"), {
            tokens: arrayUnion(token),
        }, {merge: true});
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

    useEffect(() => {
        request( PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((result) => {
            result === 'granted' ? setNotification(true) : setNotification(false)
            // setPermissionResult(result)
            console.log(result)
        });
    }, []);





    useEffect(() => {
        if(notification){
            // if (requestUserPermission()) {
            //     console.log('User has authorised notifications');
            //     messaging().getToken().then(token => {
            //         console.log('Token: ', token);
            //         return saveTokenToDatabase(token);
            //     });
            // }else {
            //     return;
            // }
            // sendNotification().then(r => console.log('Notification sent successfully: ', r)).catch(e => console.log('Error sending notification: ', e));

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
            messaging().onMessage(async (remoteMessage) => {

                // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
                console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

                // return <Notifs title={remoteMessage?.notification?.title} body={remoteMessage?.notification?.body} />;
            });

            messaging().onTokenRefresh(token => {
                saveTokenToDatabase(token).then(r => console.log('Token refreshed successfully: ', r)).catch(e => console.log('Error refreshing token: ', e));
            });
        }else {
            //delete the token from the database
            messaging().deleteToken().then(r => console.log('Token deleted successfully: ', r)).catch(e => console.log('Error deleting token: ', e));
        }

    }, [notification]);

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
    return (
        <ThemeContext.Provider value={themeData}>
            <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
                <NotificationContext.Provider value={{notification, setNotification}}>
                    {loggedIn ? <BottomNavigation />  : <BottomNavigation />}
                    {/*<BottomNavigation />*/}
                </NotificationContext.Provider>
            </NavigationContainer>
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
