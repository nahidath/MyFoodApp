import {View, Text, Switch} from "react-native";
import styles from "../stylesheets/DS_stylesheet";
import general from "../stylesheets/General_stylesheet";
import React, {useEffect, useState} from "react";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import {ThemeContext} from "../../App";
import {useTheme} from "@react-navigation/native";


const DisplaySettings = () => {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    // @ts-ignore
    const { setTheme, theme } = React.useContext(ThemeContext);

    const toggleSwitchDarkMode = () => {
        setIsEnabled(previousState => !previousState);
        setTheme(theme === 'Light' ? 'Dark' : 'Light');
    };

    const {colors} = useTheme();
    const theme2 = useTheme();

    return (
        <View style={[styles.container, general.container, {backgroundColor:colors.background}] }>
            {theme2.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={styles.switchContainer}>
                <View style={[styles.pusherContainer, general.shadow, {backgroundColor: colors.notification}]}>
                    <Text style={[styles.textTitle, {color: colors.text}]}>Switch to Dark Mode</Text>
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