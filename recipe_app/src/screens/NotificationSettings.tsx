import {View, Text, Switch} from "react-native";
import styles from "../stylesheets/NS_stylesheet";
import {useState} from "react";


const NotificationSettings = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return (
        <View style={styles.container}>
            <View style={styles.pusherContainer}>
                <Text style={styles.textTitle}>Notification Push</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.textTitle}>Notification Email</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}
export default NotificationSettings;