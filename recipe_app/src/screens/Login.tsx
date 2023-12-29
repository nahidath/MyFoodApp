import React, {useEffect, useState} from "react";
import {
    Link,
    NavigationContainer, useFocusEffect,
    useNavigation,
    useNavigationState,
    useRoute,
    useTheme
} from "@react-navigation/native";
import {
    ActivityIndicator,
    Alert, Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Login_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {auth} from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import Account from "./Account";
import Register from "./Register";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {LoginStackList, ProfileStackList} from "../types/types";
import Separator from "../components/Separator";
import Feather from "react-native-vector-icons/Feather";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";

// @ts-ignore
type LoginProps = MyStackNavigationProp<LoginStackList, 'Login'>;
// type Props = NativeStackScreenProps<ProfileStackList, 'LoginStackScreen'>;



//Reset Password function



//Login function and principal screen
export default function Login () {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigation = useNavigation<LoginProps>();
    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sent, setSent] = useState(false);
    const [translation1, setTranslation1] = useState<string>('Please enter your email and password');
    const [translation2, setTranslation2] = useState<string>('Your email or password was incorrect');
    const [translation3, setTranslation3] = useState<string>('Email sent');
    const [translation4, setTranslation4] = useState<string>('Please check your email to reset your password');
    const [translation5, setTranslation5] = useState<string>('There was a problem with your request. Please try again later');
    const [translation6, setTranslation6] = useState<string>('Let\'s sign you in.');
    const [translation7, setTranslation7] = useState<string>('Welcome back !');
    const [translation8, setTranslation8] = useState<string>('Forgot password ?');
    const [translation9, setTranslation9] = useState<string>('Log in');
    const [translation10, setTranslation10] = useState<string>('Or');
    const [translation11, setTranslation11] = useState<string>('Don\'t have an account ?');
    const [translation12, setTranslation12] = useState<string>('Register');
    const [translation13, setTranslation13] = useState<string>('I forgot my password');
    const [translation14, setTranslation14] = useState<string>('Please enter your email address below and you will receive a link to create a new password via email.');
    const [translation15, setTranslation15] = useState<string>('Submit');





    // const {from} = route.params;
    // const prevScreen = from;
    // console.log(route);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
            // navigation.push('Account');
        } else {
            setLoggedIn(false);
        }
    });

    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6, translation7, translation8, translation9, translation10, translation11, translation12, translation13, translation14, translation15]);
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
                } catch (error) {
                    console.error('Erreur de traduction Login:', error);
                }
            }else {
                setTranslation1('Please enter your email and password');
                setTranslation2('Your email or password was incorrect');
                setTranslation3('Email sent');
                setTranslation4('Please check your email to reset your password');
                setTranslation5('There was a problem with your request. Please try again later');
                setTranslation6('Let\'s sign you in.');
                setTranslation7('Welcome back !');
                setTranslation8('Forgot password ?');
                setTranslation9('Log in');
                setTranslation10('Or');
                setTranslation11('Don\'t have an account ?');
                setTranslation12('Register');
                setTranslation13('I forgot my password');
                setTranslation14('Please enter your email address below and you will receive a link to create a new password via email.');
                setTranslation15('Submit');
            }
        }
        fetchTranslation();
    }, [language]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         if (loggedIn) {
    //             navigation.popToTop();
    //         }
    //     }, [loggedIn])
    // )



    const handleLogin = async () => {
        // const idToken: Promise<string> = auth.currentUser?.getIdToken(true) as Promise<string>;
        // const refreshToken: string = auth.currentUser?.refreshToken as string;

        if(email === '' || password === '') {
            setError(translation1);
            return;
        }
        try {
            signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                const idToken = await userCredential.user?.getIdToken();
                const refreshToken = await userCredential.user?.getIdToken(true);
                const tokenExpiration = await userCredential.user?.getIdTokenResult().then((result) => result.expirationTime);
                await AsyncStorage.setItem('idToken', idToken);
                await AsyncStorage.setItem('refreshToken', refreshToken);
                await AsyncStorage.setItem('tokenExpiration', tokenExpiration);
                console.log('idToken: ', idToken);
                console.log('refreshToken: ', refreshToken);

            })
            setError('');
            setLoading(true);
            navigation.navigate( 'HomeStackScreen', {screen: 'HomePage'});
        } catch (e) {
            // @ts-ignore
            if (e.code === 'auth/invalid-email' || e.code === 'auth/wrong-password') {
                setError(translation2);
                setPassword('');
            }
            // else { // @ts-ignore
            //     if (e.code === 'auth/email-already-in-use') {
            //                     setError('An account with this email already exists');
            //                 } else {
            //                     setError('There was a problem with your request');
            //                 }
            // }
        }
    };

    const resetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setSubmitted(true);
            setError('');
            setSent(true);
            Alert.alert(translation3,
                translation4,
                [
                    {
                        text: "Ok",
                        onPress: () => setModalVisible(false)
                    }
                ]
            );
        } catch (e) {
            // @ts-ignore
            if (e.code === 'auth/user-not-found') {
                setError(translation5);
            } else {
                setError(translation6);
            }
        }
    }

    const togglePassword = () => {
        setIsVisible(!isVisible);
    }

    // const handlePasswordChange = (value: string) => {
    //     setPassword(value);
    //     if (value.length < 0) {
    //         setError('');
    //     }
    // }
    //
    // useEffect(() => {
    //     handlePasswordChange(password)
    // }, [password]);

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#9fc131" />
            {/*{loading && <ActivityIndicator style={styles.activityIndicator} size="large" color="#9fc131" />}*/}
            <KeyboardAwareScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Let's sign you in.</Text>
                    <Text style={styles.subtitle}>Welcome back !</Text>

                </View>
                    {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form}>
                    <View style={styles.inputZone}>
                        <Feather name={'user'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={"#f2f2f2"}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <View style={[styles.inputZone, {flexDirection: 'row'}]}>
                        <Feather name={'lock'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={[styles.input,  {paddingRight: 45}]}
                            placeholder="Password"
                            placeholderTextColor={"#f2f2f2"}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={isVisible}
                        />
                        {isVisible ? <Feather name={'eye-off'} size={20} color={"#f2f2f2"} style={styles.showButton}  onPress={() => togglePassword()} /> : <Feather name={'eye'} size={20} color={"#f2f2f2"} style={styles.showButton} onPress={() => togglePassword()}/>}
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.link}>Forgot password ?</Text>
                    </TouchableOpacity>
                    <View style={styles.inputZone}>
                        <TouchableOpacity style={styles.loginBtn}
                                          onPress={() => handleLogin()} activeOpacity={0.5}
                        >
                            <Text style={styles.btnText}>Log in <Feather name={'arrow-right'} size={16} color={"#9fc131"}/></Text>
                        </TouchableOpacity>
                        <View style={styles.divider}>
                            <View style={styles.line}></View>
                            <Text style={styles.dividerText}>Or</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View style={styles.socialLogin}>
                            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.5}
                                              // onPress={() => handleFacebookLogin()}
                            >
                                <Image source={require('../../assets/facebook.png')} style={{width: 20, height: 20}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.5}
                                              // onPress={() => handleGoogleLogin()}
                            >
                                <Image source={require('../../assets/google.png')} style={{width: 20, height: 20}} />
                            </TouchableOpacity>
                        </View>
                        {/*<TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]} activeOpacity={0.5} onPress={() => navigation.navigate('Register')}>*/}
                        {/*    <Text style={styles.btnText}>Create an account</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View style={styles.registerAsk}>
                        <Text style={styles.text}>Don't have an account ? <Link to={'/Register'} style={styles.registerButton}>Register</Link></Text>
                    </View>


                    <Modal
                        visible={modalVisible}
                        animationType='slide'
                        transparent={true}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={[styles.modalView, general.shadow, {backgroundColor: colors.notification} ]}>
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={() => setModalVisible(false)}>
                                        <Feather name={"x"} size={24} color={'#9c9c9c'}/>
                                    </TouchableOpacity>
                                    <Text style={[styles.modalTitle, {color: colors.text}]}>I forgot my password</Text>
                                </View>
                                {/*{sent && <Text style={styles.success}>An email has been sent to {email}. Please check your email.</Text>}*/}
                                    <Text style={[styles.modalText, {color: colors.text}]}>Please enter your email address below and you will receive a link to create a new password via email.</Text>
                                {error && <Text style={styles.error}>{error}</Text>}
                                <View style={styles.inputZone}>
                                    <TextInput
                                        style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                                        placeholder="Email"
                                        placeholderTextColor={colors.text}
                                        onChangeText={setEmail}
                                        value={email}
                                        autoCapitalize={'none'}
                                    />
                                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                                        onPress={() => resetPassword()}
                                    >
                                        <Text style={styles.btnText}>Submit <Feather name={'arrow-right'} size={16} color={"#fff"}/></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );

};

