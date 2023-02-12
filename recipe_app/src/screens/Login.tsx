import React, {useEffect, useState} from "react";
import {Link, useNavigation, useTheme} from "@react-navigation/native";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Login_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {auth} from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import Profile from "./Profile";
import Register from "./Register";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {LoginStackList} from "../types";
import Separator from "../components/Separator";

// @ts-ignore
type LoginProps = MyStackNavigationProp<LoginStackList, 'Login'>;

const {colors} = useTheme();
const theme = useTheme();
const colorSpec = theme.dark ? '#252525' : '#041721';
export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setSubmitted(true);
            setError('');
        } catch (e) {
            // @ts-ignore
            if (e.code === 'auth/user-not-found') {
                setError('User not found with this email');
            } else {
                setError('There was a problem with your request');
            }
        }
    }

    return (
        <View style={styles.inner}>
            <Text style={styles.header}>Reset Password</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            {submitted ? (
                <Text>Please check your email for a reset password link.</Text>
            ) : (
                <>
                    <Text style={styles.text}>Enter your email address below and we will send you a link to reset your password.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={colors.text}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} disabled={!email}>
                        <Text style={styles.btnText}>Reset Password</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity onPress={() => setScreen('login')}>*/}
                    {/*    <Text style={styles.link}>Back to login</Text>*/}
                    {/*</TouchableOpacity>*/}
                </>
            )}
        </View>
    );
}

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [screen, setScreen] = useState<any>(null);
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigation = useNavigation<LoginProps>();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    // const goToProfile = () => {
    //     if (loggedIn) return <Profile />;
    //     if (screen === 'register') return <Register setScreen={setScreen} />;
    //     if (screen === 'reset-password') return <ResetPassword setScreen={setScreen} />;
    //     return <SignIn setScreen={setScreen} />;
    // }

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError('');
        } catch (e) {
            // @ts-ignore
            if (e.code === 'auth/invalid-email' || e.code === 'auth/wrong-password') {
                setError('Your email or password was incorrect');
            } else { // @ts-ignore
                if (e.code === 'auth/email-already-in-use') {
                                setError('An account with this email already exists');
                            } else {
                                setError('There was a problem with your request');
                            }
            }
        }
    };
    






    return (
        // {error ? navigation.navigate('Profile') : (
            <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
                {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color: colors.text}]}>Login</Text>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form}>
                    <TextInput
                        style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                        placeholder="Email"
                        placeholderTextColor={colors.text}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                        placeholder="Password"
                        placeholderTextColor={colors.text}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                      onPress={() => handleLogin()}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={[styles.link, { color: '#333' }]}>I've forgotten my password</Text>
                    </TouchableOpacity>
                    <Separator />
                    <Text style={[styles.text, {color: colors.text}]}>Don't have an account? <Link to={{screen : 'Register'}}>Register</Link></Text>
                </View>

                {/*{goToProfile()}*/}
            </View>
        // )}

      );

};

export default Login;