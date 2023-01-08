// @ts-ignore

import {
    Dimensions,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import React, {FC, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/Homepage_stylesheet';
import {CommonActions, useNavigation} from "@react-navigation/native";
import {HomeStackList} from "../types";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import {NavigationScreenProp, NavigationScreenComponent } from 'react-navigation';

type HomeScreenProps = StackNavigationProp<HomeStackList, 'HomePage'>;
interface Props extends NavigationScreenProp<{ displayTab: string}> {}

// @ts-ignore
const Homepage :  NavigationScreenComponent<Props> = ({navigation}) => {
    // const navigation = useNavigation<HomeScreenProps>();
    const [ offset, setOffset ] = useState(0);
    let [displayTab, setDisplayTab ] = useState('flex');



    const hideTabBar = () => {
        // navigation.setOptions({
        //     tabBarStyle: {
        //         backgroundColor: '#316fc1',
        //     },
        // });
        setDisplayTab('none');
        console.log('hide');
    };
    const showTabBar = () => {
        // navigation.setOptions({
        //     tabBarStyle: { display: 'flex' },
        // });
        setDisplayTab('flex');
        console.log('show');
    };

    return (

        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView
                onScroll={(e) => {
                    const currentOffset = e.nativeEvent.contentOffset.y;
                    let direction = currentOffset > offset ? "down" : "up";
                    if (direction === "down") {
                        console.log("down")
                        hideTabBar()
                    } else {
                        console.log("up")
                        showTabBar()
                    }
                    setOffset(currentOffset)
                    console.log(offset);
                }
                }
            >
                <View style={styles.headerBloc}>
                    <View style={styles.headerBlocText}>
                        <Text style={styles.headerText}>Welcome !</Text>
                    </View>
                    <TouchableOpacity style={styles.headerNotification}  onPress={() => navigation.navigate('Profile')}>
                        <View style={styles.profile}></View>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchBloc}>
                    <TextInput style={[styles.searchInput, general.shadow]} placeholder={'Rechercher une recette'} />
                    <Pressable style={styles.searchButton}>
                        <FontAwesome name={"search"} size={24} color={"#041721"} />
                    </Pressable>
                </View>
                <View style={styles.recipesDisplay}>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={styles.recipe1Title}>Recettes à la une</Text>
                            <Pressable style={styles.recipe1Button}>
                                <Feather name={'arrow-right'} size={24} color={'#041721'} />
                            </Pressable>
                        </View>
                        <View style={styles.blocDisplay}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                            </ScrollView>
                        </View>
                    </View>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={styles.recipe1Title}>L'ingrédient du jour : La tomate</Text>
                            <Pressable style={styles.recipe1Button}>
                                <Feather name={'arrow-right'} size={24} color={'#041721'} />
                            </Pressable>
                        </View>
                        <View style={styles.blocDisplay}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                                <View style={[styles.blocRecipe, general.shadow]}></View>
                            </ScrollView>
                        </View>

                    </View>
                </View>
            </ScrollView>

        </View>
  );
};

Homepage.navigationOptions = {
    tabBarStyle: {
        display: Homepage.displayTab,
    }
}
console.log(Homepage.displayTab);



export default Homepage;