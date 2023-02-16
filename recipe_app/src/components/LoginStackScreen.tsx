import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginStackList} from "../types/types";
import Login, {ResetPassword} from "../screens/Login";
import {useTheme} from "@react-navigation/native";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import ProfileStackScreen from "./ProfileStackScreen";


const LoginStack = createNativeStackNavigator<LoginStackList>();

export default function LoginStackScreen () {
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
            <LoginStack.Screen name="ResetPassword" component={ResetPassword} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: 'Reset Password',
            }} />
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
        </LoginStack.Navigator>
    )
}