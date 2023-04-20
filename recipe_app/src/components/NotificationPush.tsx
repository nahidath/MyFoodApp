// import * as Device from 'expo-device';
// import * as Notifs from 'expo-notifications';
// import {FC, useEffect, useRef, useState} from "react";
// import {Button, Platform, View, Text} from "react-native";
//
// interface NotificationPushProps {
//     enabled: boolean;
// }
//
// const NotificationPush : FC<NotificationPushProps> = ({enabled}) => {
//
//     const [expoPushToken, setExpoPushToken] = useState<string|undefined>('');
//     const [notification, setNotification] = useState<boolean>(false);
//     const notificationListener = useRef<any>();
//     const responseListener = useRef<any>();
//
//     Notifs.setNotificationHandler({
//         handleNotification: async () => ({
//             shouldShowAlert: true,
//             shouldPlaySound: false,
//             shouldSetBadge: false,
//         }),
//     });
//
//     const sendPushNotification = async (expoPushToken: string | undefined) => {
//         const message = {
//             to: expoPushToken,
//             sound: 'default',
//             title: 'Original Title',
//             body: 'And here is the body!',
//             data: {data: 'goes here'},
//             _displayInForeground: true,
//         };
//
//         const response = await fetch('https://exp.host/--/api/v2/push/send', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Accept-encoding': 'gzip, deflate',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(message),
//         });
//         const data = await response.json();
//         console.log(data);
//     }
//
//     const registerForPushNotificationsAsync = async () => {
//         let token;
//         if (Device.isDevice) {
//             const {status: existingStatus} = await Notifs.getPermissionsAsync();
//             let finalStatus = existingStatus;
//             if (existingStatus !== 'granted') {
//                 const {status} = await Notifs.requestPermissionsAsync();
//                 finalStatus = status;
//             }
//             if (finalStatus !== 'granted') {
//                 alert('Failed to get push token for push notification!');
//                 return;
//             }
//             token = (await Notifs.getExpoPushTokenAsync()).data;
//             console.log(token);
//         } else {
//             alert('Must use physical device for Push Notifs');
//         }
//
//         if (Platform.OS === 'android') {
//             Notifs.setNotificationChannelAsync('default', {
//                 name: 'default',
//                 importance: Notifs.AndroidImportance.MAX,
//                 vibrationPattern: [0, 250, 250, 250],
//                 lightColor: '#FF231F7C',
//             });
//         }
//
//         return token;
//     }
//
//
//     useEffect(() => {
//         if (enabled) {
//             registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
//
//             notificationListener.current = Notifs.addNotificationReceivedListener(notification => {
//                 // @ts-ignore
//                 setNotification(notification);
//             });
//
//             responseListener.current = Notifs.addNotificationResponseReceivedListener(response => {
//                 // @ts-ignore
//                 setNotification(response.notification);
//             });
//
//             return () => {
//                 Notifs.removeNotificationSubscription(notificationListener.current);
//                 Notifs.removeNotificationSubscription(responseListener.current);
//             };
//         }
//     }, [enabled]);
//
//
//     // return {expoPushToken, sendPushNotification}
//
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
//             <Text>Your expo push token: {expoPushToken}</Text>
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Title: {notification && notification.request.content.title} </Text>
//                 <Text>Body: {notification && notification.request.content.body}</Text>
//                 <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//             </View>
//             <Button
//                 title="Press to Send Notification"
//                 onPress={async () => {
//                     await sendPushNotification(expoPushToken);
//                 }}
//             />
//         </View>
//     );
// }
//
// export default NotificationPush;