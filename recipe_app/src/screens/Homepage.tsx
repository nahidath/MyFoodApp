// @ts-ignore

import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';

const Homepage: FC = () => {
  return (

    // <ScrollView>
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerBloc}>
                    <Pressable style={styles.headerMenuLeft}>
                        <Feather name={'menu'} size={24} color={'#fff'} />
                    </Pressable>
                    <Text style={styles.headerText}>Welcome to MyFoodApp</Text>
                </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c7b922',
        flexDirection: 'column',
    },
    headerBloc: {
        width: '100%',
        height: 190,
        backgroundColor: '#8cae00',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,

    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 70,
        padding: 20,
    },
    headerMenuLeft: {
        position: 'relative',
        top: 50,
        left: 20,
    },
    blocTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,

    },
    recipe1Title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    recipe1Button: {
        padding: 6,
        fontWeight: 'bold',
    },
    blocDisplay: {
        flexDirection: 'row',
    },
    blocRecipe: {
        width: 170,
        height: 260,
        borderRadius: 20,
        backgroundColor: '#fff',
        margin: 20,

    }
});

export default Homepage;