// @ts-ignore

import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/Homepage_stylesheet';
import Notifications from "./Notifications";
import {useNavigation} from "@react-navigation/native";
import {HomeStackList} from "../types";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";



// const navigation = useNavigation();
// // const notif = () => {
// //     navigation.navigate(Notifications);
// // }

type HomeScreenProps = StackNavigationProp<HomeStackList, 'HomePage'>;
const Homepage: FC = () => {
    const navigation = useNavigation<HomeScreenProps>();
    const onTap = () => {
        console.log("tap tap");
    }
  return (

    // <ScrollView>
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fdc727" />
            <View style={styles.headerBloc}>
                {/*<Pressable style={styles.headerNotification} >*/}
                {/*    <FontAwesome name={'bell'} size={24} color={'#f5f2eb'} onPress={onTap}/>*/}
                {/*</Pressable>*/}
                <View style={styles.headerBlocText}>
                    <Text style={styles.headerText}>MyFoodApp</Text>
                    <Text style={styles.subHeaderText}>Bonjour, John</Text>
                </View>
                <TouchableOpacity style={styles.headerNotification}  onPress={() => navigation.navigate('Notifications')}>
                    <FontAwesome name={'bell'} size={24} color={'#f5f2eb'} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <View style={styles.blocTitle}>
                        <Text style={styles.recipe1Title}>Recettes à la une</Text>
                        <Pressable style={styles.recipe1Button}>
                            <Feather name={'arrow-right'} size={24} color={'#f5f2eb'} />
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
                            <Feather name={'arrow-right'} size={24} color={'#f5f2eb'} />
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