// @ts-ignore

import {
    Dimensions, ImageBackground,
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
import React, {FC, useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/Homepage_stylesheet';
import {CommonActions, useNavigation} from "@react-navigation/native";
import {HomeStackList} from "../types";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import axios from "axios";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import { LinearGradient } from 'expo-linear-gradient';



type HomeScreenProps = StackNavigationProp<HomeStackList, 'HomePage'>;
// @ts-ignore
const Homepage :  FC = () => {
    const navigation = useNavigation<HomeScreenProps>();
    const height = Dimensions.get('window').height;
    const [recipes, setRecipes] = useState([]);
    const [recipes2, setRecipes2] = useState([]);
    const configValue : string | undefined = REACT_APP_API_KEY;
    // console.log(configValue);

    const getRandomRecipe = () => {
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 4} }).then((response) => {
            setRecipes(response.data.recipes);
        },).catch((error) => {
            console.log(error);
        });

    }

    const getRecipesByTags = () => {
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 4, tags: "carrot"} }).then((response) => {
            setRecipes2(response.data.recipes);
        },).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getRandomRecipe();
        getRecipesByTags();
    }, []);

    // console.log(recipes);

    return (

        <View style={[styles.container, general.container, {height: height}]}>
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
                                {recipes.map((recipe: any) => {
                                    return (
                                        <TouchableOpacity key={recipe.id} style={[styles.blocRecipe, general.shadow]} onPress={() => navigation.navigate('Recipe')}>

                                                {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} /> : <ImageBackground source={require('../assets/no-photo.png')} style={styles.blocRecipeImage} />}
                                                    <LinearGradient
                                                        colors={['transparent','rgba(0,0,0,0.8)' ]}
                                                        style={styles.blocRecipeGradient}
                                                    >
                                                    <Text style={styles.blocRecipeImageText}>{recipe.title}</Text>
                                                    </LinearGradient>
                                                    <View style={styles.blocRecipeLabel}>
                                                        <Text style={styles.blocRecipeLabelText}>Label</Text>
                                                    </View>
                                                    <View style={styles.blocRecipeLike}>
                                                        <Feather name={'heart'} size={24} color={'#041721'} />
                                                    </View>
                                                {/*</ImageBackground>*/}
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={styles.recipe1Title}>L'ingrédient du jour : {'\n'}La carotte</Text>
                            <Pressable style={styles.recipe1Button}>
                                <Feather name={'arrow-right'} size={24} color={'#041721'} />
                            </Pressable>
                        </View>
                        <View style={styles.blocDisplay}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {recipes2.map((recipe2: any) => {
                                    return (
                                        <View key={recipe2.id} style={[styles.blocRecipe, general.shadow]}>

                                            <ImageBackground source={{uri: recipe2.image}} resizeMode="cover" style={styles.blocRecipeImage}  imageStyle={{borderRadius: 10}}>
                                                <LinearGradient
                                                    colors={['transparent','rgba(0,0,0,0.8)' ]}
                                                    style={styles.blocRecipeGradient}
                                                >
                                                    <Text style={styles.blocRecipeImageText}>{recipe2.title}</Text>
                                                </LinearGradient>
                                                <View style={styles.blocRecipeLabel}>
                                                    <Text style={styles.blocRecipeLabelText}>Label</Text>
                                                </View>
                                                <View style={styles.blocRecipeLike}>
                                                    <Feather name={'heart'} size={24} color={'#041721'} />
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>

                    </View>
                </View>
            </ScrollView>

        </View>
  );
};

export default Homepage;