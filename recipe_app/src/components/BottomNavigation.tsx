import {FC, useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Homepage from "../screens/Homepage";
import Notifications from "../screens/Notifications";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
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
    FavoriteStackScreen,
    HomeStackScreen,
    MoreStackScreen,
    NotificationsStackScreen,
    SearchStackScreen
} from "./AllStackScreen";
import hairlineWidth = StyleSheet.hairlineWidth;




const BottomNavigation : FC = () => {

    const Tab = createBottomTabNavigator();
    const colors = useTheme().colors;
    const theme = useTheme();
    const roundBckColor = theme.dark ? "#9fc131" : "#FAF9F6";
    const iconColor = theme.dark ? "#FAF9F6" : "#9fc131";

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
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        backgroundColor: colors.primary,
                        height: 60,
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
                tabBarIcon: ({color}) => (
                    <Feather name={"home"} size={24} color={color} />
                ),
            }} />
            <Tab.Screen name="Favorites" component={FavoriteStackScreen} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"heart"} size={24} color={color} />
                ),}
            } />
            <Tab.Screen name="Search" component={SearchStackScreen} options={{
                headerShown: false,
                tabBarLabel:'',
                tabBarIcon: () => (
                    <FontAwesome name={"search"} size={40} color={iconColor} style={{...styles.roundTabButton, backgroundColor: roundBckColor}}/>

                ),
            }
            } />

            {/*<Tab.Screen name="Profile" component={Profile} options={{*/}
            {/*    tabBarIcon: ({color}) => (*/}
            {/*        <Feather name={"user"} size={24} color={color} />*/}
            {/*    ),}*/}
            {/*}/>*/}
            <Tab.Screen name="Notifications" component={NotificationsStackScreen} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"bell"} size={24} color={color} />
                ),}
            }/>
            <Tab.Screen name="More" component={MoreStackScreen} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Feather name={"more-horizontal"} size={24} color={color} />
                ),}
            }/>
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
        borderRadius: 30,
        padding: 5,
        height: 55,
        width: 55,
        // backgroundColor: 'white',
        textAlign: 'center',
        borderColor: '#9fc131',
        borderWidth: hairlineWidth,

    }
});

export default BottomNavigation;