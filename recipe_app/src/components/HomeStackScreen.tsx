import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import Homepage from "../screens/Homepage";
import Notifications from "../screens/Notifications";

const HomeStack = createNativeStackNavigator<HomeStackList>();
export default function HomeStackScreen () {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="HomePage" component={Homepage} options={{headerShown: false}} />
            <HomeStack.Screen name="Notifications" component={Notifications} options={{
                headerStyle: {
                    backgroundColor: '#8cae00',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </HomeStack.Navigator>
    )
}