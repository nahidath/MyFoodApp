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
    Image, ActivityIndicator
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
import FileSystem from "expo-file-system";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import stylesEdit from "../stylesheets/EditProfile_Stylesheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Tooltip from "../components/Tooltip";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";



const EditProfile = () => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();

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
    const [loading, setLoading] = useState<boolean>(false);
    const loadingColor = theme.dark ? '#E5E2E3' : '#929090';
    const inputColor = theme.dark ? 'rgba(155,155,155,0.52)' : '#F0F0F0';
    const inputColor2 = theme.dark ? '#252525': '#fff' ;
    const [translation1, setTranslation1] = useState<string>("Passwords do not match");
    const [translation2, setTranslation2] = useState<string>("Updated");
    const [translation3, setTranslation3] = useState<string>("Your profile has been updated successfully");
    const [translation4, setTranslation4] = useState<string>("Sorry, we need camera roll permissions to make this work!");
    const [translation5, setTranslation5] = useState<string>("Password must be at least 8 characters long, 1 uppercase letter and 1 number.");
    const [translation6, setTranslation6] = useState<string>("Email");
    const [translation7, setTranslation7] = useState<string>("Name");
    const [translation8, setTranslation8] = useState<string>("New Password");
    const [translation9, setTranslation9] = useState<string>("Confirm New Password");
    const [translation10, setTranslation10] = useState<string>("Update");



    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6, translation7, translation8, translation9, translation10]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                    setTranslation6(elementsTranslated[5]);
                    setTranslation7(elementsTranslated[6]);
                    setTranslation8(elementsTranslated[7]);
                    setTranslation9(elementsTranslated[8]);
                    setTranslation10(elementsTranslated[9]);

                } catch (error) {
                    console.error('Erreur de traduction EditProfile:', error);
                }
            }else{
                setTranslation1("Passwords do not match");
                setTranslation2("Updated");
                setTranslation3("Your profile has been updated successfully");
                setTranslation4("Sorry, we need camera roll permissions to make this work!");
                setTranslation5("Password must be at least 8 characters long, 1 uppercase letter and 1 number.");
                setTranslation6("Email");
                setTranslation7("Name");
                setTranslation8("New Password");
                setTranslation9("Confirm New Password");
                setTranslation10("Update");
            }
        }
        fetchTranslation();
    }, [language]);

    const updateInfos = () => {
        if (password !== confPassword) {
            setError(translation1);
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
        Alert.alert(
            translation2 + ' 🎉',
            translation3,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
            );
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
        let imagePicked : string = "";
        let imageExt  = null;
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(translation4);
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.canceled){
            // @ts-ignore
            imagePicked = result.assets[0].uri;
            imageExt = result.assets[0].uri.split('.').pop();
        }

        if(user){
            const fileRef = ref(storage, '/profilePics/' + user.uid + '.' + imageExt );
            const response = await axios.get(imagePicked, {
                responseType: 'blob'
            });
            const blob = await response.data;

            uploadBytes(fileRef, blob, {contentType: 'image/'+ imageExt}).then(() => {
                getDownloadURL(fileRef).then((url) => {
                    updateProfile(user,{
                        photoURL: url
                    }).then(() => {
                        setLoading(true);
                        setUserPicture(url);
                        console.log('photoURL updated');
                        setLoading(false);
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

    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (!passwordRegex.test(value)) {
            setError(translation5);
        } else {
            setError('');
        }
    };



    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView keyboardShouldPersistTaps='always'>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={{margin:10}}>
                    <View style={stylesEdit.profilePicContainer}>
                        {loading ? (
                                <ActivityIndicator size="large" color={loadingColor} style={stylesEdit.profilePic} />
                            ):
                        userPicture ? <Image source={{uri: userPicture}} style={stylesEdit.profilePic} /> : <AntDesign name={"user"} size={100} color={"#041721"}  />}

                        <TouchableOpacity style={stylesEdit.editProfileBtn} onPress={() => pickImage()}>
                            <FontAwesome name={"camera"} size={18} color={"#ffffff"} />
                        </TouchableOpacity>
                    </View>
                    <View style={stylesEdit.form}>
                        <Text style={[styles.label, {color: colors.text}]}>{translation6}</Text>
                        <View style={stylesEdit.inputContainer}>
                            <TextInput
                                style={[stylesEdit.input,  {borderColor: isEditable.email ? 'red' : colors.border, borderWidth: isEditable.email ? 2 : 1, color: colors.text, backgroundColor: isEditable.email ? inputColor2 : inputColor}]}
                                placeholderTextColor={colors.text}
                                onChangeText={setEmail}
                                value={email}
                                autoCapitalize={'none'}
                                editable={isEditable.email}
                            />
                            <Feather name={'edit-3'} size={20} color={colors.text} style={stylesEdit.editButton} onPress={() => inputEditable('email')}/>
                        </View>
                        <Text style={[styles.label, {color: colors.text}]}>{translation7}</Text>
                        <View style={stylesEdit.inputContainer}>
                            <TextInput
                                style={[stylesEdit.input,  {borderColor: isEditable.username ? 'red' : colors.border, borderWidth: isEditable.username ? 2 : 1, color: colors.text, backgroundColor: isEditable.username ?
                                        inputColor2 : inputColor}]}
                                placeholderTextColor={colors.text}
                                onChangeText={setUsername}
                                value={username}
                                editable={isEditable.username}
                            />
                            <Feather name={'edit-3'} size={20} color={colors.text} style={stylesEdit.editButton} onPress={() => inputEditable('username')}/>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.label, {color: colors.text}]}>{translation8}</Text>
                            <Tooltip content={"Password must be at least 8 characters long, 1 uppercase letter and 1 number"} >
                                <Feather name={'info'} size={18} color={colors.text} style={{marginLeft: 5, marginTop:2}} />
                            </Tooltip>
                        </View>
                        <View style={stylesEdit.inputContainer}>
                            <TextInput
                                style={[stylesEdit.input,  {borderColor: isFocused.password ? 'red' : colors.border, borderWidth: isFocused.password ? 2 : 1, color: colors.text, backgroundColor: isFocused.password ?
                                        inputColor2 : inputColor}]}
                                placeholderTextColor={colors.text}
                                onChangeText={handlePasswordChange}
                                value={password}
                                secureTextEntry={isVisible.password }
                                editable={true}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => {!isFocused.password }}
                            />
                            {isVisible.password ? <Feather name={'eye-off'} size={20} color={colors.text} style={stylesEdit.editButton} onPress={() => togglePassword('password')} /> : <Feather name={'eye'} size={20} color={colors.text} style={stylesEdit.editButton} onPress={() => togglePassword('password')}/>}
                        </View>
                        <Text style={[styles.label, {color: colors.text}]}>{translation9}</Text>
                        <View style={stylesEdit.inputContainer}>
                            <TextInput
                                style={[stylesEdit.input,  {borderColor: isFocused.confPassword ? 'red' : colors.border, color: colors.text, borderWidth: isFocused.confPassword ? 2 : 1, backgroundColor: isFocused.confPassword ?
                                        inputColor2 : inputColor}]}
                                placeholderTextColor={colors.text}
                                onChangeText={setConfPassword}
                                value={confPassword}
                                secureTextEntry={isVisible.confPassword}
                                editable={true}
                                onFocus={() => handleFocus('confPassword')}
                                onBlur={() => {!isFocused.confPassword}}
                            />
                            {isVisible.confPassword ? <Feather name={'eye-off'} size={20} color={colors.text} style={stylesEdit.editButton} onPress={() => togglePassword('confPassword')} /> : <Feather name={'eye'} size={20} color={colors.text} style={stylesEdit.editButton} onPress={() => togglePassword('confPassword')}/>}
                        </View>

                        <View style={stylesEdit.inputContainer}>
                            <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                              onPress={() => updateInfos()} activeOpacity={0.5}
                            >
                                <Text style={styles.btnText}>{translation10}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}


export default EditProfile;