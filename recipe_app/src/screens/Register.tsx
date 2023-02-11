import {useEffect, useState} from "react";
import {colors} from "react-native-elements";
import {Link, useTheme} from "@react-navigation/native";
import {TextInput, TouchableOpacity, View, Text} from "react-native";
import styles from "../stylesheets/Login_stylesheet";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/config";

const Register = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confPassword, setConfPassword] = useState('');
        const [error, setError] = useState('');
        // const [loading, setLoading] = useState(false);
        // const [loggedIn, setLoggedIn] = useState(false);
        // const history = useHistory();

        // const { currentUser } = useAuth();
        //
        // useEffect(() => {
        //
        //     if (currentUser) {
        //
        //         setLoggedIn(true);
        //
        //         setUser(currentUser);
        //
        //     }
        //
        // }, [currentUser]);

        const handleSubmit = async () => {
            try {
                if(password === confPassword) {
                    await createUserWithEmailAndPassword(auth, email, password);
                } else {
                    setError('Passwords do not match');
                }
            } catch (err) {
                setError('Failed to create an account');
            }
        }

        return (

            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={[styles.headerText, {color: colors.text}]}>Register</Text>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <TextInput
                        style={[styles.input, {color: colors.text}]}
                        placeholder="Email"
                        placeholderTextColor={colors.text}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={[styles.input, {color: colors.text}]}
                        placeholder="Password"
                        placeholderTextColor={colors.text}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={[styles.input, {color: colors.text}]}
                        placeholder="Confirm Your Password"
                        placeholderTextColor={colors.text}
                        value={password}
                        onChangeText={setConfPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                        onPress={() => handleSubmit}
                        disabled={!email || !password || !confPassword}
                    >
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, {color: colors.text}]}>Already have an account? <Link to="/login">Login</Link></Text>

                </View>

            </View>

        )

}

export default Register;