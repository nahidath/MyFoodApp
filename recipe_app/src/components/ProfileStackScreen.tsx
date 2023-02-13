import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProfileStackList} from "../types/types";
import Profile from "../screens/Profile";
import {useTheme} from "@react-navigation/native";
import EditProfile from "../screens/EditProfile";


const ProfilStack = createNativeStackNavigator<ProfileStackList>();

export default function ProfileStackScreen () {
    const { colors } = useTheme();
    return (
        <ProfilStack.Navigator >
            <ProfilStack.Screen name="Profile" component={Profile} options={{
                headerStyle: {
                    backgroundColor: colors.notification,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
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
        </ProfilStack.Navigator>
    )
}