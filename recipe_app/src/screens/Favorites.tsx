import React, {FC} from "react";
import {View, Text} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";


const Favorites : FC = () => {
    return (
        <View>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#064851" />
            <Text>Favorites</Text>
        </View>
    );
}

export default Favorites;