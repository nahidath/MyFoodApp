import React, {useEffect, useState} from "react";
import {Link, useTheme} from "@react-navigation/native";
import {colors} from "react-native-elements";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Login_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {auth} from "../firebase/config";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Profile from "./Profile";
import Register from "./Register";


class User {
    email: string;
    uid: string;
    constructor(email: string, uid: string) {
        this.email = email;
        this.uid = uid;
    }
}

const Login = () => {

      const [email, setEmail] = useState('');

      const [password, setPassword] = useState('');
    const [screen, setScreen] = useState<any>(null);

      const [error, setError] = useState('');
      //
      // const [loading, setLoading] = useState(false);
      //
      const [loggedIn, setLoggedIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    const goToProfile = () => {
        if (loggedIn) return <Profile />;
        if (screen === 'register') return <Register setScreen={setScreen} />;
        return <SignIn setScreen={setScreen} />;
    }

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                setError('Your email or password was incorrect');
            } else if (error.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists');
            } else {
                setError('There was a problem with your request');
            }
        }
    };
    
    const resetPassword = () => {
        return (
            <View style={styles.outer}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Reset Password</Text>
                </View>
            </View>
        );
    }

    const SignIn = ({setScreen}) => {
        return(
            <View>
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color: colors.text}]}>Login</Text>
                </View>
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
                        onPress={() => setScreen('register')}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, {color: colors.text}]}>Don't have an account? <Link to="/register">Register</Link></Text>
                </View>
            </View>

        )
    }

    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';


    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}

            {goToProfile()}
        </View>

      );

};

export default Login;