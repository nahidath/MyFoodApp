import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Pressable,
    ImageBackground,
    StyleSheet,
    Image
} from "react-native";
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
import axios from "axios";


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
    const [imageType, setImageType] = useState<any>(null);
    const [permission, setPermission] = useState<any>(null);



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

    useEffect(() => {
        (async () => {
            const  status  = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setPermission(status.status === 'granted');
        })();
    }, []);


    const pickImage = async () => {
        // let image = null;
        // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // if (status !== 'granted') {
        //     alert('Sorry, we need camera roll permissions to make this work!');
        //     return;
        // }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log('results');
        if(!result.canceled){
            // @ts-ignore
            setImage(result.assets[0].uri);
            setImageType(result.assets[0].uri.split('.').pop());
        }
        console.log('image', image);
        // await uploadImage();

    };


    const uploadImage = async () => {
        if(user){
            console.log('img url',image);
            const fileRef = ref(storage, '/profilePics/' + user.uid + '.' + imageType );
            // const response = await fetch(image);
            // const blob = await response.blob();
            const response = await axios.get(image, {
                responseType: 'blob'
            });
            const blob = await response.data;
            // console.log(fileRef);
            uploadBytes(fileRef, blob, {contentType: 'image/'+ imageType}).then(() => {
                // console.log('Uploaded a blob or file!');
                getDownloadURL(fileRef).then((url) => {
                    // console.log(url);
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

        }
    }
    console.log('uri user',userPicture);


    if(!permission){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: colors.text}}>You need to give permission to access your gallery</Text>
        </View>
    }

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView keyboardShouldPersistTaps='always'>
                {/*<View style={styles.header}>*/}
                {/*    <Text style={[styles.headerText, {color: colors.text}]}>Your profile</Text>*/}
                {/*</View>*/}
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={profile.profilePicContainer}>
                    {/*<View style={stylesEdit.profileView}>*/}
                    {/*    /!*{userPicture ? <ImageBackground source={{uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fflowers%2F&psig=AOvVaw36BXlRLvzAIjSwNpy6SNNZ&ust=1676833925794000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDM8aXjn_0CFQAAAAAdAAAAABAE"}}  /> : <AntDesign name={"user"} size={100} color={"#041721"}  />}*!/*/}
                    {/*</View>*/}
                    {userPicture ? <Image source={{uri: userPicture}} style={stylesEdit.profilePic} /> : <AntDesign name={"user"} size={100} color={"#041721"}  />}

                    <TouchableOpacity style={profile.editProfilePic} onPress={() => pickImage()}>
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
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 80,
    }
});

export default EditProfile;