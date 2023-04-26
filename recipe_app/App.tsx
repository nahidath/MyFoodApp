import {NavigationContainer, DarkTheme, DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import React, {createContext, useEffect, useRef, useState} from "react";
import { auth, cloudFS } from "./src/firebase/config";
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import NotificationPush from "./src/components/NotificationPush";
import admin from "firebase-admin";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import Notifs from "./src/screens/Notifs";
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
    const [enabled, setEnabled] = useState(false);
    const [notification, setNotification] = useState<boolean>(true);
    const [registrationToken, setRegistrationToken] = useState<string[]>([]);
    const userId = auth.currentUser?.uid;

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
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                enabled = true;
            } else {
                console.log('Unable to get permission to notify.');
                setEnabled(false);
            }
        });
    }

    const sendNotification = async () => {
        // Get the token from the users datastore
        const userToken = await getDoc(doc(cloudFS, "users"));
        if (userToken.exists()) {
            console.log("Document data:", userToken.data());
            return userToken.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        await admin.messaging().sendToDevice(userToken.tokens, {
            notification: {
                title: 'New recipe',
                body: 'Hey come check out this new recipe!',
            },
            contentAvailable: true,
            priority: 'high',
        });

    }




    useEffect(() => {
        if(notification){
            if (requestUserPermission()){
                messaging().getToken().then(token => {
                    console.log('Token: ', token);
                    return saveTokenToDatabase(token);
                });
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
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log('Message handled in the background!', remoteMessage);
            });

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

