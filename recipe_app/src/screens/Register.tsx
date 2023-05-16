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
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


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
    const [errorPwd, setErrorPwd] = useState<string>('');
    const [errorCPwd, setErrorCPwd] = useState<string>('');
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
                // navigation.push('Profile');
                navigation.navigate('Home', {screen: 'HomeStackScreen/HomePage'});

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
        let errorPwd = "";
        if(value === ""){
            errorPwd = "";
        }else if (!passwordRegex.test(value)) {
            errorPwd = "Password must contain at least 8 characters, 1 uppercase letter and 1 number";
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
            errorPwd = "Passwords do not match";
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

    return (

        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#9fc131" />
            <KeyboardAwareScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.subtitle}>Create your account</Text>

                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form}>
                    <View style={styles.inputZone}>
                        <Feather name={'smile'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor={"#f2f2f2"}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputZone}>
                        <Feather name={'mail'} size={20} color={"#f2f2f2"} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
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
                            placeholder="Password"
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
                            placeholder="Confirm Your Password"
                            placeholderTextColor={"#f2f2f2"}
                            value={confPassword}
                            onChangeText={handleConfPasswordChange}
                            secureTextEntry={isVisible.confPassword}
                        />
                        {isVisible.confPassword ? <Feather name={'eye-off'} size={20} color={"#f2f2f2"} style={styles.showButton} onPress={() => togglePassword('confPassword')} /> : <Feather name={'eye'} size={20} color={"#f2f2f2"} style={styles.showButton} onPress={() => togglePassword('confPassword')}/>}
                    </View>
                    {errorCPwd && <Text style={styles.errorPwd}>{errorCPwd}</Text>}


                    <View style={styles.inputZone}>
                        <TouchableOpacity style={styles.loginBtn} activeOpacity={0.5}
                            onPress={handleSubmit}
                            disabled={!email || !password || !confPassword || !username}
                        >
                            <Text style={styles.btnText}>Register <Feather name={'arrow-right'} size={16} color={"#9fc131"}/></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.registerAsk, {marginTop: 175}]}>
                        <Text style={styles.text}>Already have an account ? <Link to={{screen : 'Login'}} style={styles.registerButton}>Login</Link></Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>

    );

}

export default Register;