import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from "./src/screens/Homepage";
import {NavigationContainer} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";

export default function App() {
  return (
      <NavigationContainer>
        <BottomNavigation/>
      </NavigationContainer>
    // <Homepage />
  );
}

