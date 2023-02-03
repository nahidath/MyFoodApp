import {View, Text, Switch} from "react-native";
import styles from "../stylesheets/NS_stylesheet";
import {useState} from "react";
import general from "../stylesheets/General_stylesheet";

const NotificationSettings = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

    const toggleSwitchPush = () => setIsEnabled(previousState => !previousState);
    const toggleSwitchEmail = () => setIsEnabled2(previousState2 => !previousState2);


    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <View style={[styles.pusherContainer, general.shadow]}>
                    <Text style={styles.textTitle}>Notification Push</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#b1dad6'}}
                        thumbColor={isEnabled ? '#008375' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPush}
                        value={isEnabled}
                    />
                </View>
                <View style={[styles.pusherContainer, general.shadow]}>
                    <Text style={styles.textTitle}>Notification Email</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#b1dad6'}}
                        thumbColor={isEnabled ? '#008375' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchEmail}
                        value={isEnabled2}
                    />
                </View>
            </View>
        </View>
    )
}
export default NotificationSettings;