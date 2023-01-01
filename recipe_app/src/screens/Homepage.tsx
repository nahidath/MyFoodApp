// @ts-ignore

import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/Homepage_stylesheet';
import Notifications from "./Notifications";
import {useNavigation} from "@react-navigation/native";
import {HomeStackList} from "../types";
import {NativeStackScreenProps} from "@react-navigation/native-stack";



// const navigation = useNavigation();
// // const notif = () => {
// //     navigation.navigate(Notifications);
// // }

type HomeScreenProps = NativeStackScreenProps<HomeStackList, 'HomePage'>;
const Homepage: FC<HomeScreenProps> = (props) => {
  return (

    // <ScrollView>
        <View style={styles.container}>

            <View style={styles.headerBloc}>
                <Pressable style={styles.headerNotification} onPress={() => props.navigation.navigate('Notifications')}>
                    <FontAwesome name={'bell'} size={24} color={'#fff'} />
                </Pressable>
                <Text style={styles.headerText}>MyFoodApp</Text>
                <Text style={styles.subHeaderText}>Bonjour, John</Text>
            </View>
            <ScrollView>
                <View>
                    <View style={styles.blocTitle}>
                        <Text style={styles.recipe1Title}>Recettes à la une</Text>
                        <Pressable style={styles.recipe1Button}>
                            <Feather name={'arrow-right'} size={24} color={'#fff'} />
                        </Pressable>
                    </View>
                    <View style={styles.blocDisplay}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.blocRecipe}></View>
                            <View style={styles.blocRecipe}></View>
                            <View style={styles.blocRecipe}></View>
                            <View style={styles.blocRecipe}></View>
                        </ScrollView>
                    </View>

                </View>
                <View>
                    <View style={styles.blocTitle}>
                        <Text style={styles.recipe1Title}>L'ingrédient du jour : La tomate</Text>
                        <Pressable style={styles.recipe1Button}>
                            <Feather name={'arrow-right'} size={24} color={'#fff'} />
                        </Pressable>
                    </View>
                    <View style={styles.blocDisplay}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.blocRecipe}></View>
                            <View style={styles.blocRecipe}></View>
                            <View style={styles.blocRecipe}></View>
                            <View style={styles.blocRecipe}></View>
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>


        </View>
    // </ScrollView>

  );
};



export default Homepage;