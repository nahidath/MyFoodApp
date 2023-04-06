import React, {Dispatch, SetStateAction, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebase/config";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Login_stylesheet";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "./StatusBarStyle";

interface ResetPasswordProps {
    navigation: any;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}

export function ResetPassword ({navigation, modalVisible, setModalVisible}: ResetPasswordProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';

    const handleSubmit = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setSubmitted(true);
            setError('');
        } catch (e) {
            // @ts-ignore
            if (e.code === 'auth/user-not-found') {
                setError('User not found with this email');
            } else {
                setError('There was a problem with your request');
            }
        }
    }

    return (
        // <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
        //     {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
        //     <ScrollView keyboardShouldPersistTaps='always'>
        //         {error && <Text style={styles.error}>{error}</Text>}
        //         {submitted ? (
        //             <Text>Please check your email for a reset password link.</Text>
        //         ) : (
        //             // <View style={styles.form}>
        //             //     <Text style={styles.text}>Enter your email address below and we will send you a link to reset your password.</Text>
        //             //     <TextInput
        //             //         style={styles.input}
        //             //         placeholder="Email"
        //             //         placeholderTextColor={colors.text}
        //             //         onChangeText={setEmail}
        //             //         value={email}
        //             //     />
        //             //     <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={handleSubmit} disabled={!email}>
        //             //         <Text style={styles.btnText}>Reset Password</Text>
        //             //     </TouchableOpacity>
        //             //
        //             // </View>
        //
        //         )}
        //     </ScrollView>
        // </View>
        <Modal visible={modalVisible} animationType='slide'>

        </Modal>
    );
}