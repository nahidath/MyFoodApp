import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import Homepage from "../screens/Homepage";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const HomeStack = createNativeStackNavigator<HomeStackList>();
export default function HomeStackScreen () {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="HomePage" component={Homepage} options={{headerShown: false}} />
            <HomeStack.Screen name="Profile" component={Profile} options={{
                headerStyle: {
                    backgroundColor: '#fefefe',
                },
                headerTintColor: '#041721',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </HomeStack.Navigator>
    )
}