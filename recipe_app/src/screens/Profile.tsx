import React, {FC, useState} from "react";
import {View, Text, Pressable, TouchableOpacity, ScrollView, Alert, ImageBackground, Image} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import styles from "../stylesheets/Profile_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {useNavigation, useTheme} from "@react-navigation/native";
import {auth} from "../firebase/config";
import {LoginStackList, ProfileStackList} from "../types/types";
import {deleteUser, signOut} from "firebase/auth";
// @ts-ignore
import * as ImagePicker from 'expo-image-picker';
import profile from "../stylesheets/Profile_stylesheet";
import AntDesign from "react-native-vector-icons/AntDesign";


// @ts-ignore
type ProfileProps = MyStackNavigationProp<ProfileStackList, 'Profile'>;

const Profile : FC = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    // console.log(user);
    // @ts-ignore
    const name = user == null ? "" : user.displayName;
    const navigation = useNavigation<ProfileProps>();
    const userPic = user == null ? "" : user.photoURL;


    const logOut = () => {

        signOut(auth).then(() => {
            console.log('User signed out!');
            navigation.navigate('Login', {screen: 'Login'});
        }).catch((e) => {
            console.log(e);
        });
    }

    const confirmation = () => {
        Alert.alert(
            "Delete account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => deleteAcc() }
            ]
        );
    }

    const deleteAcc = async () => {
        if (user) {
            deleteUser(user).then(() => {
                Alert.alert(
                    "Account deleted",
                    "Your account has been deleted successfully.",
                    [
                        {
                            text: "Go back to login",
                            onPress: () => navigation.navigate('Login', {screen: 'Login'})
                        }
                    ]
                );
            }).catch((e) => {
                console.log(e);
                Alert.alert(
                    "Error",
                    "Your account could not be deleted. Please try again later or contact the support.",
                    [
                        {
                            text: "Ok",
                            onPress: () => console.log("Ok pressed")
                        }
                    ]
                );
            });

        }
    }
    
    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={styles.profilePicContainer}>
                {/*<View style={styles.profileView}>*/}
                {/*    {userPic ? <ImageBackground source={{uri: userPic}} style={profile.profilePic} resizeMode="contain" /> : <AntDesign name={"user"} size={100} color={"#041721"}  />}*/}
                {/*</View>*/}
                {userPic ? <Image source={{uri: userPic}} style={styles.profilePic} /> : <AntDesign name={"user"} size={100} color={"#041721"}  />}
                {/*<Pressable style={styles.editProfilePic}>*/}
                {/*    <Feather name={"camera"} size={24} color={"#ffffff"} />*/}
                {/*</Pressable>*/}
                <Text style={[styles.profileName, {color: colors.text}]}>{name}</Text>
            </View>
            <Separator />
            <ScrollView>
                <View style={styles.profileInfoContainer}>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.navigate('EditProfile')}>
                        <Feather name={"edit-3"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Edit your profile</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>*/}
                    {/*    <FontAwesome name={"key"} size={24} color={colors.text} />*/}
                    {/*    <Text style={[styles.btnStyleText, {color:colors.text}]}>Change your password</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                        <FontAwesome name={"heart"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Favorite recipes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={confirmation}>
                        <Feather name={"trash-2"} size={24} color={colors.text} />
                        <Text style={[styles.btnStyleText, {color:colors.text}]}>Delete account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                    onPress={logOut}
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