import {NavigationContainer,DarkTheme,DefaultTheme} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import React, {useEffect, useState} from "react";

// @ts-ignore
export const ThemeContext = React.createContext();
export default function App() {

    const [theme, setTheme] = useState('Light');
    const themeData = { theme, setTheme };
    const MyDarkTheme = {
        dark: true,
        colors: {
            primary: '#121212',
            background: '#121212',
            card: '#9fc131',
            text: '#f2f2f2',
            border: '#fff',
            notification: '#252525',
        },
    };
    const MyLightTheme = {
        dark: false,
        colors: {
            primary: '#9fc131',
            background: '#FAF9F6',
            card: '#fff',
            text: '#041721',
            border: '#041721',
            notification: '#fefefe',
        }
    }
    return (
        <ThemeContext.Provider value={themeData}>
            <NavigationContainer theme={theme == 'Light' ? MyLightTheme : MyDarkTheme}>
                <BottomNavigation />
            </NavigationContainer>
        </ThemeContext.Provider>

  );
}

