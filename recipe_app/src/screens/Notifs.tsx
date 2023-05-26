import React, {useContext, useEffect, useRef, useState} from "react";
import {FlatList, ScrollView, Text, TouchableOpacity, View, Image} from "react-native";
import {FC} from "react";
import styles from "../stylesheets/Notifications_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import {useNavigation, useTheme} from "@react-navigation/native";
import {auth} from "../firebase/config";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {NotificationsStackList} from "../types/types";
import NotificationPush from "../components/NotificationPush";
import {IncomingNotificationsContext, NotifsParamsContext} from "../../App";
import Swipeable from 'react-native-gesture-handler/Swipeable';

// @ts-ignore
// type NotificationsProps = MyStackNavigationProp<NotificationsStackList, 'Notifs'>;





const Notifs = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const paramsNotifs = useContext(NotifsParamsContext);
    // const navigation = useNavigation<NotificationsProps>();
    const [notifications, setNotifications] = useState<any>([]);
    const incomingNotifs = useContext(IncomingNotificationsContext);

    useEffect(() => {
        if(paramsNotifs?.title && paramsNotifs?.body) {
            setNotifications([...notifications, {id: notifications.length + 1, title: paramsNotifs?.title, body: paramsNotifs?.body}]);
        }
    }, [paramsNotifs?.title, paramsNotifs?.body]);

    const rightSwipeActions = (itemId :any) => {
        const deleteNotification = () => {
            setNotifications(notifications.filter((notification: { id: React.Key | null | undefined; }) => notification.id !== itemId));
        }
        return (
            <TouchableOpacity style={styles.deleteButton} onPress={deleteNotification} activeOpacity={0.5}>
                <Image source={require('../../assets/trash.gif')} style={styles.deleteImage} />
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        );
    };



    const ListNotifications = ({item, index, deleteItem} : any) => {

        return(
            <Swipeable
                overshootRight={false}
                renderRightActions={() => rightSwipeActions(item.id)}
                useNativeAnimations={true}
            >
                <NotificationPush title={item.title} body={item.body} />
            </Swipeable>
        );
    }


    const deleteItem = (id : any) => {
        setNotifications(notifications.filter((notification: { id: React.Key | null | undefined; }) => notification.id !== id));
    }

    useEffect(() => {
        incomingNotifs.setIncomingNotifs(false);
    }, []);


    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={styles.notificationContainer}>
                <FlatList
                    data={notifications}
                    ListEmptyComponent={() => <View style={styles.nonotif}><Text style={{color: colors.text, fontStyle:"italic"}}>No notifications</Text></View>}
                    renderItem={({item}) => <ListNotifications item={item} index={item.id} deleteItem={deleteItem} />}
                    keyExtractor={item => item.id.toString()}

                />
            </View>
        </View>
    );
};


export default Notifs;