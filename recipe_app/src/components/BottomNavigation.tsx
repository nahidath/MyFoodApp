import {FC, useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Homepage from "../screens/Homepage";
import Notifs from "../screens/Notifs";
import Search from "../screens/Search";
import Account from "../screens/Account";
import Favorites from "../screens/Favorites";
import Feather from "react-native-vector-icons/Feather";
import More from "../screens/More";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Icon} from "react-native-elements";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeStackList} from "../types/types";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity} from "react-native";
import general from "../stylesheets/General_stylesheet";
import {useNavigation} from "@react-navigation/native";
import {useTheme} from '@react-navigation/native';
import {
    AccountStackScreen,
    FavoriteStackScreen,
    HomeStackScreen,
    MoreStackScreen,
    NotificationsStackScreen,
    SearchStackScreen
} from "./AllStackScreen";
import hairlineWidth = StyleSheet.hairlineWidth;
import {translateText} from "../translation/TranslationService";
import {useLanguage} from "../translation/LanguageContext";




const BottomNavigation : FC = () => {

    const Tab = createBottomTabNavigator();
    const colors = useTheme().colors;
    const theme = useTheme();
    const roundBckColor = theme.dark ? "#9fc131" : "#FAF9F6";
    const iconColor = theme.dark ? "#FAF9F6" : "#9fc131";
    const [translationOfHome, setTranslationofHome] = useState("Home");
    const [translationOfSearch, setTranslationofSearch] = useState("Search");
    const [translationOfFavorites, setTranslationofFavorites] = useState("Favorites");
    const [translationOfAccount, setTranslationofAccount] = useState("Account");
    const {language,setLanguage, t} = useLanguage();


    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const translationOfHome = await t("Home");
                    const translationOfSearch = await t("Search");
                    const translationOfFavorites = await t("Favorites");
                    const translationOfAccount = await t("Account");
                    setTranslationofHome(translationOfHome);
                    setTranslationofSearch(translationOfSearch);
                    setTranslationofFavorites(translationOfFavorites);
                    setTranslationofAccount(translationOfAccount);
                } catch (error) {
                    console.error('Erreur de traduction bottomNavigation:', error);
                }

            }else {
                setTranslationofHome("Home");
                setTranslationofSearch("Search");
                setTranslationofFavorites("Favorites");
                setTranslationofAccount("Account");
            }
        }
        fetchTranslation();
    }, [language]);

    return (
        <Tab.Navigator
            initialRouteName="Home"
                screenOptions= {{
                    headerStyle: {
                        backgroundColor: colors.notification,
                        ...general.shadow
                    },
                    headerTintColor: colors.card,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: colors.text,
                    },
                    // tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: colors.primary,
                        height: 56,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 0,
                        borderTopColor: "#9fc131",
                    },
                    tabBarActiveTintColor: colors.card,
                    tabBarInactiveTintColor: '#666',
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },

            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{
                headerShown: false,
                tabBarLabel: translationOfHome,
                tabBarIcon: ({color}) => (
                    <Feather name={"home"} size={24} color={color} />
                ),
            }} />

            {/*<Tab.Screen name="Notifs" component={NotificationsStackScreen} options={{*/}
            {/*    tabBarIcon: ({color}) => (*/}
            {/*        <Feather name={"bell"} size={24} color={color} />*/}
            {/*    ),}*/}
            {/*}/>*/}
            <Tab.Screen name="Search" component={SearchStackScreen} options={{
                headerShown: false,
                tabBarLabel: translationOfSearch,
                tabBarIcon: ({color}) => (
                    // <FontAwesome name={"search"} size={30} color={iconColor} style={{...styles.roundTabButton, backgroundColor: roundBckColor, ...styles.shadow}}/>
                    <Feather name={"search"} size={24} color={color} />

                ),
            }
            } />
            <Tab.Screen name="Favorites" component={FavoriteStackScreen} options={{
                tabBarLabel: translationOfFavorites,
                tabBarIcon: ({color}) => (
                    <Feather name={"heart"} size={24} color={color} />
                ),}
            } />

            <Tab.Screen name="Account" component={AccountStackScreen} options={{
                headerShown: false,
                tabBarLabel: translationOfAccount,
                tabBarIcon: ({color}) => (
                    <Feather name={"user"} size={24} color={color} />
                ),}
            }/>

            {/*<Tab.Screen name="More" component={MoreStackScreen} options={{*/}
            {/*    headerShown: false,*/}
            {/*    tabBarIcon: ({color}) => (*/}
            {/*        <Feather name={"more-horizontal"} size={24} color={color} />*/}
            {/*    ),}*/}
            {/*}/>*/}
        </Tab.Navigator>

    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    roundTabButton: {
        borderRadius: 50,
        padding: 5,
        height: 50,
        width: 50,
        top: 7,
        // backgroundColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        // bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#9fc131',
        borderWidth: hairlineWidth,

    }
});

export default BottomNavigation;