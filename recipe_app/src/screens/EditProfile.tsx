import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {useState} from "react";
import {View, Text, ScrollView, TextInput, TouchableOpacity, Alert, Pressable, ImageBackground, StyleSheet} from "react-native";
import styles from "../stylesheets/Login_stylesheet";
import {Link, useTheme} from "@react-navigation/native";
import Separator from "../components/Separator";
import {colors} from "react-native-elements";
import {auth, storage} from "../firebase/config";
import {updateEmail, updatePassword, updateProfile} from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";
import general from "../stylesheets/General_stylesheet";
import profile from "../stylesheets/Profile_stylesheet";
import * as ImagePicker from "expo-image-picker";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import AntDesign from "react-native-vector-icons/AntDesign";


const EditProfile = () => {
    const user = auth.currentUser;
    // @ts-ignore
    const [email, setEmail] = useState<string>(user.email);
    // @ts-ignore
    const [username, setUsername] = useState<string>(user.displayName);
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    // @ts-ignore
    const [userPicture, setUserPicture] = useState<any>(user.photoURL);
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
    const [image, setImage] = useState<any>(null);


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
                // if(image !== null && image !== user.photoURL){
                //     updateProfile(user,{
                //         photoURL: image
                //     }).then(() => {
                //         setUserPicture(image);
                //     }).catch((error) => {
                //         setError(error.message);
                //     });
                // }

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



    const pickImage = async () => {
        // let image = null;
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.canceled){
            // @ts-ignore
            setImage(result.uri);
        }
        // await uploadImage(image);
        if(user){
            const fileRef = ref(storage, '/profilePics/' + user.uid + '.jpg' );
            uploadBytes(fileRef, image).then(() => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(fileRef).then((url) => {
                    console.log(url);
                    updateProfile(user,{
                        photoURL: url
                    }).then(() => {
                        setUserPicture(url);
                        console.log('photoURL updated');
                    }).catch((error) => {
                        setError(error.message);
                    });
                }).catch((error) => {
                    setError(error.message);
                });

            }).catch((error) => {
                setError(error.message);
            });
            // const snapshot = await uploadBytes(fileRef, image);

        }

    };

    // const uploadImage = async (img: Blob | Uint8Array | ArrayBuffer) => {
    //     if(user){
    //         const fileRef = ref(storage, 'gs://my-recipe-app-72535.appspot.com/profilePics' + user.uid + '.jpg');
    //         const snapshot = await uploadBytes(fileRef, img);
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             updateProfile(user,{
    //                 photoURL: url
    //             }).then(() => {
    //                 setUserPicture(url);
    //             }).catch((error) => {
    //                 setError(error.message);
    //             });
    //         });
    //         // const url = await ref.getDownloadURL(snapshot.ref);
    //         // updateProfile(user,{
    //         //     photoURL: url
    //         // }).then(() => {
    //         //     setUserPicture(url);
    //         // }).catch((error) => {
    //         //     setError(error.message);
    //         // });
    //
    //     }
    //
    // }




    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView keyboardShouldPersistTaps='always'>
                {/*<View style={styles.header}>*/}
                {/*    <Text style={[styles.headerText, {color: colors.text}]}>Your profile</Text>*/}
                {/*</View>*/}
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={profile.profilePicContainer}>
                    <View style={stylesEdit.profileView}>
                        {userPicture ? <ImageBackground source={{uri: userPicture}} style={profile.profilePic} /> : <AntDesign name={"user"} size={100} color={"#041721"}  />}
                    </View>
                    <TouchableOpacity style={profile.editProfilePic} onPress={pickImage}>
                        <Feather name={"camera"} size={24} color={"#ffffff"} />
                    </TouchableOpacity>
                </View>
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
                        {isVisible.password ? <Feather name={'eye-off'} size={20} color={colors.text} style={styles.editButton} onPress={() => togglePassword('password')} /> : <Feather name={'eye'} size={20} color={colors.text} style={styles.editButton} onPress={() => togglePassword('password')}/>}
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

const stylesEdit = StyleSheet.create({
    profileView: {
        top: 10,
        width: 150,
        height: 150,
        borderRadius: 80,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default EditProfile;