import {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";


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
        <ScrollView>
            <View style={styles.notificationContainer}>
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>Notification 1</Text>
                </View>
            </View>
        </ScrollView>
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
    notificationContainer: {
        flexDirection: 'column',
    },
    notification: {
        backgroundColor: '#fff',
        margin: 10,
    },
    notificationText: {
        fontSize: 20,
        padding: 10,

    },
});

export default Notifications;