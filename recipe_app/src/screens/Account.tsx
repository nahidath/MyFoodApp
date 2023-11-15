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
    StyleSheet, ActivityIndicator
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
import {LoginStackList, AccountStackList} from "../types/types";
import {deleteUser, signOut} from "firebase/auth";
import stylesMore from "../stylesheets/More_stylesheet";
// @ts-ignore
import * as ImagePicker from 'expo-image-picker';
import profile from "../stylesheets/Profile_stylesheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLanguage} from "../translation/LanguageContext";


// @ts-ignore
type AccountProps = MyStackNavigationProp<AccountStackList, 'AccountPage'>;

const Account : FC = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    // console.log(user);
    // @ts-ignore
    const name = user == null ? "" : user.displayName;
    const navigation = useNavigation<AccountProps>();
    const userPic = user == null ? "" : user.photoURL;
    const [image, setImage] = useState<string | null>(null);
    const [newName, setNewName] = useState<string | null>(null);
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const [loggedIn, setLoggedIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const {language,setLanguage, t} = useLanguage();
    const [translatedSettings, setTranslatedSettings] = useState<string >("Settings");
    const [translatedNotification, setTranslatedNotification] = useState<string>('Notifications');
    const [translatedAppearance, setTranslatedAppearance] = useState<string >('Appearance');
    const [translatedLanguages, setTranslatedLanguages] = useState<string >('Languages');
    const [translatedLoving, setTranslatedLoving] = useState<string>('Loving MyRecipeApp ?');
    const [translatedRate, setTranslatedRate] = useState<string>('Rate us');
    const [translatedShare, setTranslatedShare] = useState<string>('Share the application');
    const [translatedPrivacy, setTranslatedPrivacy] = useState<string>('Privacy Policy');
    const [translatedTerms, setTranslatedTerms] = useState<string>('Terms of use');
    const [translatedLogout, setTranslatedLogout] = useState<string>('LOG OUT');
    const [translatedChooseLanguage, setTranslatedChooseLanguage] = useState<string>('Choose your language');
    const [translatedEnglish, setTranslatedEnglish] = useState<string>('English');
    const [translatedFrench, setTranslatedFrench] = useState<string>('French');
    const [translatedAbout, setTranslatedAbout] = useState<string>('About');
    const [translated, setTranslated] = useState<boolean>(false);
    const [languageSelected, setLanguageSelected] = useState<boolean>(false);





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

    useEffect(() => {
        console.log('translated', translated);
        const fetchTranslation = async () => {
            if(translated) {
                try {
                    const translationOfSettings = await t(translatedSettings);
                    const translationOfNotification = await t(translatedNotification);
                    const translationOfAppearance = await t(translatedAppearance);
                    const translationOfLanguages = await t(translatedLanguages);
                    const translationOfLoving = await t(translatedLoving);
                    const translationOfRate = await t(translatedRate);
                    const translationOfShare = await t(translatedShare);
                    const translationOfPrivacy = await t(translatedPrivacy);
                    const translationOfTerms = await t(translatedTerms);
                    const translationOfLogout = await t(translatedLogout);
                    const translationOfChooseLanguage = await t(translatedChooseLanguage);
                    const translationOfEnglish = await t(translatedEnglish);
                    const translationOfFrench = await t(translatedFrench);
                    const translationOfAbout = await t(translatedAbout);
                    setTranslatedSettings(translationOfSettings);
                    setTranslatedNotification(translationOfNotification);
                    setTranslatedAppearance(translationOfAppearance);
                    setTranslatedLanguages(translationOfLanguages);
                    setTranslatedLoving(translationOfLoving);
                    setTranslatedRate(translationOfRate);
                    setTranslatedShare(translationOfShare);
                    setTranslatedPrivacy(translationOfPrivacy);
                    setTranslatedTerms(translationOfTerms);
                    setTranslatedLogout(translationOfLogout);
                    setTranslatedChooseLanguage(translationOfChooseLanguage);
                    setTranslatedEnglish(translationOfEnglish);
                    setTranslatedFrench(translationOfFrench);
                    setTranslatedAbout(translationOfAbout);
                } catch (e) {
                    console.log('Error when translating text:', e);
                }

                setTranslated(false);
            }

        };

        fetchTranslation();

    }, [translated]);

    useFocusEffect(
        React.useCallback(() => {
        if(loggedIn){
            navigation.navigate('Account', {screen: 'ProfileStackScreen/ProfilePage'});
        }
        // else {
        //     navigation.navigate('Account', {screen: 'ProfileStackScreen/ProfilePage'});
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
                        // setLoading(false)
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
    // if (loading) {
    //     return (
    //         <View>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // }


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

    const changeLanguage = async (newLang : string) => {
        console.log('newLang', newLang);
        try {
            await AsyncStorage.setItem('lang', newLang);
            setLanguage(newLang);
            setLanguageSelected(true);
            setModalVisible(false);
            setTranslated(true);
            await t('reload');
        } catch (error) {
            console.error('Erreur de sauvegarde de la langue:', error);
        }
    }


    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525"/> :
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe"/>}
            {translated && <View style={styles.centeredView}><ActivityIndicator  size="large" color="#9fc131" /></View>}
            <ScrollView>
                <View style={{margin: 10}}>
                    <TouchableOpacity style={[styles.profileBtn, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.navigate('ProfileStackScreen')}>
                        {image ? <Image source={{uri: image}} style={styles.pp}/> :
                            <Feather name={"user"} size={24} color={colors.text} style={{borderColor: colors.text, borderRadius: 30, borderWidth: StyleSheet.hairlineWidth, padding: 5}}/>}
                        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.profileBtnText, {color: colors.text}]}>{newName}</Text>
                        <Feather name={"arrow-right"} style={styles.arrowGo} size={24} color={colors.text}/>
                    </TouchableOpacity>
                    <Separator/>
                    <Text style={[stylesMore.textTitle, {color: colors.text}]}>{translatedSettings}</Text>
                    <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                        onPress={() => navigation.push('NotificationSettings')}>
                        <Feather name={"bell"} size={22} color={colors.text}/>
                        {/*<Text style={[styles.btnStyleText, {fontFamily: 'Poppins'}]}>Notifs</Text>*/}
                        <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>{translatedNotification}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                        onPress={() => navigation.push('DisplaySettings')}>
                        <Feather name={"settings"} size={22} color={colors.text}/>
                        <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>{translatedAppearance}</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={stylesMore.centeredView}>
                            <View
                                style={[stylesMore.modalView, general.shadow, {backgroundColor: colors.notification}]}>
                                <Text style={[stylesMore.modalText, {color: colors.text}]}>{translatedChooseLanguage}</Text>
                                <Separator/>
                                <TouchableOpacity style={stylesMore.languageBtn} onPress={() => changeLanguage('EN-US')}>
                                    <Text style={[stylesMore.languageBtnText, {color: colors.text}]}>{translatedEnglish}</Text>
                                    {language == "EN-GB" && <Feather name={"check"} size={20} color={colors.text} style={{marginLeft: 10}}/>}
                                </TouchableOpacity>
                                <Separator/>
                                <TouchableOpacity style={stylesMore.languageBtn}
                                                  onPress={() => changeLanguage('FR')}>
                                    <Text style={[stylesMore.languageBtnText, {color: colors.text}]}>{translatedFrench}</Text>
                                    {language == "FR" && <Feather name={"check"} size={20} color={colors.text} style={{marginLeft: 10}}/>}

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
                    <TouchableOpacity style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                        onPress={() => setModalVisible(true)}>
                        <Feather name={"globe"} size={22} color={colors.text}/>
                        <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>{ translatedLanguages}</Text>
                    </TouchableOpacity>

                    <View>
                        <Text style={[stylesMore.textTitle, {color: colors.text}]}>Support</Text>
                        <TouchableOpacity
                            style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                            onPress={() => navigation.push('Faq')}>
                            <Feather name={"help-circle"} size={22} color={colors.text}/>
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>FAQ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                            onPress={() => navigation.push('Contact')}>
                            <Feather name={"mail"} size={22} color={colors.text}/>
                            <Text style={[stylesMore.btnStyleText, {color: colors.text}]}>Contact</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text
                            style={[stylesMore.textTitle, {color: colors.text}]}>{translatedLoving}</Text>
                        <TouchableOpacity
                            style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                            <FontAwesome name={"star"} size={22} color={colors.text}/>
                            <Text
                                style={[stylesMore.btnStyleText, {color: colors.text}]}>{translatedRate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                            <FontAwesome name={"share"} size={22} color={colors.text}/>
                            <Text
                                style={[stylesMore.btnStyleText, {color: colors.text}]}>{translatedShare}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[stylesMore.textTitle, {color: colors.text}]}>{ translatedAbout}</Text>
                        <TouchableOpacity
                            style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                            onPress={() => navigation.push('PrivacyPolicy')}>
                            <Feather name={"shield"} size={22} color={colors.text}/>
                            <Text
                                style={[stylesMore.btnStyleText, {color: colors.text}]}>{translatedPrivacy}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[stylesMore.btnStyle, general.shadow, {backgroundColor: colors.notification}]}
                            onPress={() => navigation.push('TermsOfUse')}>
                            <FontAwesome name={"file"} size={22} color={colors.text}/>
                            <Text
                                style={[stylesMore.btnStyleText, {color: colors.text}]}>{translatedTerms}</Text>
                        </TouchableOpacity>
                    </View>
                    <Separator/>
                    <View>
                        <TouchableOpacity
                            style={[stylesMore.btnStyle, general.shadow, stylesMore.logoutBtn, {backgroundColor: colors.notification}]}
                            onPress={() => logOut()}>
                            <Feather name={"log-out"} size={24} color={'#fe2f3f'}/>
                            <Text
                                style={[stylesMore.btnStyleText, stylesMore.logoutTxt]}>{ translatedLogout}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 15}}>
                        <Text style={{color: 'grey', fontSize: 15, fontStyle: 'italic'}}>Version 1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

export default Account;