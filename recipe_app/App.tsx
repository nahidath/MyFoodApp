import {NavigationContainer, DarkTheme, DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import React, {createContext, useEffect, useRef, useState} from "react";
import { auth } from "./src/firebase/config";
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import NotificationPush from "./src/components/NotificationPush";
import Notifs from "./src/screens/Notifs";
// @ts-ignore
export const ThemeContext = React.createContext();
export const NotificationContext = createContext<{notification:boolean, setNotification : (value:boolean) => void}>({
    notification: true,
    setNotification: () => {},
});


export default function App() {

    //refresh the whole app when the user is logged in or out
    const [loggedIn, setLoggedIn] = useState(false);
    // const navigation = useNavigation();
    const [enabled, setEnabled] = useState(false);
    const [notification, setNotification] = useState<boolean>(true);

    const requestUserPermission =  () => {
        console.log('Requesting user permission');
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(r => setEnabled(r === PermissionsAndroid.RESULTS.GRANTED));
        messaging().getToken().then(token => {
            console.log('Token: ', token);
            //subscribe to a topic
            messaging().subscribeToTopic(token).then(() => console.log('Subscribed to topic!')).catch((error) => console.log(error));
        });
    }

    useEffect(() => {
        if(notification){
            requestUserPermission();

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

            const unsubscribe = messaging().onMessage(async (remoteMessage) => {

                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
                console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

                let notifPush = <NotificationPush title={remoteMessage?.notification?.title} body={remoteMessage?.notification?.body} />;
                return notifPush;
            });

            return unsubscribe;
        }else {
            //unsubscribe from the topic
            messaging().unsubscribeFromTopic('token').then(() => console.log('Unsubscribed from topic!'));
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

