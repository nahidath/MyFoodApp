import {View, Text, Switch, Platform, Button} from "react-native";
import styles from "../stylesheets/NS_stylesheet";
import React, {useContext, useEffect, useRef, useState} from "react";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {useTheme} from "@react-navigation/native";
import {NotificationContext} from "../../App";



const NotificationSettings = () => {
    // const [isEnabledPush, setIsEnabledPush] = useState(false);
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);

    const { setNotification,notification} = useContext(NotificationContext);

    const toggleSwitchEmail = () => setIsEnabledEmail(previousStateEmail => !previousStateEmail);
    const toggleSwitchPush = () => {
        // setIsEnabledPush(previousStatePush => !previousStatePush);
        setNotification(!notification);
    }

    //Push Notifs
    const [data, setData] = useState<any>({});
    const {colors} = useTheme();
    const theme = useTheme();




    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={{margin: 10}}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, {color: colors.text}]}>System notifications</Text>
                    <Text style={styles.subTitle}>Receive notifications about latest recipes updates.</Text>
                </View>
                <View style={styles.switchContainer}>
                    <View style={[styles.pusherContainer, general.shadow, {backgroundColor:colors.notification}]}>
                        <Text style={[styles.textTitle, {color:colors.text}]}>Notification Push</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#b1dad6'}}
                            thumbColor={notification ? '#008375' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchPush}
                            value={notification}
                        />
                    </View>
                    <View style={[styles.pusherContainer, general.shadow, {backgroundColor: colors.notification}]}>
                        <Text style={[styles.textTitle, {color: colors.text}]}>Notification Email</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#b1dad6'}}
                            thumbColor={isEnabledEmail? '#008375' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchEmail}
                            value={isEnabledEmail}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
export default NotificationSettings;