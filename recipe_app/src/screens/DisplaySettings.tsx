import {View, Text, Switch, TouchableOpacity, ImageBackground, TouchableWithoutFeedback} from "react-native";
import styles from "../stylesheets/DS_stylesheet";
import general from "../stylesheets/General_stylesheet";
import React, {useEffect, useState} from "react";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import {ThemeContext} from "../../App";
import {useTheme} from "@react-navigation/native";
import {color} from "react-native-elements/dist/helpers";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";

interface DisplaySettingsProps {
    themeContext: any;
}

const DisplaySettings = () => {
    const {translationFunc} = useTranslation();

    const {language,setLanguage, t} = useLanguage();
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [translation1, setTranslation1] = useState<string>("Application theme")
    const [translation2, setTranslation2] = useState<string>("Selecting a particular option will change the appearance (coloring) of the application according to your preferences.")
    const [translation3, setTranslation3] = useState<string>("Select a theme")
    const [translation4, setTranslation4] = useState<string>("Light")
    const [translation5, setTranslation5] = useState<string>("Dark")


    // @ts-ignore
    const { setTheme, theme } = React.useContext(ThemeContext);

    const toggleSwitchDarkMode = () => {
        setIsEnabled(previousState => !previousState);
        setTheme(theme === 'Light' ? 'Dark' : 'Light');
    };

    const {colors} = useTheme();
    const theme2 = useTheme();

    useEffect(() => {
        if (theme2.dark) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    }, [theme2.dark]);

    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                }catch (error) {
                    console.error('Erreur de traduction DisplaySettings:', error);
                }
            }else {
                setTranslation1("Application theme");
                setTranslation2("Selecting a particular option will change the appearance (coloring) of the application according to your preferences.");
                setTranslation3("Select a theme");
                setTranslation4("Light");
                setTranslation5("Dark");
            }
        }
        fetchTranslation();
    }, [language]);


    return (
        <View style={[styles.container, general.container, {backgroundColor:colors.background}] }>
            {theme2.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={{margin: 10}}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, {color: colors.text}]}>{translation1}</Text>
                    <Text style={styles.subTitle}>{translation2}</Text>
                </View>
                <Text style={[styles.textTitle, {color: colors.text}]}>{translation3}</Text>
                <View style={styles.themeCardContainer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column'}}>
                            <TouchableOpacity style={[styles.themeCard, general.shadow, {borderWidth : !theme2.dark ? 1 : 0, borderColor: !theme2.dark ? "#ccc" : "transparent", borderRadius: 10, backgroundColor : colors.background} ]} onPress={() => setTheme('Light')} activeOpacity={0.3}>
                                <ImageBackground source={require('../../assets/lightTheme.png')} style={[styles.themeImage, {height: !theme2.dark ? 285 : 290}]} resizeMode="contain"/>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center', padding:10}}>
                                <Text style={[styles.themeTitle, {color: colors.text, fontSize: !theme2.dark ? 20: 15}]}>{translation4} {!theme2.dark ? <FontAwesome name={"check"} size={20} color={colors.text} /> : null}</Text>

                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <TouchableOpacity style={[styles.themeCard, general.shadowDark,  {borderWidth : theme2.dark ? 1 : 0, borderColor: theme2.dark ? "#ccc" : "transparent", borderRadius: 10, backgroundColor : colors.background}]} onPress={() => setTheme('Dark')} activeOpacity={0.3}>
                                <ImageBackground source={require('../../assets/darkTheme.png')} style={[styles.themeImage, {height: theme2.dark ? 280 : 290}]} resizeMode="contain" />
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center', padding:10}}>
                                <Text style={[styles.themeTitle, {color: colors.text, fontSize: theme2.dark ? 20: 15}]}>{translation5} {theme2.dark ? <FontAwesome name={"check"} size={20} color={colors.text} /> : null}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default DisplaySettings;