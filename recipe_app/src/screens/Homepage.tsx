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
    Image, RefreshControl, FlatList
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
    const { colors } = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    let photoProfile : string | null | undefined =   user?.photoURL ;
    const [joke, setJoke] = useState<string>('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [pp, setPP] = useState<string | null>(null);
    // const [date, setDate] = useState<string | null>(new Date());

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
            getNewInfos();
            return () => {
                isActive = false;
            };
        },[user, photoProfile])
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);



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
    const getRandomJokes = () => {
        axios.get('https://api.spoonacular.com/food/trivia/random',{params:{apiKey: configValue} }).then((response) => {
            setJoke(response.data.text);
            console.log(response.data.text);
        },).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getRandomRecipe();
        getRecipesByTags();
        // getRandomJokes();
    }, []);

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
                <View style={[styles.searchBloc, general.shadow, {backgroundColor:colors.notification}]}>
                    <FontAwesome style={styles.searchButton} name={"search"} size={24} color={colors.text} />
                    {/*<Feather style={styles.searchButton} name={"search"} size={24} color={"#9e9e9e"} />*/}

                    <TextInput placeholderTextColor={colors.text} placeholder={'Search recipes'} onFocus={() => navigation.push('Search')} />
                </View>
                <View style={styles.recipesDisplay}>
                    <View>
                        <View style={styles.blocTitle}>
                            <Text style={[styles.recipe1Title, {color: colors.text}]}>Spotlight Recipes</Text>
                            <TouchableOpacity style={styles.recipe1Button} onPress={()=> navigation.navigate('SpotlightRecipes', {recipesArray: recipes})}>
                                <Feather name={'arrow-right'} size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.blocDisplay}>
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
                            <Text style={[styles.recipe1Title, {color: colors.text}]}>Today's ingredient : {'\n'}Potato</Text>
                            {/*<TouchableOpacity style={styles.recipe1Button} >*/}
                            {/*    <Feather name={'arrow-right'} size={24} color={'#041721'} />*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={styles.blocDisplay}>
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
                    <View>
                        <View style={styles.cuisineDisplay}>
                            <Text style={[styles.cuisineTitle, {color: colors.text}]}>Cuisines</Text>
                            <View style={styles.cuisineBloc}>
                                <FlatList
                                    numColumns={2}
                                    data={cuisinesList}
                                    contentContainerStyle={styles.contentContainer}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) => (
                                        <TouchableOpacity style={[styles.cuisineBlocItem, general.shadow, {backgroundColor: colors.background}]} onPress={() => navigation.navigate('Cuisine', {cuisine: item.name})}>
                                            <Text style={[styles.cuisineBlocItemText, {color: colors.text}]}>{item.name}</Text>
                                            <Image source={{uri :item.image}} style={styles.cuisineBlocItemImage} />
                                         </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
  );
};

export default Homepage;