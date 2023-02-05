import {Button, Pressable, TextInput, View, Text, TouchableHighlight, TouchableOpacity, Alert} from "react-native";
import React, {useRef, useState} from "react";
import styles from "../stylesheets/Contact_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import emailjs from '@emailjs/browser';
// @ts-ignore
import {REACT_APP_EMAIL_PUBLIC_KEY, REACT_APP_SERVICE_EMAIL} from "@env";




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

    console.log(emailPublicKey);
    // console.log(emailService);

    const sendMail = () => {

        if (emailPublicKey != null && emailService != null) {
            emailjs.send(emailService, 'template_px1octd', templateParams, emailPublicKey)
                .then((result) => {
                    alert();
                    //clear input
                    setName('');
                    setEmail('');
                    setMessage('');
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        }
    };

    //Alert when email is sent
    const alert = () => {
        Alert.alert(
            "Email sent",
            "Thank you for your message, your request has been sent",
            [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed")
                }
            ]
        );
    }



    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
            <View style={styles.form}>
                <Text style={styles.headerText}> A problem ? Any suggestions ? Let's us know !!</Text>
                <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name}/>
                <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>
                <TextInput
                    style={styles.inputMsg}
                    placeholder="Message"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setMessage}
                    value={message}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={() => sendMail()}>
                   <Text style={styles.btnText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Contact;