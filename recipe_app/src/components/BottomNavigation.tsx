import {FC} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Homepage from "../screens/Homepage";
import Notifications from "../screens/Notifications";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Favorites from "../screens/Favorites";
import Feather from "react-native-vector-icons/Feather";


const BottomNavigation : FC = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#F5F9FA',
                    height: 87,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarActiveTintColor : '#E19271',
                tabBarInactiveTintColor : '#BDBDBD',
            }}
        >
            <Tab.Screen name="Home" component={Homepage} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"home"} size={24} color={color} />
                ),}
            } />
            <Tab.Screen name="Notifications" component={Notifications} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"bell"} size={24} color={color} />
                ),}
            }/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"search"} size={24} color={color} />
                ),}
            } />
            <Tab.Screen name="Favorites" component={Favorites} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"heart"} size={24} color={color} />
                ),}
            } />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({color}) => (
                    <Feather name={"user"} size={24} color={color} />
                ),}
            }/>
        </Tab.Navigator>

    );
};

export default BottomNavigation;