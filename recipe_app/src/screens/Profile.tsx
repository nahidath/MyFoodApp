import React, {FC} from "react";
import {View, Text, Pressable, TouchableOpacity, ScrollView} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import styles from "../stylesheets/Profile_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {useTheme} from "@react-navigation/native";

// type ProfileProps = MyStackNavigationProp<any>

const Profile : FC = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    
    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={styles.profilePicContainer}>
                <View style={styles.profilePic}></View>
                <Pressable style={styles.editProfilePic}>
                    <Feather name={"camera"} size={24} color={"#ffffff"} />
                </Pressable>
                <Text style={[styles.profileName, {color: colors.text}]}>John Doe</Text>
            </View>
            <Separator />
            <ScrollView>
                <View style={styles.profileInfoContainer}>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <Feather name={"info"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Informations personnelles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <FontAwesome name={"key"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Changer de mot de passe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <FontAwesome name={"heart"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Mes recettes favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <Feather name={"trash-2"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Supprimer mon compte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <Feather name={"log-out"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default Profile;