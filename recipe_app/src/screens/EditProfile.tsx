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


const EditProfile = () => {
    const user = auth.currentUser;
    // @ts-ignore
    const [email, setEmail] = useState<string>(user.email);
    // @ts-ignore
    const [username, setUsername] = useState<string>(user.displayName);
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isEditable, setIsEditable] = useState<boolean>(false);
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

    const inputEditable = () => {
        setIsEditable(!isEditable);
    }




    return (
        <View style={styles.container}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color: colors.text}]}>Your profile</Text>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isEditable ? 'red' : colors.border, borderWidth: isEditable ? 2 : 1, color: colors.text, backgroundColor: isEditable ?
                                    'white' : '#d8d8d8',}]}
                            placeholder="Email"
                            placeholderTextColor={colors.text}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize={'none'}
                            editable={isEditable}
                        />
                        <Feather name={'edit-3'} size={20} color={colors.text} style={styles.editButton} onPress={() => inputEditable()}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isEditable ? 'red' : colors.border, borderWidth: isEditable ? 2 : 1, color: colors.text, backgroundColor: isEditable ?
                                    'white' : '#d8d8d8',}]}
                            placeholder="Username"
                            placeholderTextColor={colors.text}
                            onChangeText={setUsername}
                            value={username}
                            editable={isEditable}
                        />
                        <Feather name={'edit-3'} size={20} color={colors.text} style={styles.editButton} onPress={() => inputEditable()}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isEditable ? 'red' : colors.border, color: colors.text, borderWidth: isEditable ? 2 : 1, backgroundColor: isEditable ?
                                    'white' : '#d8d8d8',}]}
                            placeholder="New password"
                            placeholderTextColor={colors.text}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                            editable={isEditable}
                        />
                        <Feather name={'edit-3'} size={20} color={colors.text} style={styles.editButton} onPress={() => inputEditable()}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,  {borderColor: isEditable ? 'red' : colors.border, color: colors.text, borderWidth: isEditable ? 2 : 1, backgroundColor: isEditable ?
                                    'white' : '#d8d8d8',}]}
                            placeholder="Confirm your new password"
                            placeholderTextColor={colors.text}
                            onChangeText={setConfPassword}
                            value={confPassword}
                            secureTextEntry={true}
                            editable={isEditable}
                        />
                        <Feather name={'edit-3'} size={20} color={colors.text} style={styles.editButton} onPress={() => inputEditable()}/>
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