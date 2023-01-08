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


type HomeScreenProps = StackNavigationProp<HomeStackList, 'HomePage'>;
// @ts-ignore
const Homepage :  FC = () => {
    const navigation = useNavigation<HomeScreenProps>();


    return (

        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView>
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


export default Homepage;