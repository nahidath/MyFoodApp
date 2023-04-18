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
    Alert,
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

// @ts-ignore
type LoginProps = MyStackNavigationProp<LoginStackList, 'Login'>;
// type Props = NativeStackScreenProps<ProfileStackList, 'LoginStackScreen'>;



//Reset Password function



//Login function and principal screen
export default function Login () {

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

    useFocusEffect(
        React.useCallback(() => {
            if (loggedIn) {
                navigation.popToTop();
            }
        }, [loggedIn])
    )



    const handleLogin = async () => {
        if(email === '' || password === '') {
            setError('Please enter your email and password');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError('');
            setLoading(true);
            navigation.navigate('Home', {screen: 'HomeStackScreen/HomePage'});
        } catch (e) {
            // @ts-ignore
            if (e.code === 'auth/invalid-email' || e.code === 'auth/wrong-password') {
                setError('Your email or password was incorrect');
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
            Alert.alert('Email sent',
                'Please check your email to reset your password',
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
                setError('User not found with this email');
            } else {
                setError('There was a problem with your request. Please try again later');
            }
        }
    }

    const togglePassword = () => {
        setIsVisible(!isVisible);
    }

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {/*{loading && <ActivityIndicator style={styles.activityIndicator} size="large" color="#9fc131" />}*/}
            <ScrollView>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form}>
                    <Text style={[styles.label, {color: colors.text}]}>Email</Text>
                    <View style={styles.inputZone}>
                        <TextInput
                            style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                            // placeholder="Email"
                            // placeholderTextColor={colors.text}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <Text style={[styles.label, {color: colors.text}]}>Password</Text>
                    <View style={[styles.inputZone, {flexDirection: 'row'}]}>
                        <TextInput
                            style={[styles.input,  {borderColor: colors.border, color: colors.text, paddingRight: 45}]}
                            // placeholder="Password"
                            // placeholderTextColor={colors.text}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={isVisible}
                        />
                        {isVisible ? <Feather name={'eye-off'} size={20} color={colors.text} style={styles.showButton}  onPress={() => togglePassword()} /> : <Feather name={'eye'} size={20} color={colors.text} style={styles.showButton} onPress={() => togglePassword()}/>}
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={[styles.link, {color: colors.text}]}>Forgot password ?</Text>
                    </TouchableOpacity>
                    <View style={styles.inputZone}>
                        <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                          onPress={() => handleLogin()} activeOpacity={0.5}
                        >
                            <Text style={styles.btnText}>Log in <Feather name={'arrow-right'} size={16} color={"#fff"}/></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]} activeOpacity={0.5} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.btnText}>Create an account</Text>
                        </TouchableOpacity>
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
            </ScrollView>
        </View>
    );

};

