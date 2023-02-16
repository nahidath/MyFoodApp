import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {useState} from "react";
import {View, Text, ScrollView, TextInput, TouchableOpacity, Alert} from "react-native";
import styles from "../stylesheets/Login_stylesheet";
import {Link, useTheme} from "@react-navigation/native";
import Separator from "../components/Separator";
import {colors} from "react-native-elements";
import {auth} from "../firebase/config";
import {updateEmail, updatePassword, updateProfile} from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";
import general from "../stylesheets/General_stylesheet";


const EditProfile = () => {
    const user = auth.currentUser;
    // @ts-ignore
    const [email, setEmail] = useState<string>(user.email);
    // @ts-ignore
    const [username, setUsername] = useState<string>(user.displayName);
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isFocused, setIsFocused] = useState<any>({
        password: false,
        confPassword: false
    });
    const [isEditable, setIsEditable] = useState<any>({
        email: false,
        username: false,

    });
    const [isVisible, setIsVisible] = useState<any>({
        password: true,
        confPassword: true
    });
    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';


    const updateInfos = () => {
        if (password !== confPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            if (user) {
                if(user.email !== email){
                    updateEmail(user, email).then(() => {
                        setEmail(email);
                    }).catch((error) => {
                        setError(error.message);
                    });
                }
                if(user.displayName !== username){
                    updateProfile(user,{
                        displayName: username
                    }).then(() => {
                        setUsername(username);
                    }).catch((error) => {
                        setError(error.message);
                    });
                }
                if(password !== ''){
                    updatePassword(user,password).then(() => {
                        setPassword(password);
                    }).catch((error) => {
                        setError(error.message);
                    });
                }

            }


        }
    }

    const inputEditable = (inputN : any) => {
        if(inputN === 'email'){
            setIsEditable({
                email: !isEditable.email,
                username: isEditable.username,
                password: isEditable.password,
                confPassword: isEditable.confPassword
            });
        } else if(inputN === 'username'){
            setIsEditable({
                email: isEditable.email,
                username: !isEditable.username,
                password: isEditable.password,
                confPassword: isEditable.confPassword
            });
        } else if(inputN === 'password'){
            setIsEditable({
                email: isEditable.email,
                username: isEditable.username,
                password: !isEditable.password,
                confPassword: isEditable.confPassword
            });
        } else if(inputN === 'confPassword'){
            setIsEditable({
                email: isEditable.email,
                username: isEditable.username,
                password: isEditable.password,
                confPassword: !isEditable.confPassword
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

    const handleFocus = (inputN : any) => {
        if(inputN === 'password'){
            setIsFocused({
                password: true,
                confPassword: isFocused.confPassword
            });
        } else if(inputN === 'confPassword'){
            setIsFocused({
                password: isFocused.password,
                confPassword: true
            });
        }
    }




    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color: colors.text}]}>Your profile</Text>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isEditable.email ? 'red' : colors.border, borderWidth: isEditable.email ? 2 : 1, color: colors.text, backgroundColor: isEditable.email ?
                                    'white' : '#F0F0F0',}]}
                            placeholder="Email"
                            placeholderTextColor={colors.text}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize={'none'}
                            editable={isEditable.email}
                        />
                        <Feather name={'edit-3'} size={20} color={colors.text} style={styles.editButton} onPress={() => inputEditable('email')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isEditable.username ? 'red' : colors.border, borderWidth: isEditable.username ? 2 : 1, color: colors.text, backgroundColor: isEditable.username ?
                                    'white' : '#F0F0F0',}]}
                            placeholder="Username"
                            placeholderTextColor={colors.text}
                            onChangeText={setUsername}
                            value={username}
                            editable={isEditable.username}
                        />
                        <Feather name={'edit-3'} size={20} color={colors.text} style={styles.editButton} onPress={() => inputEditable('username')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isFocused.password ? 'red' : colors.border, borderWidth: isFocused.password ? 2 : 1, color: colors.text, backgroundColor: isFocused.password ?
                                    'white' : '#F0F0F0',}]}
                            placeholder="New password"
                            placeholderTextColor={colors.text}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={isVisible.password }
                            editable={true}
                            onFocus={() => handleFocus('password')}
                            onBlur={() => {!isFocused.password }}
                        />
                        {isVisible.password ? <Feather name={'eye'} size={20} color={colors.text} style={styles.editButton} onPress={() => togglePassword('password')} /> : <Feather name={'eye-off'} size={20} color={colors.text} style={styles.editButton} onPress={() => togglePassword('password')}/>}
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isFocused.confPassword ? 'red' : colors.border, color: colors.text, borderWidth: isFocused.confPassword ? 2 : 1, backgroundColor: isFocused.confPassword ?
                                    'white' : '#F0F0F0',}]}
                            placeholder="Confirm your new password"
                            placeholderTextColor={colors.text}
                            onChangeText={setConfPassword}
                            value={confPassword}
                            secureTextEntry={isVisible.confPassword}
                            editable={true}
                            onFocus={() => handleFocus('confPassword')}
                            onBlur={() => {!isFocused.confPassword}}
                        />
                        {isVisible.confPassword ? <Feather name={'eye'} size={20} color={colors.text} style={styles.editButton} onPress={() => togglePassword('confPassword')} /> : <Feather name={'eye-off'} size={20} color={colors.text} style={styles.editButton} onPress={() => togglePassword('confPassword')}/>}
                    </View>

                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                      onPress={() => updateInfos()}
                    >
                        <Text style={styles.btnText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default EditProfile;