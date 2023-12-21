import {
    Button,
    Pressable,
    TextInput,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import styles from "../stylesheets/Contact_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import emailjs from '@emailjs/browser';
// @ts-ignore
import {REACT_APP_EMAIL_PUBLIC_KEY, REACT_APP_SERVICE_EMAIL} from "@env";
import {useTheme} from "@react-navigation/native";
import {useLanguage} from "../translation/LanguageContext";
import {useTranslation} from "../translation/TranslationFunc";




const Contact = () => {
    const {translationFunc} = useTranslation();


    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const emailPublicKey : string | undefined = REACT_APP_EMAIL_PUBLIC_KEY;
    const emailService : string | undefined = REACT_APP_SERVICE_EMAIL;
    const templateParams  = {
        from_name: name,
        email: email,
        message: message,
    }

    const {colors} = useTheme();
    const theme = useTheme();
    const {language,setLanguage, t} = useLanguage();
    const [translation1, setTranslation1] = useState("A problem ? Any suggestions ? Let's us know !!");
    const [translation2, setTranslation2] = useState("We will answer you as soon as possible");
    const [translation3, setTranslation3] = useState("Name");
    const [translation4, setTranslation4] = useState("Email");
    const [translation5, setTranslation5] = useState("Message");
    const [translation6, setTranslation6] = useState("Send");
    const [translation7, setTranslation7] = useState("Email sent");
    const [translation8, setTranslation8] = useState("Thank you for your message, your request has been sent");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6, translation7, translation8])

                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                    setTranslation6(elementsTranslated[5]);
                    setTranslation7(elementsTranslated[6]);
                    setTranslation8(elementsTranslated[7]);
                } catch (error) {
                    console.error('Erreur de traduction contact:', error);
                }

            }else {
                setTranslation1("A problem ? Any suggestions ? Let's us know !!");
                setTranslation2("We will answer you as soon as possible");
                setTranslation3("Name");
                setTranslation4("Email");
                setTranslation5("Message");
                setTranslation6("Send");
                setTranslation7("Email sent");
                setTranslation8("Thank you for your message, your request has been sent");
            }
        }
        fetchTranslation();
    }, [language]);



    const sendMail = () => {

        if (emailPublicKey != null && emailService != null) {
            emailjs.send(emailService, 'template_px1octd', templateParams, emailPublicKey)
                .then((result) => {
                    alert();
                    //clear input
                    setName('');
                    setEmail('');
                    setMessage('');
                }, (error) => {
                    console.log(error.text);
                });
        }
    };

    //Alert when email is sent
    const alert = () => {
        Alert.alert(
            translation7 + " 🚀",
            translation8,
            [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed")
                }
            ]
        );
    }

    const colorSpec = theme.dark ? '#252525' : '#041721';



    return (
        <View style={[styles.container, general.container, {backgroundColor:colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView>
                <Text style={[styles.headerText, {color: colors.text}]}>{translation1}</Text>
                <Text style={[styles.headerText, {color: colors.text}]}> {translation2}</Text>
                <View style={styles.form}>
                    <TextInput style={[styles.input, {borderColor: colors.border, color: colors.text}]}   placeholderTextColor={colors.text} placeholder={translation3} onChangeText={value => setName(value)} value={name}/>
                    <TextInput style={[styles.input, {borderColor: colors.border, color:colors.text}]}   placeholderTextColor={colors.text} placeholder={translation4} onChangeText={value => setEmail(value)} value={email}/>
                    <TextInput
                        style={[styles.inputMsg, {borderColor: colors.border, color: colors.text}]}
                        placeholder={translation5}
                        placeholderTextColor={colors.text}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={value => setMessage(value)}
                        value={message}
                    />
                    <TouchableOpacity style={[styles.sendBtn, {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() => sendMail()} activeOpacity={0.5}>
                       <Text style={styles.btnText}>{translation6}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Contact;