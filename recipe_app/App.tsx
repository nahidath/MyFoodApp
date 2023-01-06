import { StatusBar } from 'expo-status-bar';
import {Animated, StyleSheet, Text, View} from 'react-native';
import Homepage from "./src/screens/Homepage";
import {NavigationContainer} from "@react-navigation/native";
import BottomNavigation from "./src/components/BottomNavigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from "./src/screens/Notifications";
import Search from "./src/screens/Search";
import Favorites from "./src/screens/Favorites";
import Profile from "./src/screens/Profile";
import {useState} from "react";
// import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";


export default function App() {
    const Stack = createNativeStackNavigator();
    // const translateY = useSharedValue(0);
    //
    // const actionBarStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             {
    //                 translateY: withTiming(translateY.value, {
    //                     duration: 750,
    //                     easing: Easing.inOut(Easing.ease),
    //                 }),
    //             },
    //         ],
    //     };
    // });
    // const AnimatedNavigationBar = Animated.createAnimatedComponent(BottomNavigation);
    // const [height, setHeight] = useState(new Animated.Value(64));
    // const [isHidden, setIsHidden] = useState(false);
    // const setAnimation = (disable: any) => {
    //     Animated.timing(height, {
    //         useNativeDriver: false,
    //         duration: 100,
    //         toValue: disable ? 0 : 64
    //     }).start()
    // };
    // const handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
    //     setAnimation((event.nativeEvent.contentOffset.y > 64));
    //     setIsHidden(!isHidden);
    // }
  // @ts-ignore
    // @ts-ignore
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
        {/*<Animated.View style={actionBarStyle}>*/}
        {/*    <BottomNavigation />*/}
        {/*</Animated.View>*/}
          <BottomNavigation />
        {/*  <AnimatedNavigationBar style={{ backgroundColor: 'red', height: height }} />*/}
      </NavigationContainer>
    // <Homepage />
  );
}

