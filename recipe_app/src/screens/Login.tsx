import React, {useEffect, useState} from "react";
import {
    Link,
    NavigationContainer,
    useNavigation,
    useNavigationState,
    useRoute,
    useTheme
} from "@react-navigation/native";
import {ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Login_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {auth} from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import Profile from "./Profile";
import Register from "./Register";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {LoginStackList, ProfileStackList} from "../types/types";
import Separator from "../components/Separator";
import Feather from "react-native-vector-icons/Feather";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

// @ts-ignore
type LoginProps = MyStackNavigationProp<LoginStackList, 'Login'>;
type Props = NativeStackScreenProps<ProfileStackList, 'LoginStackScreen'>;



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
            // navigation.push('Profile');
        } else {
            setLoggedIn(false);
        }
    });



    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError('');
            setLoading(true);
            // navigation.navigate('Home', {screen: 'HomeStackScreen/HomePage'});
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
        } catch (e) {
            // @ts-ignore
            if (e.code === 'auth/user-not-found') {
                setError('User not found with this email');
            } else {
                setError('There was a problem with your request');
            }
        }
    }

    const togglePassword = () => {
        setIsVisible(!isVisible);
    }

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {loading && <ActivityIndicator style={styles.activityIndicator} size="large" color="#9fc131" />}
            <ScrollView keyboardShouldPersistTaps='always'>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form}>
                    <TextInput
                        style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                        placeholder="Email"
                        placeholderTextColor={colors.text}
                        onChangeText={setEmail}
                        value={email}
                        autoCapitalize={'none'}
                    />
                    <TextInput
                        style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                        placeholder="Password"
                        placeholderTextColor={colors.text}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={isVisible}
                    />
                    {isVisible ? <Feather name={'eye-off'} size={20} color={colors.text} style={styles.showButton} onPress={() => togglePassword()} /> : <Feather name={'eye'} size={20} color={colors.text} style={styles.showButton} onPress={() => togglePassword()}/>}

                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                      onPress={() => handleLogin()}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text>Reset Password</Text>
                    </TouchableOpacity>
                    <Modal visible={modalVisible} animationType='slide'>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {sent && <Text style={styles.success}>An email has been sent to {email}</Text>}
                            <Text>Reset Password</Text>
                            <TextInput
                                style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                                placeholder="Email"
                                placeholderTextColor={colors.text}
                                onChangeText={setEmail}
                                value={email}
                                autoCapitalize={'none'}
                            />
                            <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                                onPress={() => sendPasswordResetEmail(auth, email)}
                            >
                                <Text style={styles.btnText}>Reset Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Link to={{screen : 'ResetPassword'}} style={[styles.link, {color: colors.text}]}>I've forgotten my password</Link>
                    <Separator />
                    <Text style={[styles.text, {color: colors.text}]}>Don't have an account?
                         <Link to={{screen : 'Register'}} style={[styles.link, {color: colors.text}]}>Sign up</Link></Text>
                </View>
            </ScrollView>
        </View>
    );

};

