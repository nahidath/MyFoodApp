import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import Homepage from "../screens/Homepage";
import Profile from "../screens/Profile";
import Recipe from "../screens/Recipe";

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
            <HomeStack.Screen name="Recipe" component={Recipe}  options={{
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