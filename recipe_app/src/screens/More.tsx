import React, {FC, useState} from "react";
import {View, Text, TouchableOpacity, ScrollView, Modal, FlatList} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../stylesheets/More_stylesheet";
import { useFonts } from 'expo-font';
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import {MoreStackList} from "../types";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {useNavigation} from "@react-navigation/native";
import Separator from "../components/Separator";



// @ts-ignore
type MoreScreenProps = MyStackNavigationProp<MoreStackList, 'MorePage'>;

const More : FC = () => {
    const navigation = useNavigation<MoreScreenProps>();
    const [modalVisible, setModalVisible] = useState(false);

    // const [fontsLoaded] = useFonts({
    //     // 'PlusJakartaSans': require('../../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
    //     // 'Nunito': require('../../assets/fonts/Nunito-VariableFont_wght.ttf'),
    //     'Poppins': require('../../assets/fonts/Poppins-Regular.ttf'),
    // });

    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView>
                <View>
                    <Text style={styles.textTitle}>Settings</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => navigation.push('NotificationSettings')}>
                        <Feather name={"bell"} size={22} color={"#666666"} />
                        {/*<Text style={[styles.btnStyleText, {fontFamily: 'Poppins'}]}>Notifications</Text>*/}
                        <Text style={styles.btnStyleText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => navigation.push('DisplaySettings')}>
                        <Feather name={"monitor"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Display Settings</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, general.shadow]}>
                                <Text style={styles.modalText}>Choose your language</Text>
                                <Separator />
                                <TouchableOpacity style={styles.languageBtn}>
                                    <Text style={styles.languageBtnText}>English</Text>
                                </TouchableOpacity>
                                <Separator />
                                <TouchableOpacity style={styles.languageBtn}>
                                    <Text style={styles.languageBtnText}>French</Text>
                                </TouchableOpacity>

                                {/*<TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => setModalVisible(!modalVisible)}>*/}
                                {/*    <Feather name={"x"} size={22} color={"#666666"} />*/}
                                {/*    <Text style={styles.btnStyleText}>Close</Text>*/}
                                {/*</TouchableOpacity>*/}
                                {/*<Pressable*/}
                                {/*    style={[styles.button, styles.buttonClose]}*/}
                                {/*    onPress={() => setModalVisible(!modalVisible)}>*/}
                                {/*    <Text style={styles.textStyle}>Hide Modal</Text>*/}
                                {/*</Pressable>*/}
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => setModalVisible(true)}>
                        <Feather name={"globe"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Languages</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <Text style={styles.textTitle}>Help</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => navigation.push('Faq')}>
                        <Feather name={"help-circle"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => navigation.push('Contact')}>
                        <Feather name={"mail"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Contact</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textTitle}>Loving MyRecipeApp ?</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} >
                        <FontAwesome name={"star"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Rate us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <FontAwesome name={"share"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Share the application</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textTitle}>About</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => navigation.push('PrivacyPolicy')}>
                        <Feather name={"shield"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]} onPress={() => navigation.push('TermsOfUse')}>
                        <FontAwesome name={"file"} size={22} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Terms of use</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}
export default More;