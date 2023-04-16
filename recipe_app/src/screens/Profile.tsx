import React, {FC, useEffect, useState} from "react";
import {View, Text, Pressable, TouchableOpacity, ScrollView, Alert, ImageBackground, Image, Modal} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import styles from "../stylesheets/Profile_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {useFocusEffect, useNavigation, useNavigationState, useTheme} from "@react-navigation/native";
import {auth} from "../firebase/config";
import {LoginStackList, ProfileStackList} from "../types/types";
import {deleteUser, signOut} from "firebase/auth";
import stylesMore from "../stylesheets/More_stylesheet";
// @ts-ignore
import * as ImagePicker from 'expo-image-picker';
import profile from "../stylesheets/Profile_stylesheet";
import AntDesign from "react-native-vector-icons/AntDesign";


// @ts-ignore
type ProfileProps = MyStackNavigationProp<ProfileStackList, 'ProfilePage'>;

const Profile : FC = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    // console.log(user);
    // @ts-ignore
    const name = user == null ? "" : user.displayName;
    const navigation = useNavigation<ProfileProps>();
    const userPic = user == null ? "" : user.photoURL;
    const [image, setImage] = useState<string | null>(null);
    const [newName, setNewName] = useState<string | null>(null);
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const [loggedIn, setLoggedIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // const route = useNavigationState(state => state.routes[state.index]);
    // console.log(route.name);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

        return unsubscribe;
    }, [auth]);

    useFocusEffect(
        React.useCallback(() => {
        if(loggedIn){
            navigation.navigate('Profile', {screen: 'ProfileStackScreen/ProfilePage'});
        }
        // else {
        //     navigation.navigate('Profile', {screen: 'ProfileStackScreen/ProfilePage'});
        // }
    }, [loggedIn]));

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const getNewInfos = async () => {
                try{
                    // @ts-ignore
                    const userPP = user?.photoURL;
                    const nameUser= user?.displayName;
                    if (isActive) {
                        // @ts-ignore
                        setImage(userPP);
                        // @ts-ignore
                        setNewName(nameUser);
                    }
                }catch (e) {
                    console.log(e);
                }

            };
            getNewInfos();
            return () => {
                isActive = false;
            };
        },[user, userPic, name])
    );

    const logOut = () => {

        signOut(auth).then(() => {
            console.log('User signed out!');
            navigation.navigate('Home', {screen: 'HomeStackScreen/HomePage'});
            // navigation.push('HomeStackScreen');
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
                            onPress: () => navigation.push('LoginStackScreen')
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
            <ScrollView>
                <View style={{margin:10}}>
                    <TouchableOpacity style={[styles.profileBtn, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('EditProfile')}>
                        {user != null ? <Image source={{uri: user.photoURL?.replace(/\r?\n|\r/g, '')}} style={styles.pp}/> : <Feather name={"user"} size={24} color={colors.text} />}
                        <Text style={[styles.profileBtnText, {color: colors.text}]}>{newName}</Text>
                        <TouchableOpacity style={styles.arrowGo} onPress={() => navigation.push('EditProfile')} activeOpacity={0.5}>
                        <Feather name={"arrow-right"} size={24} color={colors.text} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <Text style={[stylesMore.textTitle, {color: colors.text}]}>Settings</Text>
                    <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('NotificationSettings')}>
                        <Feather name={"bell"} size={22} color={colors.text} />
                        {/*<Text style={[styles.btnStyleText, {fontFamily: 'Poppins'}]}>Notifications</Text>*/}
                        <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('DisplaySettings')}>
                        <Feather name={"monitor"} size={22} color={colors.text} />
                        <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Display Settings</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={stylesMore.centeredView}>
                            <View style={[stylesMore.modalView, general.shadow, {backgroundColor: colors.notification} ]}>
                                <Text style={[stylesMore.modalText, {color: colors.text}]}>Choose your language</Text>
                                <Separator />
                                <TouchableOpacity style={stylesMore.languageBtn}>
                                    <Text style={[stylesMore.languageBtnText, {color: colors.text}]}>English</Text>
                                </TouchableOpacity>
                                <Separator />
                                <TouchableOpacity style={stylesMore.languageBtn}>
                                    <Text style={[stylesMore.languageBtnText, {color: colors.text}]}>French</Text>
                                </TouchableOpacity>

                                {/*<TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => setModalVisible(!modalVisible)}>*/}
                                {/*    <Feather name={"x"} size={22} color={"#666666"} />*/}
                                {/*    <Text style={styles.btnStyleText}>Close</Text>*/}
                                {/*</TouchableOpacity>*/}
                                {/*<Pressable*/}
                                {/*    style={[styles.button, styles.buttonClose]}*/}
                                {/*    onPress={() => setModalVisible(!modalVisible)}>*/}
                                {/*    <Text style={styles.textStyle}>Hide Modal</Text>*/}
                                {/*</Pressable>*/}
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => setModalVisible(true)}>
                        <Feather name={"globe"} size={22} color={colors.text} />
                        <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Languages</Text>
                    </TouchableOpacity>

                    <View >
                        <Text style={[stylesMore.textTitle, {color: colors.text}]}>Help</Text>
                        <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('Faq')}>
                            <Feather name={"help-circle"} size={22} color={colors.text} />
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>FAQ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('Contact')}>
                            <Feather name={"mail"} size={22} color={colors.text} />
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Contact</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[stylesMore.textTitle, {color: colors.text}]}>Loving MyRecipeApp ?</Text>
                        <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} >
                            <FontAwesome name={"star"} size={22} color={colors.text} />
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Rate us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                            <FontAwesome name={"share"} size={22} color={colors.text} />
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Share the application</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[stylesMore.textTitle, {color:colors.text}]}>About</Text>
                        <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('PrivacyPolicy')}>
                            <Feather name={"shield"} size={22} color={colors.text} />
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('TermsOfUse')}>
                            <FontAwesome name={"file"} size={22} color={colors.text} />
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Terms of use</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/*{!loggedIn ? <View style={[notifstyles.restricted, {backgroundColor: colors.background}]}>*/}
            {/*        <Text style={[notifstyles.restrictedText, {color: colors.text}]}>You must be logged in to view this page.</Text>*/}
            {/*        <TouchableOpacity style={[notifstyles.button,  {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() => navigation.navigate('LoginStackScreen')}>*/}
            {/*            <Text style={notifstyles.buttonText}>Login</Text>*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View> :*/}
            {/*    <>*/}
            {/*    <View style={styles.profilePicContainer}>*/}
            {/*        {image ? <Image source={{uri: image}} style={styles.profilePic} /> : <AntDesign name={"user"} size={100} color={"#041721"}  />}*/}
            {/*        <Text style={[styles.profileName, {color: colors.text}]}>{newName}</Text>*/}
            {/*    </View>*/}
            {/*    <Separator />*/}
            {/*    <ScrollView>*/}
            {/*        <View style={styles.profileInfoContainer}>*/}
            {/*            <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('EditProfile')}>*/}
            {/*                <Feather name={"edit-3"} size={24} color={colors.text} />*/}
            {/*                <Text style={[styles.btnStyleText, {color:colors.text}]}>Edit your profile</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            /!*<TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>*!/*/}
            {/*            /!*    <FontAwesome name={"key"} size={24} color={colors.text} />*!/*/}
            {/*            /!*    <Text style={[styles.btnStyleText, {color:colors.text}]}>Change your password</Text>*!/*/}
            {/*            /!*</TouchableOpacity>*!/*/}
            {/*            <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.navigate('Favorites', {screen : 'FavoriteStackScreen/Favs'})}>*/}
            {/*                <FontAwesome name={"heart"} size={24} color={colors.text} />*/}
            {/*                <Text style={[styles.btnStyleText, {color:colors.text}]}>Favorite recipes</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={confirmation}>*/}
            {/*                <Feather name={"trash-2"} size={24} color={colors.text} />*/}
            {/*                <Text style={[styles.btnStyleText, {color:colors.text}]}>Delete account</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}*/}
            {/*            onPress={logOut}*/}
            {/*            >*/}
            {/*                <Feather name={"log-out"} size={24} color={colors.text} />*/}
            {/*                <Text style={[styles.btnStyleText, {color:colors.text}]}>Log Out</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*        </View>*/}
            {/*    </ScrollView>*/}
            {/*    </>*/}
            {/*}*/}
        </View>
    );
}
export default Profile;