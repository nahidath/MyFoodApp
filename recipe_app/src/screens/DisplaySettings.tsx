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

interface DisplaySettingsProps {
    themeContext: any;
}

const DisplaySettings = () => {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);

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


    return (
        <View style={[styles.container, general.container, {backgroundColor:colors.background}] }>
            {theme2.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={{margin: 10}}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, {color: colors.text}]}>Application theme</Text>
                    <Text style={styles.subTitle}>Selecting a particular option will change the appearance (coloring) of the application according to your preferences.</Text>
                </View>
                {/*<View style={styles.switchContainer}>*/}
                {/*    <View style={[styles.pusherContainer, general.shadow, {backgroundColor: colors.notification}]}>*/}
                {/*        <Text style={[styles.textTitle, {color: colors.text}]}>Select a theme</Text>*/}
                {/*        <Switch*/}
                {/*            trackColor={{false: '#767577', true: '#b1dad6'}}*/}
                {/*            thumbColor={isEnabled ? '#008375' : '#f4f3f4'}*/}
                {/*            ios_backgroundColor="#3e3e3e"*/}
                {/*            onValueChange={toggleSwitchDarkMode}*/}
                {/*            value={isEnabled}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*</View>*/}
                <Text style={[styles.textTitle, {color: colors.text}]}>Select a theme</Text>

                <View style={styles.themeCardContainer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column'}}>
                            <TouchableOpacity style={[styles.themeCard, general.shadow, {borderWidth : !theme2.dark ? 1 : 0, borderColor: !theme2.dark ? "#ccc" : "transparent", borderRadius: 10, backgroundColor : colors.background} ]} onPress={() => setTheme('Light')} activeOpacity={0.3}>
                                <ImageBackground source={require('../../assets/lightTheme.png')} style={[styles.themeImage, {height: !theme2.dark ? 285 : 290}]} resizeMode="contain"/>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center', padding:10}}>
                                <Text style={[styles.themeTitle, {color: colors.text, fontSize: !theme2.dark ? 20: 15}]}>Light {!theme2.dark ? <FontAwesome name={"check"} size={20} color={colors.text} /> : null}</Text>

                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <TouchableOpacity style={[styles.themeCard, general.shadowDark,  {borderWidth : theme2.dark ? 1 : 0, borderColor: theme2.dark ? "#ccc" : "transparent", borderRadius: 10, backgroundColor : colors.background}]} onPress={() => setTheme('Dark')} activeOpacity={0.3}>
                                <ImageBackground source={require('../../assets/darkTheme.png')} style={[styles.themeImage, {height: theme2.dark ? 280 : 290}]} resizeMode="contain" />
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center', padding:10}}>
                                <Text style={[styles.themeTitle, {color: colors.text, fontSize: theme2.dark ? 20: 15}]}>Dark {theme2.dark ? <FontAwesome name={"check"} size={20} color={colors.text} /> : null}</Text>
                            </View>
                        </View>
                    </View>
                    {/*<View style={styles.themeCardTitleContainer}>*/}
                    {/*    <Text style={[styles.themeTitle, {color: colors.text}]}>Light</Text>*/}
                    {/*    <Text style={[styles.themeTitle, {color: colors.text}]}>Dark</Text>*/}
                    {/*</View>*/}
                </View>
            </View>
        </View>
    );
};
export default DisplaySettings;