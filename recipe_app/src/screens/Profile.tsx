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
import {auth} from "../firebase/config";

// type ProfileProps = MyStackNavigationProp<any>

const Profile : FC = () => {

    const {colors} = useTheme();
    const theme = useTheme();

    const logOut = async () => {
        try {
            await auth.signOut();
        } catch (e) {
            console.log(e);
        }
    }
    
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
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Information's personnel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <FontAwesome name={"key"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Change your password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <FontAwesome name={"heart"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Favorite's recipes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <Feather name={"trash-2"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Delete account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                    onPress={() => logOut()}
                    >
                        <Feather name={"log-out"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default Profile;