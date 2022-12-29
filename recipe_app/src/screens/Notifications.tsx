import {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";


const Notifications = () => {
    // const [notifications, setNotifications] = useState<Notification[]>([]);
    //
    // useEffect(() => {
    //     const unsubscribe = NotificationsService.subscribe((notifications) => {
    //     setNotifications(notifications);
    //     });
    //
    //     return () => unsubscribe();
    // }, []);

    return (
        <View style={styles.container}>
        <Text>Notifications</Text>
        {/*{notifications.map((notification) => (*/}
        {/*    <Text key={notification.id}>{notification.message}</Text>*/}
        {/*))}*/}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c7b922',
        flexDirection: 'column',
    },
});

export default Notifications;