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
import React, {useRef, useState} from "react";
import styles from "../stylesheets/Contact_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import emailjs from '@emailjs/browser';
// @ts-ignore
import {REACT_APP_EMAIL_PUBLIC_KEY, REACT_APP_SERVICE_EMAIL} from "@env";
import {useTheme} from "@react-navigation/native";




const Contact = () => {

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
            "Email sent 🚀",
            "Thank you for your message, your request has been sent",
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
                <Text style={[styles.headerText, {color: colors.text}]}> A problem ? Any suggestions ? Let's us know !!</Text>
                <Text style={[styles.headerText, {color: colors.text}]}> We will answer you as soon as possible</Text>
                <View style={styles.form}>
                    <TextInput style={[styles.input, {borderColor: colors.border, color: colors.text}]}   placeholderTextColor={colors.text} placeholder="Name" onChangeText={value => setName(value)} value={name}/>
                    <TextInput style={[styles.input, {borderColor: colors.border, color:colors.text}]}   placeholderTextColor={colors.text} placeholder="Email" onChangeText={value => setEmail(value)} value={email}/>
                    <TextInput
                        style={[styles.inputMsg, {borderColor: colors.border, color: colors.text}]}
                        placeholder="Message"
                        placeholderTextColor={colors.text}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={value => setMessage(value)}
                        value={message}
                    />
                    <TouchableOpacity style={[styles.sendBtn, {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() => sendMail()}>
                       <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Contact;