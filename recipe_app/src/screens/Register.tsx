import React, {useEffect, useState} from "react";
import {colors} from "react-native-elements";
import {Link, useNavigation, useTheme} from "@react-navigation/native";
import {TextInput, TouchableOpacity, View, Text, ScrollView} from "react-native";
import styles from "../stylesheets/Login_stylesheet";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/config";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {LoginStackList} from "../types/types";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import {updateProfile} from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";
import Tooltip from "../components/Tooltip";


// @ts-ignore
type RegisterProps = MyStackNavigationProp<LoginStackList, 'Register'>

const Register = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const navigation = useNavigation<RegisterProps>();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [error, setError] = useState<any>('');
    const [isVisible, setIsVisible] = useState<any>({
        password: true,
        confPassword: true
    });


    const handleSubmit = async () => {
        try {
            if(password === confPassword) {
                await createUserWithEmailAndPassword(auth, email, password);
                if (auth.currentUser) {
                    updateProfile(auth.currentUser, {displayName: username}).then(() => {
                        console.log('Account updated');
                    }).catch((error: any) => {
                        console.log(error);
                    });
                }
                setError('');
                navigation.push('Profile');
            } else {
                setError('Passwords do not match');
            }
        } catch (err) {
            setError('Failed to create an account');
        }
    }

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: 'Register',
    //     })
    // },[navigation]);
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
        if (!passwordRegex.test(value)) {
            setError('Password must be at least 8 characters long, 1 uppercase letter and 1 number.');
        } else {
            setError('');
        }
    };

    return (

        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView>
                <View style={{margin:10}}>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={styles.form}>
                        <Text style={[styles.label, {color: colors.text}]}>Username</Text>
                        <View style={styles.inputZone}>
                            <TextInput
                                style={[styles.input, {color: colors.text}]}
                                // placeholder="Username"
                                // placeholderTextColor={colors.text}
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        <Text style={[styles.label, {color: colors.text}]}>Email</Text>
                        <View style={styles.inputZone}>
                            <TextInput
                                style={[styles.input, {color: colors.text}]}
                                // placeholder="Email"
                                // placeholderTextColor={colors.text}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize={'none'}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.label, {color: colors.text}]}>Password</Text>
                            <Tooltip content={"Password must be at least 8 characters long, 1 uppercase letter and 1 number"} >
                                <Feather name={'info'} size={18} color={colors.text} style={{marginLeft: 5, marginTop:2}} />
                            </Tooltip>
                        </View>
                        <View style={styles.inputZone}>
                            <TextInput
                                style={[styles.input, {color: colors.text}]}
                                // placeholder="Password"
                                // placeholderTextColor={colors.text}
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={isVisible.password}
                            />
                            {isVisible.password ? <Feather name={'eye-off'} size={20} color={colors.text} style={styles.showButton} onPress={() => togglePassword('password')} /> : <Feather name={'eye'} size={20} color={colors.text} style={styles.showButton} onPress={() => togglePassword('password')}/>}
                        </View>
                        <Text style={[styles.label, {color: colors.text}]}>Confirm your password</Text>
                        <View style={styles.inputZone}>
                            <TextInput
                                style={[styles.input, {color: colors.text}]}
                                // placeholder="Confirm Your Password"
                                // placeholderTextColor={colors.text}
                                value={confPassword}
                                onChangeText={setConfPassword}
                                secureTextEntry={isVisible.confPassword}
                            />
                            {isVisible.confPassword ? <Feather name={'eye-off'} size={20} color={colors.text} style={styles.showButton} onPress={() => togglePassword('confPassword')} /> : <Feather name={'eye'} size={20} color={colors.text} style={styles.showButton} onPress={() => togglePassword('confPassword')}/>}
                        </View>

                        <View style={styles.inputZone}>
                            <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]} activeOpacity={0.5}
                                onPress={handleSubmit}
                                disabled={!email || !password || !confPassword || !username}
                            >
                                <Text style={styles.btnText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.text, {color: colors.text}]}>Already have an account ? <Link to={{screen : 'Login'}} style={[styles.link, {color: colors.text}]}>Login</Link></Text>
                    </View>
                </View>
            </ScrollView>
        </View>

    );

}

export default Register;