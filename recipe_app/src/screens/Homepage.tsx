// @ts-ignore

import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../stylesheets/Homepage_stylesheet';

const Homepage: FC = () => {
  return (

    // <ScrollView>
        <View style={styles.container}>

            <View style={styles.headerBloc}>
                <Pressable style={styles.headerMenuLeft}>
                    <Feather name={'menu'} size={24} color={'#fff'} />
                </Pressable>
                <Text style={styles.headerText}>Welcome to MyFoodApp</Text>
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