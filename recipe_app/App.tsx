import {NavigationContainer,DarkTheme,DefaultTheme} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import {Provider} from "react-redux";
import configureStore from "./src/redux-store/store";
import React from "react";
import {useColorScheme} from 'react-native';

export default function App() {

    const store = configureStore();
    const scheme = useColorScheme();
    console.log(scheme);
    const DarkTheme = {
        dark: true,
        colors: {
            primary: 'rgba(159,193,49,0.55)',
            background: '#121212',
            card: 'rgb(255, 255, 255)',
            text: '#f2f2f2',
            border: '#fff',
            notification: 'rgb(255, 69, 58)',
        },
    };
    const LightTheme = {
        dark: false,
        colors: {
            primary: '#9fc131',
            background: '#FAF9F6',
            card: 'rgb(255, 255, 255)',
            text: '#041721',
            border: '#041721',
            notification: 'rgb(255, 69, 58)',
        }
    }
    return (
        // <Provider store={store}>
        //
        // </Provider>
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <BottomNavigation />
    </NavigationContainer>
  );
}

