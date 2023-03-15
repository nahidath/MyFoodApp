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
    View,
    Image, RefreshControl, FlatList, LogBox
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/Homepage_stylesheet';
import {CommonActions, useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";
import {HomeStackList} from "../types/types";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import axios from "axios";
import randomIngredients from "../data/randomIngredients";
import cuisinesList from "../data/cuisinesList";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import { LinearGradient } from 'expo-linear-gradient';
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {auth} from "../firebase/config";
import {SkeletonLoaderHomePage} from "../components/SkeletonLoader";
import recipeRandom from "../mock/recipeRandom.json";
import recipeTags from "../mock/recipePotatoTags.json";


// @ts-ignore
type HomeScreenProps = MyStackNavigationProp<HomeStackList, 'HomePage'>;
// @ts-ignore
// type RecipesScreenProps = MyStackNavigationProp<HomeStackList, 'Recipe'>;
// @ts-ignore
const Homepage :  FC = () => {
    const navigation = useNavigation<HomeScreenProps>();
    const height = Dimensions.get('window').height;
    const [recipes, setRecipes] = useState<string[]>([]);
    const [recipes2, setRecipes2] = useState<string[] | any []>([]);
    const configValue : string | undefined = REACT_APP_API_KEY;
    const { colors } = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    let photoProfile : string | null | undefined =   user?.photoURL ;
    const [joke, setJoke] = useState<string>('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [pp, setPP] = useState<string | null>(null);
    // const [date, setDate] = useState<string | null>(new Date());
    const currentDate = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const twentyFourHoursAgo = new Date(currentDate.getTime() - twentyFourHours);
    const [isPass, setPass] = useState<boolean>(false);
    const [newIngredient, setNewIngredient] = useState<string>(randomIngredients[Math.floor(Math.random() * randomIngredients.length)]);
    const [loading, setLoading] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    let lastTap : any = null;
    const [favRecipes, setFavRecipes] = useState<string[] | any []>([]);
    const [recipeState, setRecipeState] = useState<boolean[]>([]);



    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const getNewInfos = async () => {
                try{
                    // @ts-ignore
                    const userPP = user?.photoURL;
                    if (isActive) {
                        // @ts-ignore
                        setPP(userPP);
                    }
                }catch (e) {
                    console.log(e);
                }

            };
            getNewInfos().then(r => r);
            return () => {
                isActive = false;
            };
        },[user, photoProfile])
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getRandomRecipe();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);



    const getRandomRecipe = () => {
        let dataRecipes : string[] | any [] = [];
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 4} }).then((response) => {
            dataRecipes = response.data.recipes;
            dataRecipes.sort((a: any, b: any) => {
                return b.aggregateLikes - a.aggregateLikes;
            });
            setRecipes(dataRecipes);
            setLoading(false);
        }, (error) => {
            dataRecipes = recipeRandom.recipes;
            dataRecipes.sort((a: any, b: any) => {
                return b.aggregateLikes - a.aggregateLikes;
            });
            setRecipes(dataRecipes);
            setLoading(false);
            }).catch((error) => {
            console.log(error);
        });
    }

    const getRecipesByTags = (ingredient : string) => {
        let ing: string = ingredient;
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 10, tags: ing} }).then((response) => {
            setRecipes2(response.data.recipes);
            //check if array is empty
            if(response.data.recipes.length === 0){
                randomIngredients.splice(randomIngredients.indexOf(newIngredient), 1);
                ing=randomIngredients[Math.floor(Math.random() * randomIngredients.length)]
                getRecipesByTags(ing);
                console.log("empty array");
                // setNewIngredient(randomIngredients[Math.floor(Math.random() * randomIngredients.length)]);
            }
            setNewIngredient(ing);
            setPass(true);
            setLoading(false);
        },  (error) => {
                setRecipes2(recipeTags.recipes);
                setNewIngredient('potato');
                // setPass(true);
                setLoading(false);
            }).catch((error) => {
            console.log(error);
        });

    }
    const getRandomJokes = () => {
        axios.get('https://api.spoonacular.com/food/trivia/random',{params:{apiKey: configValue} }).then((response) => {
            setJoke(response.data.text);
        },).catch((error) => {
            console.log(error);
        });
    }

    const checkPassed = () => {
        if(currentDate.getTime() < twentyFourHoursAgo.getTime()){
            setPass(true);
        }
    }


    useEffect(() => {
        checkPassed();
        setLoading(true);
        getRandomRecipe();
        getRecipesByTags(newIngredient);
        // getRandomJokes();
    }, []);

    useEffect(() => {
        if(isPass){
            //give a new ingredient
            const random = Math.floor(Math.random() * randomIngredients.length);
            getRecipesByTags(randomIngredients[random]);
            setNewIngredient(randomIngredients[random]);
        }
    }, [isPass]);

    // const handleFavorite = (recipeIndx : any) => {
    //     // const db = firebase.firestore();
    //     // const user = auth.currentUser;
    //     // const uid = user?.uid;
    //     // db.collection('users').doc(uid).collection('favorites').add({
    //     //     recipe: recipe
    //     // }).then(() => {
    //     //     setSaved(true);
    //     // })
    //
    //     //add recipeIndx to favorites array when star icon is pressed and remove it when pressed again and update the saved state
    //     const newFavRecipes = [...favRecipes];
    //     const index = newFavRecipes.indexOf(recipeIndx);
    //     if (index > -1) {
    //         newFavRecipes.splice(index, 1);
    //         setSaved(!saved);
    //     } else {
    //         newFavRecipes.push(recipeIndx);
    //         setSaved(false);
    //     }
    //     setFavRecipes(newFavRecipes);
    //
    //     const newRecipeState = [...recipeState];
    //     newRecipeState[recipeIndx] = !newRecipeState[recipeIndx];
    //     setRecipeState(newRecipeState);
    //
    //
    // }

    // useEffect(() => {
    //     if(recipes2.length === 0){
    //         setPass(true);
    //     }
    // }, [recipes2]);

    return (

        <View style={[styles.container, general.container, {height: height, backgroundColor:colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#121212" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />}
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.headerBloc}>
                    <View style={styles.headerBlocText}>
                        <Text style={[styles.headerText, {color: colors.text}]}>Welcome !</Text>
                        {/*<Text style={[styles.headerJoke, {color: colors.text}]}>{joke}</Text>*/}
                    </View>
                    <TouchableOpacity style={styles.headerNotification}  onPress={() => {user == null ? navigation.navigate('LoginStackScreen') : navigation.navigate('ProfileStackScreen')}}>
                        <View style={styles.profile}>

                            {pp ? <Image source={{uri: pp?.replace(/\r?\n|\r/g, '')}} style={styles.pp}/> : <Feather name={"user"} size={24} color={colors.text} />}
                            {/*<Feather name={"user"} size={24} color={colors.text} />*/}
                        </View>
                    </TouchableOpacity>
                </View>
                <Pressable  style={[styles.searchBloc, general.shadow, {backgroundColor:colors.notification}]} onPress={() => navigation.navigate('SearchStackScreen')}>
                    <FontAwesome style={styles.searchButton} name={"search"} size={24} color={colors.text} />
                    <Text style={[styles.searchText, {color: colors.text}]}>Search recipes</Text>
                </Pressable>
                {/*<View style={[styles.searchBloc, general.shadow,styles.searchButton, {backgroundColor:colors.notification}]}>*/}
                {/*    */}
                {/*    /!*<Feather style={styles.searchButton} name={"search"} size={24} color={"#9e9e9e"} />*!/*/}

                {/*    /!*<TextInput placeholderTextColor={colors.text} placeholder={'Search recipes'} onFocus={() => navigation.navigate('SearchStackScreen')} />*!/*/}

                {/*    */}
                {/*</View>*/}
                <View style={styles.recipesDisplay}>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={[styles.recipe1Title, {color: colors.text}]}>Spotlight Recipes</Text>
                            <TouchableOpacity style={styles.recipe1Button} onPress={()=> navigation.navigate('SpotlightRecipes', {recipesArray: recipes})}>
                                <Feather name={'arrow-right'} size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.blocDisplay}>
                            {loading ? <SkeletonLoaderHomePage theme={theme} color={colors} /> :
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {recipes.map((recipe: any) => {
                                        return (
                                            <TouchableOpacity key={recipe.id} style={[styles.blocRecipe, general.shadow, {backgroundColor: colors.background}]} onPress={() => navigation.navigate('Recipe', {id :recipe.id, name: recipe.title})}>
                                                    {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}  />}
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
                                                        <TouchableOpacity key={recipe.id} style={styles.blocRecipeLike}
                                                                          // onPress={() => handleFavorite(recipe.id)}
                                                        >
                                                            {saved ? <FontAwesome name="star" size={32} color={"#f8cf19"} /> : <FontAwesome name="star-o" size={32} color={"#fefefe"} />}
                                                        </TouchableOpacity>
                                                    {/*</ImageBackground>*/}
                                            </TouchableOpacity>
                                        )
                                    })}
                                </ScrollView>
                            }
                        </View>
                    </View>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={[styles.recipe1Title, {color: colors.text}]}>Today's ingredient : {'\n'}{newIngredient.charAt(0).toUpperCase() + newIngredient.slice(1)}</Text>
                            {/*<TouchableOpacity style={styles.recipe1Button} >*/}
                            {/*    <Feather name={'arrow-right'} size={24} color={'#041721'} />*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={styles.blocDisplay}>
                            {loading ? <SkeletonLoaderHomePage theme={theme} color={colors} /> :
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {recipes2.map((recipe2: any) => {
                                        return (
                                            <TouchableOpacity key={recipe2.id} style={[styles.blocRecipe, general.shadow, {backgroundColor: colors.background}]} onPress={() => navigation.navigate('Recipe', {id :recipe2.id, name: recipe2.title})}>
                                                {recipe2.image ? <ImageBackground source={{uri: recipe2.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}} />}
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
                                                <TouchableOpacity key={recipe2.id} style={styles.blocRecipeLike}
                                                                  // onPress={() => handleFavorite(recipe2.id)}
                                                >
                                                    {saved ? <FontAwesome name="star" size={32} color={"#f8cf19"} /> : <FontAwesome name="star-o" size={32} color={"#fefefe"} />}
                                                </TouchableOpacity>
                                                {/*</ImageBackground>*/}
                                            </TouchableOpacity>
                                        )
                                    })}
                                </ScrollView>
                            }
                        </View>

                    </View>
                    <View>
                        <Text style={[styles.cuisineTitle, {color: colors.text}]}>Cuisines</Text>
                        <View style={styles.cuisineBloc}>
                            {cuisinesList.map((cuisine: any) => {
                                return (
                                    <TouchableOpacity key={cuisine.id} style={[styles.cuisineBlocItem, general.shadow, {backgroundColor: colors.background}]} onPress={() => navigation.navigate('Cuisine', {cuisine: cuisine.name})}>
                                        <LinearGradient
                                            colors={['rgba(0,0,0,0.8)','transparent' ]}
                                            style={styles.cuisineGradient}
                                        >
                                            <Text style={styles.cuisineBlocItemText}>{cuisine.name}</Text>
                                        </LinearGradient>
                                        <ImageBackground source={{uri :cuisine.image}} style={styles.cuisineBlocItemImage} imageStyle={{borderRadius: 10}} />
                                    </TouchableOpacity>
                                )

                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
  );
};

export default Homepage;