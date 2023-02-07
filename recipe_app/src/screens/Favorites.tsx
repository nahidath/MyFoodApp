import React, {FC} from "react";
import {View, Text} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {useTheme} from "@react-navigation/native";


const Favorites : FC = () => {
    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <Text>Favorites</Text>
        </View>
    );
}

export default Favorites;