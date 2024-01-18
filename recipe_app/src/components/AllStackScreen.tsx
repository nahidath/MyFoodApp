import {useTheme} from "@react-navigation/native";
import Homepage from "../screens/Homepage";
import Account from "../screens/Account";
import Recipe from "../screens/Recipe";
import SpotlightRecipes from "../screens/SpotlightRecipes";
import Search from "../screens/Search";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
    FavoritesStackList,
    HomeStackList,
    LoginStackList,
    MoreStackList,
    NotificationsStackList,
    AccountStackList, SearchStackList, ProfileStackList, AuthStackList
} from "../types/types";
import Login from "../screens/Login";
import Register from "../screens/Register";
import More from "../screens/More";
import NotificationSettings from "../screens/NotificationSettings";
import DisplaySettings from "../screens/DisplaySettings";
import Faq from "../screens/Faq";
import Contact from "../screens/Contact";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TermsOfUse from "../screens/TermsOfUse";
import EditProfile from "../screens/EditProfile";
import Favorites from "../screens/Favorites";
import Notifs from "../screens/Notifs";
import Cuisine from "../screens/Cuisine";
import Profile from "../screens/Profile";
import {useLanguage} from "../translation/LanguageContext";
import {useEffect, useState} from "react";
// import {CarouselRecipes} from "./CarouselRecipes";


export function HomeStackScreen () {
    const HomeStack = createNativeStackNavigator<HomeStackList>();
    const { colors } = useTheme();
    const {language,setLanguage, t} = useLanguage();
    const [translationSR, setTranslationSR] = useState("Spotlight Recipes");
    const [translationNotifs, setTranslationNotifs] = useState("Notifications");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const translationOfSR = await t(translationSR);
                    const translationOfNotifs = await t(translationNotifs);
                    setTranslationSR(translationOfSR);
                    setTranslationNotifs(translationOfNotifs);
                } catch (error) {
                    console.error('Erreur de traduction HomeStackScreen:', error);
                }
            }else{
                setTranslationSR("Spotlight Recipes");
                setTranslationNotifs("Notifications");
            }
        };
        fetchTranslation();
    }, [language]);

    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="HomePage" component={Homepage} options={{headerShown: false, animation:'none',
            }} />
            {/*<HomeStack.Screen name="Account" component={Account} options={{*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: colors.notification,*/}
            {/*    },*/}
            {/*    headerTintColor: colors.text,*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}
            {/*}} />*/}
            <HomeStack.Screen name="Recipe" component={Recipe}  options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <HomeStack.Screen name="SpotlightRecipes" component={SpotlightRecipes} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: translationSR,
            }} />
            <HomeStack.Screen name="SearchStackScreen" component={SearchStackScreen} options={{headerShown: false,                 animation:'none',
            }} />
            <HomeStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{
                headerShown: false
            }} />
            <HomeStack.Screen name="AccountStackScreen" component={AccountStackScreen} options={{
                headerShown: false
            }} />
            <HomeStack.Screen name="Cuisine" component={Cuisine} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <HomeStack.Screen name="NotificationsScreen" component={Notifs} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTitle: translationNotifs,
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </HomeStack.Navigator>
    )
}

export function LoginStackScreen () {
    const LoginStack = createNativeStackNavigator<LoginStackList>();

    const { colors } = useTheme();
    return (
        <LoginStack.Navigator >
            <LoginStack.Screen name="Login" component={Login} options={{
                // headerStyle: {
                //     backgroundColor: "#9fc131",
                // },
                // headerTitle: '',
                // headerShadowVisible: false,
                // headerTintColor: '#fff',
                headerShown: false,
                animation: 'slide_from_right',
            }} />
            {/*<LoginStack.Screen name="ResetPassword" component={ResetPassword} options={{*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: colors.notification,*/}
            {/*    },*/}
            {/*    headerTintColor: colors.text,*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}
            {/*    headerTitle: 'Reset Password',*/}
            {/*}} />*/}
            <LoginStack.Screen name="Register" component={Register} options={{
                headerStyle: {
                    backgroundColor: "#9fc131",
                },
                headerTitle: '',
                headerShadowVisible: false,
                headerTintColor: '#fff',
                animation: 'slide_from_right',
                headerTransparent: true,

            }} />
            <LoginStack.Screen name="AccountStackScreen" component={AccountStackScreen} options={{
                headerShown: false,
            }} />
            <LoginStack.Screen name={'HomeStackScreen'} component={HomeStackScreen} options={{
                headerShown: false,
            }} />
        </LoginStack.Navigator>
    )
}

export function MoreStackScreen () {
    const MoreStack = createNativeStackNavigator<MoreStackList>();

    const {colors} = useTheme();

    return (
        <MoreStack.Navigator >
            <MoreStack.Screen name="MorePage" component={More} options={{
                headerTitle: 'More',
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // headerShown: false,
            }}  />
            <MoreStack.Screen name="NotificationSettings" component={NotificationSettings} options={{
                headerTitle: 'Notifications Settings',
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // headerShadowVisible: false,
            }}  />
            <MoreStack.Screen name="DisplaySettings" component={DisplaySettings} options={{
                headerTitle: 'Display Settings',
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            {/*<MoreStack.Screen name="LanguageSettings" component={LanguageSettings}  options={{*/}
            {/*    headerTitle: 'Language',*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: '#fefefe',*/}
            {/*    },*/}
            {/*    headerTintColor: '#041721',*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}
            {/*}} />*/}
            <MoreStack.Screen name="Faq" component={Faq} options={{
                headerTitle: 'FAQ',
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },

            }} />
            <MoreStack.Screen name="Contact" component={Contact} options={{
                headerTitle: 'Contact',
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },

            }} />
            <MoreStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{
                headerTitle: 'Privacy Policy',
                headerStyle: {
                    backgroundColor:colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <MoreStack.Screen name="TermsOfUse" component={TermsOfUse} options={{
                headerTitle: 'Terms of Use',
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </MoreStack.Navigator>
    )
}

export function AccountStackScreen () {
    const AccountStack = createNativeStackNavigator<AccountStackList>();

    const { colors } = useTheme();
    const {language,setLanguage, t} = useLanguage();
    const [translationAcc, setTranslationAcc] = useState("Account");
    const [translationNS, setTranslationNS] = useState("Notifications Settings");
    const [translationContact, setTranslationContact] = useState("Contact");
    const [translationPP, setTranslationPP] = useState("Privacy Policy");
    const [translationTOU, setTranslationTOU] = useState("Terms of Use");
    const [translationAppareance, setTranslationAppareance] = useState("Appareance");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const translationOfAcc = await t(translationAcc);
                    const translationOfNS = await t(translationNS);
                    const translationOfContact = await t(translationContact);
                    const translationOfPP = await t(translationPP);
                    const translationOfTOU = await t(translationTOU);
                    const translationOfAppareance = await t(translationAppareance);
                    setTranslationAppareance(translationOfAppareance);
                    setTranslationAcc(translationOfAcc);
                    setTranslationNS(translationOfNS);
                    setTranslationContact(translationOfContact);
                    setTranslationPP(translationOfPP);
                    setTranslationTOU(translationOfTOU);
                } catch (error) {
                    console.error('Erreur de traduction AccountStackScreen:', error);
                }
            }else{
                setTranslationAcc("Account");
                setTranslationNS("Notifications Settings");
                setTranslationContact("Contact");
                setTranslationPP("Privacy Policy");
                setTranslationTOU("Terms of Use");
                setTranslationAppareance("Appareance");
            }
        };
        fetchTranslation();
    }, [language]);


    return (
        <AccountStack.Navigator >
            <AccountStack.Screen name="AccountPage" component={Account} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: translationAcc,
            }} />
            <AccountStack.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{
                headerShown: false,
            }} />
            <AccountStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{
                headerShown: false,
            }}/>
            <AccountStack.Screen name="FavoriteStackScreen" component={FavoriteStackScreen}  options={{
                headerShown: false,
            }} />
            <AccountStack.Screen name="HomeStackScreen" component={HomeStackScreen} options={{
                headerShown: false,
            }} />
            <AccountStack.Screen name="NotificationSettings" component={NotificationSettings} options={{
                headerTitle: translationNS,
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // headerShadowVisible: false,
            }}  />
            <AccountStack.Screen name="DisplaySettings" component={DisplaySettings} options={{
                headerTitle: translationAppareance,
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />

            <AccountStack.Screen name="Faq" component={Faq} options={{
                headerTitle: 'FAQ',
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },

            }} />
            <AccountStack.Screen name="Contact" component={Contact} options={{
                headerTitle: translationContact,
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },

            }} />
            <AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{
                headerTitle: translationPP,
                headerStyle: {
                    backgroundColor:colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <AccountStack.Screen name="TermsOfUse" component={TermsOfUse} options={{
                headerTitle: translationTOU,
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </AccountStack.Navigator>
    )
}
export function FavoriteStackScreen () {
    const FavoriteStack = createNativeStackNavigator<FavoritesStackList>();

    const {colors} = useTheme();

    return (
        <FavoriteStack.Navigator >
            <FavoriteStack.Screen name="Favs" component={Favorites} options={{
                // headerStyle: {
                //     backgroundColor: colors.notification,
                // },
                // headerTintColor: colors.text,
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                // },
                // headerTitle: 'Favorites',
                headerShown: false,
            }} />
            {/*<FavoriteStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{*/}
            {/*    headerShown: false,*/}
            {/*}}/>*/}
            <FavoriteStack.Screen name="Recipe" component={Recipe}  options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />

        </FavoriteStack.Navigator>
    )
}

export function NotificationsStackScreen () {
    const NotificationsStack = createNativeStackNavigator<NotificationsStackList>();

    return (
        <NotificationsStack.Navigator >
            {/*<NotificationsStack.Screen name="Notifs" component={Notifs} options={{*/}
            {/*    headerShown: false,*/}
            {/*}} />*/}
            {/*<NotificationsStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{*/}
            {/*    headerShown: false,*/}
            {/*}}/>*/}
        </NotificationsStack.Navigator>
    )
}

export function SearchStackScreen () {
    const SearchStack = createNativeStackNavigator<SearchStackList>();
    const {colors} = useTheme();

    return (
        <SearchStack.Navigator >
            <SearchStack.Screen name="SearchPage" component={Search} options={{
                // headerShown: false,
                headerStyle: {
                    backgroundColor: colors.notification,
                },
               //hide back button
               headerBackVisible: false,
                animation:'none',
            }} />
            <SearchStack.Screen name="Recipe" component={Recipe} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            {/*<SearchStack.Screen name="Carousel" component={CarouselRecipes} options={{*/}
            {/*    headerShown: false,*/}
            {/*}} />*/}

        </SearchStack.Navigator>
    )
}

export function ProfileStackScreen () {
    const ProfileStack = createNativeStackNavigator<ProfileStackList>();
    const {colors} = useTheme();
    const {language,setLanguage, t} = useLanguage();
    const [translationEP, setTranslationEP] = useState("Edit Profile");
    const [translationProfile, setTranslationProfile] = useState("Profile");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const translationOfEP = await t(translationEP);
                    const translationOfProfile = await t(translationProfile);
                    setTranslationEP(translationOfEP);
                    setTranslationProfile(translationOfProfile);
                } catch (error) {
                    console.error('Erreur de traduction ProfileStackScreen:', error);
                }
            }else{
                setTranslationEP("Edit Profile");
                setTranslationProfile("Profile");
            }
        };
        fetchTranslation();
    }, [language]);


    return (
        <ProfileStack.Navigator >
            <ProfileStack.Screen name="ProfilePage" component={Profile} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: translationProfile,
            }} />
            <ProfileStack.Screen name="EditProfile" component={EditProfile} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: translationEP,
            }} />
        </ProfileStack.Navigator>
    )
}

export function AuthStack() {
    const AuthStack = createNativeStackNavigator<AuthStackList>();
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="LoginStackScreen" component={LoginStackScreen} />
            {/*<AuthStack.Screen name="Register" component={Register} />*/}
        </AuthStack.Navigator>
    );
}