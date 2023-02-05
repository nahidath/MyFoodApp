import React, {FC} from "react";
import {View, Text} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";


const Favorites : FC = () => {
    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
            <Text>Favorites</Text>
        </View>
    );
}

export default Favorites;