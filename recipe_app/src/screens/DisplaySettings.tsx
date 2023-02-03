import {View, Text, Switch} from "react-native";
import styles from "../stylesheets/DS_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {useState} from "react";

const DisplaySettings = () => {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitchDarkMode = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <View style={[styles.pusherContainer, general.shadow]}>
                    <Text style={styles.textTitle}>Switch to Dark Mode</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#b1dad6'}}
                        thumbColor={isEnabled ? '#008375' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchDarkMode}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
    );
};
export default DisplaySettings;