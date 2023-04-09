import {useTheme} from "@react-navigation/native";
import Homepage from "../screens/Homepage";
import Profile from "../screens/Profile";
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
    ProfileStackList, SearchStackList
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
import Notifications from "../screens/Notifications";
import Cuisine from "../screens/Cuisine";


export function HomeStackScreen () {
    const HomeStack = createNativeStackNavigator<HomeStackList>();
    const { colors } = useTheme();
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="HomePage" component={Homepage} options={{headerShown: false}} />
            {/*<HomeStack.Screen name="Profile" component={Profile} options={{*/}
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
                headerTitle: 'Spotlight Recipes',
            }} />
            <HomeStack.Screen name="SearchStackScreen" component={SearchStackScreen} options={{headerShown: false}} />
            <HomeStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{
                headerShown: false
            }} />
            <HomeStack.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{
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
            <HomeStack.Screen name="NotifScreen" component={NotificationsStackScreen} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTitle: 'Notifications',
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
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
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
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <LoginStack.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{
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

export function ProfileStackScreen () {
    const ProfilStack = createNativeStackNavigator<ProfileStackList>();

    const { colors } = useTheme();
    return (
        <ProfilStack.Navigator >
            <ProfilStack.Screen name="ProfilePage" component={Profile} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: 'Profile',
            }} />
            <ProfilStack.Screen name="EditProfile" component={EditProfile} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: 'Edit Profile',
            }} />
            <ProfilStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{
                headerShown: false,
            }}/>
            <ProfilStack.Screen name="FavoritesRecipesUser" component={FavoriteStackScreen}  options={{
                headerShown: false,
            }} />
            <ProfilStack.Screen name="HomeStackScreen" component={HomeStackScreen} options={{
                headerShown: false,
            }} />
            {/*<ProfilStack.Screen name="LoginPage" component={Login} options={{*/}
            {/*    headerShown: false,*/}
            {/*}} />*/}
        </ProfilStack.Navigator>
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
            <NotificationsStack.Screen name="Notifs" component={Notifications} options={{
                headerShown: false,
            }} />
            <NotificationsStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{
                headerShown: false,
            }}/>
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

        </SearchStack.Navigator>
    )
}