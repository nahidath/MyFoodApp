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
import MyStackNavigationProp from "../components/MyStackNavigationProp";




// @ts-ignore
type HomeScreenProps = MyStackNavigationProp<HomeStackList, 'HomePage'>;
// @ts-ignore
// type RecipesScreenProps = MyStackNavigationProp<HomeStackList, 'Recipe'>;
// @ts-ignore
const Homepage :  FC = () => {
    const navigation = useNavigation<HomeScreenProps>();
    const height = Dimensions.get('window').height;
    const [recipes, setRecipes] = useState<string[]>([]);
    const [recipes2, setRecipes2] = useState<string[]>([]);
    const configValue : string | undefined = REACT_APP_API_KEY;


    const getRandomRecipe = () => {
        let dataRecipes : string[] = [];
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 4} }).then((response) => {
            dataRecipes = response.data.recipes;
            dataRecipes.sort((a: any, b: any) => {
                return b.aggregateLikes - a.aggregateLikes;
            });
            setRecipes(dataRecipes);
        },).catch((error) => {
            console.log(error);
        });

    }

    const getRecipesByTags = () => {
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 10, tags: "potato"} }).then((response) => {
            setRecipes2(response.data.recipes);
        },).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getRandomRecipe();
        getRecipesByTags();
    }, []);

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
                    <TextInput style={[styles.searchInput, general.shadow]} placeholder={'Rechercher une recette'} onPressIn={() => navigation.navigate('Search')} />
                    {/*<FontAwesome style={styles.searchButton} name={"search"} size={24} color={"#041721"} />*/}
                    {/*<Pressable style={styles.searchButton} >*/}
                    {/*   */}
                    {/*</Pressable>*/}
                </View>
                <View style={styles.recipesDisplay}>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={styles.recipe1Title}>Recettes à la une</Text>
                            <TouchableOpacity style={styles.recipe1Button} onPress={()=> navigation.navigate('SpotlightRecipes', {recipesArray: recipes})}>
                                <Feather name={'arrow-right'} size={24} color={'#041721'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.blocDisplay}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {recipes.map((recipe: any) => {
                                    return (
                                        <TouchableOpacity key={recipe.id} style={[styles.blocRecipe, general.shadow]} onPress={() => navigation.navigate('Recipe', {id :recipe.id, name: recipe.title})}>
                                                {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo.png')} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}} />}
                                                    <LinearGradient
                                                        colors={['transparent','rgba(0,0,0,0.8)' ]}
                                                        style={styles.blocRecipeGradient}
                                                    >
                                                    <Text style={styles.blocRecipeImageText}>{recipe.title}</Text>
                                                    </LinearGradient>
                                                    <View style={styles.blocRecipeLabel}>
                                                        {recipe.vegan && <Text style={styles.blocRecipeLabelText}>Vegan</Text>}
                                                        {recipe.veryHealthy && <Text style={styles.blocRecipeLabelText}>Very Healthy</Text>}
                                                    </View>
                                                    <View style={styles.blocRecipeLike}>
                                                        <FontAwesome  name={"heart"} size={24} color={'#fefefe'} />
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
                            <Text style={styles.recipe1Title}>L'ingrédient du jour : {'\n'}La pomme de terre</Text>
                            {/*<TouchableOpacity style={styles.recipe1Button} >*/}
                            {/*    <Feather name={'arrow-right'} size={24} color={'#041721'} />*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={styles.blocDisplay}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {recipes2.map((recipe2: any) => {
                                    return (
                                        <TouchableOpacity key={recipe2.id} style={[styles.blocRecipe, general.shadow]} onPress={() => navigation.navigate('Recipe', {id :recipe2.id, name: recipe2.title})}>
                                            {recipe2.image ? <ImageBackground source={{uri: recipe2.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo.png')} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}} />}
                                            <LinearGradient
                                                colors={['transparent','rgba(0,0,0,0.8)' ]}
                                                style={styles.blocRecipeGradient}
                                            >
                                                <Text style={styles.blocRecipeImageText}>{recipe2.title}</Text>
                                            </LinearGradient>
                                            <View style={styles.blocRecipeLabel}>
                                                {recipe2.vegan && <Text style={styles.blocRecipeLabelText}>Vegan</Text>}
                                                {recipe2.veryHealthy && <Text style={styles.blocRecipeLabelText}>Very Healthy</Text>}
                                            </View>
                                            <View style={styles.blocRecipeLike}>
                                                <FontAwesome  name="heart" size={24} color='#fefefe' />
                                            </View>
                                            {/*</ImageBackground>*/}
                                        </TouchableOpacity>
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