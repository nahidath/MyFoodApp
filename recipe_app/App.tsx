import {NavigationContainer, DarkTheme, DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import React, {createContext, useEffect, useRef, useState} from "react";
import { auth, cloudFS } from "./src/firebase/config";
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import NotificationPush from "./src/components/NotificationPush";
// import admin, {firestore} from "firebase-admin";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import {getToken, onMessage} from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
import Notifs from "./src/screens/Notifs";
// @ts-ignore
import {REACT_APP_VAPIKEY} from "@env";
// import DocumentData = firestore.DocumentData;
import axios from "axios";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
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
    const userId = auth.currentUser?.uid;
    const vapidkey : string | undefined = REACT_APP_VAPIKEY;
    let messagingSW = getMessaging();

    const saveTokenToDatabase = async (token: string) => {
        // Assume user is already signed in
        // Add the token to the users datastore
        await setDoc(doc(cloudFS, "users"), {
            tokens: arrayUnion(token),
        }, {merge: true});
        // await admin.firestore().collection('users').doc(userId).set({
        //     tokens: admin.firestore.FieldValue.arrayUnion(token),
        // }, {merge: true});
    }

    const requestUserPermission =  () => {
        // console.log('Requesting user permission');
        // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(r => setEnabled(r === PermissionsAndroid.RESULTS.GRANTED));
        // if(enabled){
        //     return true;
        // }else{
        //     return false;
        // }
        let enabled = false;
        console.log('Requesting permission...');
        // Notification.requestPermission().then((permission) => {
        //     if (permission === 'granted') {
        //         console.log('Notification permission granted.');
        //         enabled = true;
        //     } else {
        //         console.log('Unable to get permission to notify.');
        //         enabled = false;
        //     }
        // });
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(r => enabled = (r === PermissionsAndroid.RESULTS.GRANTED));
        if (enabled){
            return true;
        }
        return false;
    }

    const sendNotification = async () => {
        let tokenU : DocumentData | undefined;
        // Get the token from the users datastore
        const userToken = await getDoc(doc(cloudFS, "users"));
        if (userToken.exists()) {
            console.log("Document data:", userToken.data());
            tokenU = userToken.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        // const message = {
        //     notification: {
        //         title: 'New recipe',
        //         body: 'Hey come check out this new recipe!',
        //     },
        //     token: tokenU,
        // };


        // await messaging().sendToDevice(tokenU, {
        //     notification: {
        //         title: 'New recipe',
        //         body: 'Hey come check out this new recipe!',
        //     },
        //     contentAvailable: true,
        //     priority: 'high',
        // });

        if(!tokenU) {
            await axios.post('https://fcm.googleapis.com/v1/projects/my-recipe-app-72535/messages:send HTTP/1.1', {
                headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + vapidkey},
                data: {
                    message: {
                        token: tokenU,
                        notification: {
                            title: 'New recipe',
                            body: 'Hey come check out this new recipe!'
                        }
                    }
                }
            }).then(r =>
                console.log('Notification sent successfully: ', r)
            ).catch(e =>
                console.log('Error sending notification: ', e)
            );
        }else{
            console.log('No token available');
        }

    }




    useEffect(() => {
        if(notification){
            if (requestUserPermission()){
                messaging().getToken().then(token => {
                    console.log('Token: ', token);
                    return saveTokenToDatabase(token);
                });
                // getToken(messaging, {vapidKey: vapidkey}).then((currentToken) => {
                //     if (currentToken) {
                //         // Send the token to your server and update the UI if necessary
                //         console.log('Token: ', currentToken);
                //         return saveTokenToDatabase(currentToken);
                //     } else {
                //         // Show permission request UI
                //         console.log('No registration token available. Request permission to generate one.');
                //         Alert.alert('You need to grant permission to the app to receive notifications');
                //         return;
                //     }
                // }).catch((err) => {
                //     console.log('An error occurred while retrieving token. ', err);
                // });
            }
            sendNotification().then(r => console.log('Notification sent successfully: ', r)).catch(e => console.log('Error sending notification: ', e));

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

                return <Notifs title={remoteMessage?.notification?.title} body={remoteMessage?.notification?.body} />;
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

