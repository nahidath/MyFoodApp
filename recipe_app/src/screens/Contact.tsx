import {Button, Pressable, TextInput, View, Text} from "react-native";
import {useState} from "react";
import styles from "../stylesheets/Contact_stylesheet";


const Contact = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}> A problem ? Any suggestion ? Let's us know !!</Text>
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name}/>
                <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setMessage}
                    value={message}
                />
                <Pressable style={styles.sendBtn} onPress={() => console.log(name, email, message)}>
                    <Button title="Send" color="#fff"/>
                </Pressable>
            </View>
        </View>
    );
};

export default Contact;