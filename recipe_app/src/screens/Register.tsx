import React, {useEffect, useState} from "react";
import {colors} from "react-native-elements";
import {Link, useNavigation, useTheme} from "@react-navigation/native";
import {TextInput, TouchableOpacity, View, Text, ScrollView, Modal, TouchableHighlight, TouchableWithoutFeedback} from "react-native";
import styles from "../stylesheets/Login_stylesheet";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, database} from "../firebase/config";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {LoginStackList} from "../types/types";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import {updateProfile} from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";
import Tooltip from "../components/Tooltip";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TermsOfUseModal from "../components/TermsOfUseModal";
import PrivacyPolicy from "./PrivacyPolicy";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {child, ref, set} from "firebase/database";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";

export const EmailNotificationAgreed = React.createContext(false);


// @ts-ignore
type RegisterProps = MyStackNavigationProp<LoginStackList, 'Register'>

const Register = () => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();

    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const navigation = useNavigation<RegisterProps>();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [error, setError] = useState<any>('');
    const [errorPwd, setErrorPwd] = useState<string>('');
    const [errorCPwd, setErrorCPwd] = useState<string>('');
    const [isVisible, setIsVisible] = useState<any>({
        password: true,
        confPassword: true
    });
    const [agree1, setAgree1] = useState<boolean>(false);
    const [agree2, setAgree2] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalVisible2, setModalVisible2] = useState<boolean>(false);
    const NOTIF_EMAIL_SWITCH_KEY = 'notifEmailSwitch';
    const [notifEmailSwitch, setNotifEmailSwitch] = useState<boolean>(false);
    const [translation1, setTranslation1] = useState<string>("Passwords do not match");
    const [translation2, setTranslation2] = useState<string>("Failed to create an account");
    const [translation3, setTranslation3] = useState<string>("Password must contain at least 8 characters, 1 uppercase letter and 1 number");
    const [translation4, setTranslation4] = useState<string>("I agree to the ");
    const [translation5, setTranslation5] = useState<string>("Terms & Conditions, Cookie Policy");
    const [translation6, setTranslation6] = useState<string>(", and");
    const [translation7, setTranslation7] = useState<string>("Privacy Policy");
    const [translation8, setTranslation8] = useState<string>("I agree to receive marketing communications and the latest information from the app by email.\n" + "You can unsubscribe at any time.");
    const [translation9, setTranslation9] = useState<string>("Register");
    const [translation10, setTranslation10] = useState<string>("Create your account");
    const [translation11, setTranslation11] = useState<string>("Username");
    const [translation12, setTranslation12] = useState<string>("Email");
    const [translation13, setTranslation13] = useState<string>("Password");
    const [translation14, setTranslation14] = useState<string>("Confirm Your Password");
    const [translation15, setTranslation15] = useState<string>("Register");
    const [translation16, setTranslation16] = useState<string>("Already have an account ?");
    const [translation17, setTranslation17] = useState<string>("Login");

    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6, translation7, translation8, translation9, translation10, translation11, translation12, translation13, translation14, translation15, translation16, translation17]);
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
                    setTranslation13(elementsTranslated[12]);
                    setTranslation14(elementsTranslated[13]);
                    setTranslation15(elementsTranslated[14]);
                    setTranslation16(elementsTranslated[15]);
                    setTranslation17(elementsTranslated[16]);
                } catch (error) {
                    console.error('Erreur de traduction Register:', error);
                }
            } else {
                setTranslation1("Passwords do not match");
                setTranslation2("Failed to create an account");
                setTranslation3("Password must contain at least 8 characters, 1 uppercase letter and 1 number");
                setTranslation4("I agree to the ");
                setTranslation5("Terms & Conditions, Cookie Policy");
                setTranslation6(", and");
                setTranslation7("Privacy Policy");
                setTranslation8("I agree to receive marketing communications and the latest information from the app by email.\n" + "You can unsubscribe at any time.");
                setTranslation9("Register");
                setTranslation10("Create your account");
                setTranslation11("Username");
                setTranslation12("Email");
                setTranslation13("Password");
                setTranslation14("Confirm Your Password");
                setTranslation15("Register");
                setTranslation16("Already have an account ?");
                setTranslation17("Login");
            }
        }
        fetchTranslation();
    } , [language]);




    // useEffect(() => {
    //     async function getNotifEmailSwitch() {
    //         const notifEmailSwitch = await AsyncStorage.getItem(NOTIF_EMAIL_SWITCH_KEY);
    //         if (notifEmailSwitch) {
    //             setNotifEmailSwitch(notifEmailSwitch === 'true');
    //         }
    //     }
    //     getNotifEmailSwitch();
    // }, []);
    //
    // useEffect(() => {
    //     async function setNotifEmailSwitch() {
    //         if(agree2) {
    //             await AsyncStorage.setItem(NOTIF_EMAIL_SWITCH_KEY, notifEmailSwitch.toString());
    //         }
    //     }
    //     setNotifEmailSwitch();
    // }, [notifEmailSwitch, agree2]);


    const handleSubmit = async () => {
        const db = ref(database);
        try {
            if(password === confPassword) {
                await createUserWithEmailAndPassword(auth, email, password);
                if (auth.currentUser) {
                    const user = auth.currentUser;
                    const idToken = await user?.getIdToken();
                    const refreshToken = await user?.getIdToken(true);
                    await AsyncStorage.setItem('idToken', idToken);
                    await AsyncStorage.setItem('refreshToken', refreshToken);
                    updateProfile(auth.currentUser, {displayName: username}).then(() => {
                        console.log('Account created');
                    }).catch((error: any) => {
                        console.log(error);
                    });
                }
                setError('');
                // navigation.push('Profile');
                navigation.navigate('HomeStackScreen');

            } else {
                setError(translation1);
            }
        } catch (err) {
            setError(translation2);
        }

        if(agree2){
            const emailEncoded = encodeURIComponent(email).replace(/\./g, '%2E');
            await AsyncStorage.setItem(NOTIF_EMAIL_SWITCH_KEY, "true");
            // console.log('notifEmailSwitch: ', notifEmailSwitch);
            set(child(db, `subscribers/${emailEncoded}`), true).then(r => {
                console.log('user subscribed');

            });
        }
    }


    const togglePassword = (inputN : any) => {
        if(inputN === 'password'){
            setIsVisible({
                password: !isVisible.password,
                confPassword: isVisible.confPassword
            });
        } else if(inputN === 'confPassword'){
            setIsVisible({
                password: isVisible.password,
                confPassword: !isVisible.confPassword
            });
        }
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        let errorPwd = "";
        if(value === ""){
            errorPwd = "";
        }else if (!passwordRegex.test(value)) {
            errorPwd = translation3;
        } else {
            errorPwd = "";
        }
        setErrorPwd(errorPwd);
    };

    const handleConfPasswordChange = (value: string) => {
        setConfPassword(value);
        let errorPwd = "";
        if(value === ""){
            errorPwd = "";
        }else if (password !== value) {
            errorPwd = translation1;
        } else {
            errorPwd = "";
        }
        setErrorCPwd(errorPwd);
    }

    useEffect(() => {
        handlePasswordChange(password);
    }, [password]);

    useEffect(() => {
        handleConfPasswordChange(confPassword);
    }, [confPassword]);

    const Box1 = () => {
        return(
            <View style={{marginLeft:15}}>
                <Text style={styles.textChkBox}>
                    {translation4} <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                        <Text style={styles.link2}>{translation5}</Text>
                    </TouchableWithoutFeedback>
                    <Text style={styles.textChkBox}>{translation6} </Text>
                    <TouchableWithoutFeedback onPress={() => setModalVisible2(true)}>
                        <Text style={styles.link2}>{translation7}</Text>
                    </TouchableWithoutFeedback>
                </Text>
            </View>
        )
    }

    const box2 : any = translation8;


    return (

        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#9fc131" />
            <KeyboardAwareScrollView>
                <View style={[styles.header, {marginTop: 60}]}>
                    {/*<Text style={styles.title}>{translation9}</Text>*/}
                    <Text style={[styles.subtitle, {paddingLeft: 0, paddingTop:0}]}>{translation10}</Text>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form2}>
                    <View style={styles.inputZone}>
                        <Feather name={'smile'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={translation11}
                            placeholderTextColor={"#f2f2f2"}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputZone}>
                        <Feather name={'mail'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={translation12}
                            placeholderTextColor={'#f2f2f2'}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize={'none'}
                        />
                    </View>

                    <View style={styles.inputZone}>
                        <Feather name={'lock'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={translation13}
                            placeholderTextColor={"#f2f2f2"}
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={isVisible.password}
                        />
                        {/*<View style={styles.tooltip}>*/}
                        {/*    <Tooltip content={"Password must be at least 8 characters long, 1 uppercase letter and 1 number"} >*/}
                        {/*        <Feather name={'info'} size={20} color={"#f2f2f2"}  />*/}
                        {/*    </Tooltip>*/}
                        {/*</View>*/}
                        {isVisible.password ? <Feather name={'eye-off'} size={20} color={"#f2f2f2"} style={styles.showButton} onPress={() => togglePassword('password')} /> : <Feather name={'eye'} size={20} color={"#f2f2f2"} style={styles.showButton} onPress={() => togglePassword('password')}/>}
                    </View>
                    {errorPwd && <Text style={styles.errorPwd}>{errorPwd}</Text>}
                    <View style={styles.inputZone}>
                        <Feather name={'lock'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={translation14}
                            placeholderTextColor={"#f2f2f2"}
                            value={confPassword}
                            onChangeText={handleConfPasswordChange}
                            secureTextEntry={isVisible.confPassword}
                        />
                        {isVisible.confPassword ? <Feather name={'eye-off'} size={20} color={"#f2f2f2"} style={styles.showButton} onPress={() => togglePassword('confPassword')} /> : <Feather name={'eye'} size={20} color={"#f2f2f2"} style={styles.showButton} onPress={() => togglePassword('confPassword')}/>}
                    </View>
                    {errorCPwd && <Text style={styles.errorPwd}>{errorCPwd}</Text>}

                    <View style={styles.agreeZone}>
                        <BouncyCheckbox
                            size={20}
                            fillColor="#9fc131"
                            unfillColor="#9fc131"
                            style={{ marginVertical: 10, marginHorizontal: 10 }}
                            // text="I agree to the Terms and Conditions, Privacy Policy and Cookie Policy."
                            textComponent=<Box1/>
                            iconStyle={{ borderColor: "#9fc131" }}
                            innerIconStyle={{ borderColor: "#f2f2f2" }}
                            textStyle={{ fontFamily: "JosefinSans-Regular", color: "#f2f2f2", fontSize: 13, textDecorationLine: "none" }}
                            onPress={(isChecked: boolean) => {setAgree1(isChecked)}}
                        />
                        <BouncyCheckbox
                            size={20}
                            fillColor="#9fc131"
                            unfillColor="#9fc131"
                            style={{ marginVertical: 10,  paddingHorizontal: 10, paddingRight: 20, }}
                            text={box2}
                            iconStyle={{ borderColor: "#9fc131" }}
                            innerIconStyle={{ borderColor: "#f2f2f2" }}
                            textStyle={{ fontFamily: "JosefinSans-Regular", color: "#f2f2f2", fontSize: 13, textDecorationLine: "none" }}
                            onPress={(isChecked: boolean) => {setAgree2(isChecked)}}
                        />

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <TermsOfUseModal setModalVisible={setModalVisible} modalVisible={modalVisible} isRegisterPage={true}/>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible2}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible2);
                            }}
                        >
                            <PrivacyPolicyModal setModalVisible={setModalVisible2} modalVisible={modalVisible2} isRegisterPage={true}/>
                        </Modal>
                    </View>


                    <View style={styles.inputZone}>
                        <TouchableOpacity style={styles.loginBtn} activeOpacity={0.5}
                            onPress={handleSubmit}
                            disabled={!email || !password || !confPassword || !username || !agree1}
                        >
                            <Text style={styles.btnText}>{translation15} <Feather name={'arrow-right'} size={16} color={"#9fc131"}/></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <View style={[styles.registerAsk]}>
                <Text style={styles.text}>{translation16} <Link to={{screen : 'Login'}} style={styles.registerButton}>{translation17}</Link></Text>
            </View>
        </View>

    );

}

export default Register;