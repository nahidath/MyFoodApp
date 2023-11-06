import React, {FC, useState} from "react";
import {View, Text, TouchableOpacity, ScrollView, Modal, FlatList} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../stylesheets/More_stylesheet";
import { useFonts } from 'expo-font';
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import {MoreStackList} from "../types/types";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {useNavigation, useTheme} from "@react-navigation/native";
import Separator from "../components/Separator";
import {useLanguage} from "../translation/LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";




// @ts-ignore
type MoreScreenProps = MyStackNavigationProp<MoreStackList, 'MorePage'>;

const More : () => Promise<JSX.Element> = () => {
    const navigation = useNavigation<MoreScreenProps>();
    const [modalVisible, setModalVisible] = useState(false);
    const {setLanguage, t} = useLanguage();

    // const [fontsLoaded] = useFonts({
    //     // 'PlusJakartaSans': require('../../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
    //     // 'Nunito': require('../../assets/fonts/Nunito-VariableFont_wght.ttf'),
    //     'Poppins': require('../../assets/fonts/Poppins-Regular.ttf'),
    // });
    const {colors} = useTheme();
    const theme = useTheme();

    const changeLanguage = async (newLang : string) => {
        setLanguage(newLang);
        await AsyncStorage.setItem('lang', newLang);
        await t('reload');
    }

    const renderTranslatedText = async () => {

        return (
            <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
                {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
                <ScrollView>
                    <View>
                        <Text style={[styles.textTitle, {color: colors.text}]}>{await t('Settings')}</Text>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('NotificationSettings')}>
                            <Feather name={"bell"} size={22} color={colors.text} />
                            {/*<Text style={[styles.btnStyleText, {fontFamily: 'Poppins'}]}>Notifs</Text>*/}
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>{await t('Notifications')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('DisplaySettings')}>
                            <Feather name={"monitor"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>{await t('Display settings')}</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={[styles.modalView, general.shadow, {backgroundColor: colors.notification} ]}>
                                    <Text style={[styles.modalText, {color: colors.text}]}>{await t('Choose your language')}</Text>
                                    <Separator />
                                    <TouchableOpacity style={styles.languageBtn} onPress={() => changeLanguage('en')}>
                                        <Text style={[styles.languageBtnText, {color: colors.text}]}>{await t('English')}</Text>
                                    </TouchableOpacity>
                                    <Separator />
                                    <TouchableOpacity style={styles.languageBtn} onPress={() => changeLanguage('fr')}>
                                        <Text style={[styles.languageBtnText, {color: colors.text}]}>{await t('French')}</Text>
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
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => setModalVisible(true)}>
                            <Feather name={"globe"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>{await t('Languages')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={[styles.textTitle, {color: colors.text}]}>Help</Text>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('Faq')}>
                            <Feather name={"help-circle"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>FAQ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('Contact')}>
                            <Feather name={"mail"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>Contact</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.textTitle, {color: colors.text}]}>{await t('Loving MyRecipeApp ?')}</Text>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} >
                            <FontAwesome name={"star"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>{await t('Rate us')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]}>
                            <FontAwesome name={"share"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>{await t('Share the application')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.textTitle, {color:colors.text}]}>{await t('About')}</Text>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('PrivacyPolicy')}>
                            <Feather name={"shield"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>{await t('Privacy Policy')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('TermsOfUse')}>
                            <FontAwesome name={"file"} size={22} color={colors.text} />
                            <Text style={[styles.btnStyleText, {color: colors.text}]}>{await t('Terms of use')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        )
    }

    return renderTranslatedText();
}
export default More;