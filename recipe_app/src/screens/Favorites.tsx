import React, {FC} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {useNavigation, useTheme} from "@react-navigation/native";
import {auth} from "../firebase/config";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {FavoritesStackList} from "../types/types";

// @ts-ignore
type FavoriteProps = MyStackNavigationProp<FavoritesStackList, 'Favs'>;

const Favorites : FC = () => {
    const {colors} = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    // console.log(user);
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const navigation = useNavigation<FavoriteProps>();

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {user == null ? <View style={[styles.restricted, {backgroundColor: colors.background}]}>
                <Text style={[styles.restrictedText, {color: colors.text}]}>You must be logged in to view this page.</Text>
                <TouchableOpacity style={[styles.button,  {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View> : <Text>Favorites</Text> }
        </View>
    );
}

export default Favorites;