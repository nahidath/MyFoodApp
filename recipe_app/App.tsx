import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from "./src/screens/Homepage";
import {NavigationContainer} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from "./src/screens/Notifications";
import Search from "./src/screens/Search";
import Favorites from "./src/screens/Favorites";
import Profile from "./src/screens/Profile";


export default function App() {
    const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
            {/*<Stack.Navigator*/}
            {/*    screenOptions={{*/}
            {/*        headerStyle : {*/}
            {/*            backgroundColor : '#8cae00',*/}
            {/*        },*/}
            {/*        headerTintColor: '#fff',*/}
            {/*        headerTitleStyle: {*/}
            {/*            fontWeight: 'bold',*/}
            {/*        },*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Stack.Screen name="Notifications" component={Notifications}/>*/}
            {/*    /!*<Stack.Screen name="Favorites" component={Favorites} />*!/*/}
            {/*    /!*<Stack.Screen name="Profile" component={Profile} />*!/*/}
            {/*</Stack.Navigator>*/}
        <BottomNavigation/>
      </NavigationContainer>
    // <Homepage />
  );
}

