import React, {Dispatch, SetStateAction} from "react";
import {Pressable, ScrollView, Text, TouchableHighlight, View} from "react-native";
import styles from "../stylesheets/Login_stylesheet";
import PrivacyPolicy from "../screens/PrivacyPolicy";


interface PPMProps {
    setModalVisible :  Dispatch<SetStateAction<boolean>>;
    modalVisible :  boolean;
    isRegisterPage : boolean;
}
const PrivacyPolicyModal = ({setModalVisible, modalVisible, isRegisterPage} :  PPMProps) => {
    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <PrivacyPolicy isRegisterPage={isRegisterPage}/>
                <TouchableHighlight
                    style={styles.closeButton}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default PrivacyPolicyModal;