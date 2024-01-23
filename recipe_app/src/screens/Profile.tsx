import React, {FC, useEffect, useState} from "react";
import {
    View,
    Text,
    Pressable,
    TouchableOpacity,
    ScrollView,
    Alert,
    ImageBackground,
    Image,
    Modal,
    StyleSheet
} from "react-native";
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
import notifstyles from "../stylesheets/Notifications_stylesheet";
// @ts-ignore
import * as ImagePicker from 'expo-image-picker';
import profile from "../stylesheets/Profile_stylesheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";


// @ts-ignore
type ProfileProps = MyStackNavigationProp<ProfileStackList, 'ProfilePage'>;

const Profile : FC = () => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();

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
    const [translation1, setTranslation1] = useState<string>("Delete account");
    const [translation2, setTranslation2] = useState<string>("Are you sure you want to delete your account ?");
    const [translation3, setTranslation3] = useState<string>("Cancel");
    const [translation4, setTranslation4] = useState<string>("Yes");
    const [translation5, setTranslation5] = useState<string>("Account deleted");
    const [translation6, setTranslation6] = useState<string>("Your account has been deleted successfully.");
    const [translation7, setTranslation7] = useState<string>("Go back to login");
    const [translation8, setTranslation8] = useState<string>("Error");
    const [translation9, setTranslation9] = useState<string>("Your account could not be deleted. Please try again later or contact the support.");
    const [translation10, setTranslation10] = useState<string>("Edit profile");
    const [translation11, setTranslation11] = useState<string>("DELETE ACCOUNT");
    const [translation12, setTranslation12] = useState<string>("LOG OUT");

    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6, translation7, translation8, translation9, translation10, translation11, translation12]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                    setTranslation6(elementsTranslated[5]);
                    setTranslation7(elementsTranslated[6]);
                    setTranslation8(elementsTranslated[7]);
                    setTranslation9(elementsTranslated[8]);
                    setTranslation10(elementsTranslated[9]);
                    setTranslation11(elementsTranslated[10]);
                    setTranslation12(elementsTranslated[11]);
                } catch (error) {
                    console.log('Erreur de traduction Profile:', error);
                }
            } else {
                setTranslation1("Delete account");
                setTranslation2("Are you sure you want to delete your account ?");
                setTranslation3("Cancel");
                setTranslation4("Yes");
                setTranslation5("Account deleted");
                setTranslation6("Your account has been deleted successfully.");
                setTranslation7("Go back to login");
                setTranslation8("Error");
                setTranslation9("Your account could not be deleted. Please try again later or contact the support.");
                setTranslation10("Edit profile");
                setTranslation11("DELETE ACCOUNT");
                setTranslation12("LOG OUT");
            }
        }
        fetchTranslation();
    }, [language]);

    // const route = useNavigationState(state => state.routes[state.index]);
    // console.log(route.name);

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             setLoggedIn(true);
    //         } else {
    //             setLoggedIn(false);
    //         }
    //     });
    //
    //     return unsubscribe;
    // }, [auth]);
    //
    // useFocusEffect(
    //     React.useCallback(() => {
    //         if(loggedIn){
    //             navigation.navigate('Account', {screen: 'ProfileStackScreen/ProfilePage'});
    //         }
    //         // else {
    //         //     navigation.navigate('Account', {screen: 'ProfileStackScreen/ProfilePage'});
    //         // }
    //     }, [loggedIn]));

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
            AsyncStorage.removeItem('userToken');
            AsyncStorage.removeItem('idToken');
            AsyncStorage.removeItem('refreshToken');
            console.log('User signed out!');
            navigation.navigate('Home', {screen: 'HomeStackScreen/HomePage'});
            // navigation.push('HomeStackScreen');
        }).catch((e) => {
            console.log(e);
        });
    }

    const confirmation = () => {
        Alert.alert(
            translation1,
            translation2,
            [
                {
                    text: translation3,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: translation4, onPress: () => deleteAcc() }
            ]
        );
    }

    const deleteAcc = async () => {
        if (user) {
            deleteUser(user).then(() => {
                AsyncStorage.removeItem('userToken');
                AsyncStorage.removeItem('idToken');
                AsyncStorage.removeItem('refreshToken');
                Alert.alert(
                    translation5,
                    translation6,
                    [
                        {
                            text: translation7,
                            onPress: () => navigation.navigate('Home', {screen: 'HomeStackScreen/HomePage'})
                        }
                    ]
                );
            }).catch((e) => {
                console.log(e);
                Alert.alert(
                    translation8,
                    translation9,
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
                    {image ? <Image source={{uri: image}} style={styles.profilePic} /> : <Feather name={"user"} size={100} color={"#041721"} style={{borderColor:colors.text, borderRadius: 60, borderWidth: StyleSheet.hairlineWidth, padding:10}} />}
                    <Text style={[styles.profileName, {color: colors.text}]}>{newName}</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colorSpec, width: 130, height: 45}]} onPress={() => navigation.push('EditProfile')}>
                        <Feather name={"edit-3"} size={24} color={'#f2f2f2'} />
                        <Text style={[styles.btnStyleText, {color:'#f2f2f2', fontWeight:'bold'}]}>{translation10}</Text>
                    </TouchableOpacity>
                </View>
                <Separator />
                <ScrollView>
                    <View style={styles.profileInfoContainer}>

                        {/*<TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>*/}
                        {/*    <FontAwesome name={"key"} size={24} color={colors.text} />*/}
                        {/*    <Text style={[styles.btnStyleText, {color:colors.text}]}>Change your password</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.navigate('Favorites', {screen : 'FavoriteStackScreen/Favs'})}>*/}
                        {/*    <FontAwesome name={"heart"} size={24} color={colors.text} />*/}
                        {/*    <Text style={[styles.btnStyleText, {color:colors.text}]}>Favorite recipes</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={confirmation}>
                            <Feather name={"trash-2"} size={24} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color:colors.text}]}>{translation11}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, styles.logoutBtn, {backgroundColor: colors.notification}]}
                        onPress={logOut}
                        >
                            <Feather name={"log-out"} size={24} color={'#fe2f3f'} />
                            <Text style={[styles.btnStyleText,styles.logoutTxt]}>{translation12}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </View>
    );
}
export default Profile;