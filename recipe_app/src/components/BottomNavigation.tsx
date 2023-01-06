import {FC} from "react";
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
import {HomeStackList} from "../types";
import HomeStackScreen from "./HomeStackScreen";
import {StyleSheet} from "react-native";
import general from "../stylesheets/General_stylesheet";





const BottomNavigation : FC = () => {
    // const getTabBarVisible = (route: any) => {
    //     const params = route.params;
    //     if (params) {
    //         if (params.tabBarVisible === false) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle : {
                    backgroundColor : '#FAF9F6',
                    ...general.shadow
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#041721',
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#9fc131',
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    // elevation: 0,
                    borderRadius: 50,
                    ...styles.shadow,
                },
                tabBarActiveTintColor : '#fff',
                tabBarInactiveTintColor : '#666',
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                // tabBarActiveBackgroundColor : '#064851',
                // tabBarInactiveBackgroundColor : '#fefefe',
                // tabBarItemStyle: {
                //     borderRadius: 100,
                // }

            }}
        >
            {/*<Tab.Screen name="Home" component={HomeStackScreen} options={({ route }) =>({*/}
            {/*    tabBarVisible: getTabBarVisible(route),*/}
            {/*    headerShown: false,*/}
            {/*    tabBarIcon: ({color}) => (*/}
            {/*        <Feather name={"home"} size={24} color={color} />*/}
            {/*    ),*/}
            {/*})} />*/}
            <Tab.Screen name="Home" component={HomeStackScreen} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Feather name={"home"} size={24} color={color} />
                ),
            }} />
            <Tab.Screen name="Favorites" component={Favorites} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"heart"} size={24} color={color} />
                ),}
            } />
            {/*<Tab.Screen name="Search" component={Search} options={{*/}
            {/*    tabBarIcon: ({color}) => (*/}
            {/*        <FontAwesome name={"search"} size={24} color={color} />*/}
            {/*    ),}*/}
            {/*} />*/}

            {/*<Tab.Screen name="Profile" component={Profile} options={{*/}
            {/*    tabBarIcon: ({color}) => (*/}
            {/*        <Feather name={"user"} size={24} color={color} />*/}
            {/*    ),}*/}
            {/*}/>*/}
            <Tab.Screen name="Notifications" component={Notifications} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"bell"} size={24} color={color} />
                ),}
            }/>
            <Tab.Screen name="Settings" component={More} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"settings"} size={24} color={color} />
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
});

export default BottomNavigation;