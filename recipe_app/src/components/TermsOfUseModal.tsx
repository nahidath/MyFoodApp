import styles from "../stylesheets/Login_stylesheet";
import {ScrollView, Text, TouchableHighlight, View} from "react-native";
import React, {Dispatch, SetStateAction} from "react";
import TermsOfUse from "../screens/TermsOfUse";


interface TOUMProps {
    setModalVisible :  Dispatch<SetStateAction<boolean>>;
    modalVisible :  boolean;
    isRegisterPage : boolean;
}

const TermsOfUseModal = ({setModalVisible, modalVisible, isRegisterPage} : TOUMProps) => {
    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TermsOfUse isRegisterPage={isRegisterPage}/>
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

export default TermsOfUseModal;