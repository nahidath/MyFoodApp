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
import CardRecipe from "../components/CardRecipe";


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
    const [favRecipes, setFavRecipes] = useState<any[]>([]);




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
    //         console.log("removed");
    //         setSaved(!saved);
    //
    //     } else {
    //         newFavRecipes.push(recipeIndx);
    //         console.log("added");
    //         setSaved(!saved);
    //     }
    //
    //     setFavRecipes(newFavRecipes);
    //     console.log(favRecipes);
    //
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
                {/*<View style={styles.headerBloc}>*/}
                    <View style={styles.headerBloc}>
                        <TouchableOpacity style={styles.headerProfile}  onPress={() => {navigation.navigate('Account', {screen: 'AccountStackScreen/ProfileStackScreen'})}}>
                            <View style={styles.profile}>

                                {user != null ? <Image source={{uri: user.photoURL?.replace(/\r?\n|\r/g, '')}} style={styles.pp}/> :  pp ? <Image source={{uri: pp?.replace(/\r?\n|\r/g, '')}} style={styles.pp}/> : <Feather name={"user"} size={24} color={colors.text} />}
                                {/*<Feather name={"user"} size={24} color={colors.text} />*/}
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.headerText, {color: colors.text}]}>{user == null ? 'Hi !' : 'Hi, ' + user.displayName + ' !'}</Text>
                        {/*<Text style={[styles.headerJoke, {color: colors.text}]}>{joke}</Text>*/}
                        <TouchableOpacity style={styles.headerNotification} onPress={() => navigation.navigate('NotificationsScreen') }>
                            <Feather name={"bell"} size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>


                {/*</View>*/}
                <Pressable  style={[styles.searchBloc, general.shadow, {backgroundColor:colors.notification}]} onPress={() => navigation.push('SearchStackScreen')}>
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
                            <TouchableOpacity style={styles.recipe1Button} onPress={()=> navigation.push('SpotlightRecipes', {recipesArray: recipes})}>
                                <Feather name={'arrow-right'} size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.blocDisplay}>
                            {loading ? <SkeletonLoaderHomePage theme={theme} color={colors} /> :
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {recipes.map((recipe: any, index: number) => {
                                        return (
                                            <CardRecipe key={index} recipe={recipe} navigation={navigation} />
                                        )
                                    })}
                                </ScrollView>
                            }
                        </View>
                    </View>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={[styles.recipe1Title, {color: colors.text}]}>Today's ingredient : {'\n'}{newIngredient.charAt(0).toUpperCase() + newIngredient.slice(1)}</Text>
                        </View>
                        <View style={styles.blocDisplay}>
                            {loading ? <SkeletonLoaderHomePage theme={theme} color={colors} /> :
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {recipes2.map((recipe2: any, index: number) => {
                                        return (
                                            <CardRecipe key={index} recipe={recipe2} navigation={navigation} />
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
                                    <TouchableOpacity key={cuisine.id} style={[styles.cuisineBlocItem, general.shadow, {backgroundColor: colors.background}]} onPress={() => navigation.push('Cuisine', {cuisine: cuisine.name})} activeOpacity={0.4}>
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