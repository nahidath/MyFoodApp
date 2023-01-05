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




const BottomNavigation : FC = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle : {
                    backgroundColor : '#064851',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: '#fefefe',
                    height: 56,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderTopRightRadius: 20,
                },
                tabBarActiveTintColor : '#fdc727',
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
            <Tab.Screen name="Home" component={HomeStackScreen} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Feather name={"home"} size={24} color={color} />
                ),}
            } />
            <Tab.Screen name="Favorites" component={Favorites} options={{
                tabBarIcon: ({color}) => (
                    <FontAwesome name={"heart"} size={24} color={color} />
                ),}
            } />
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({color}) => (
                    <FontAwesome name={"search"} size={24} color={color} />
                ),}
            } />

            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"user"} size={24} color={color} />
                ),}
            }/>
            <Tab.Screen name="More" component={More} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"more-horizontal"} size={24} color={color} />
                ),}
            }/>
        </Tab.Navigator>

    );
};

export default BottomNavigation;