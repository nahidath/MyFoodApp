import {FlatList, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Recipe_stylesheet";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {FC, useEffect, useState} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5Free from "react-native-vector-icons/FontAwesome";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import axios from "axios";
import * as WebBrowser from 'expo-web-browser';
import { LogBox } from 'react-native';
import Share from "react-native-share";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import {A} from "@expo/html-elements";
import Feather from "react-native-vector-icons/Feather";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";


type Props = NativeStackScreenProps<HomeStackList, 'Recipe'>;
// @ts-ignore
type RecipesScreenProps = MyStackNavigationProp<HomeStackList, 'Recipe'>;

const Recipe = ({route}: Props) => {
    const navigation = useNavigation<RecipesScreenProps>();
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipe, setRecipe] = useState<any>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const {id} = route.params;
    const {name} = route.params;

    const getRecipe = () => {
        let dataInstruction : string | any[] = [];
        axios.get('https://api.spoonacular.com/recipes/'+JSON.stringify(id)+'/information',{params:{apiKey: configValue} }).then((response) => {
            setRecipe(response.data);
            setIngredients(response.data.extendedIngredients.map((item: any) => item.original));
            dataInstruction = response.data.analyzedInstructions.map((item: any) => item.steps.map((item: any) => 'Step ' + item.number + ' : ' + item.step))
            setInstructions(dataInstruction[0]);
            setIsLoaded(true);
        },).catch((error) => {
            console.log(error);
        });


    }


    useEffect(() => {
        navigation.setOptions({
            headerTitle: name,
        })
        getRecipe();
        if(isLoaded) {
            getLabels();
        }

        LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
    }, [isLoaded, name]);

    const getLabels = () => {
        const vegan : string = 'Vegan';
        const vegetarian : string = 'Vegetarian';
        const glutenFree : string = 'Gluten Free';
        const dairyFree : string = 'Dairy Free';
        const veryHealthy : string = 'Very Healthy';

        if (recipe.vegan) {
            setLabels((labels) => [...labels, vegan]);
        }
        if (recipe.vegetarian) {
            setLabels((labels) => [...labels, vegetarian]);
        }
        if (recipe.glutenFree) {
            setLabels((labels) => [...labels, glutenFree]);
        }
        if (recipe.dairyFree) {
            setLabels((labels) => [...labels, dairyFree]);
        }
        if (recipe.veryHealthy) {
            setLabels((labels) => [...labels, veryHealthy]);
        }
    }



    //share recipe
    // const urlToShare : string = recipe.sourceUrl;
    // const title : string = recipe.title;
    // const message : string = "Hey, I found this recipe on Recipe App, check it out!";
    //
    // const options = {
    //     title: title,
    //     message: message,
    //     url: urlToShare,
    // }
    // const onShare = async (customOptions = options) => {
    //     try {
    //         await Share.open(customOptions);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }


    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView>
                <View style={styles.headerRecipeImage} key={recipe.id}>
                   {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} imageStyle={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                          {/*<TouchableOpacity onPress={async () => {await onShare();}}>*/}
                          {/*  <Feather style={styles.shareBtn} name="share-2" size={25} color={"#fefefe"}  />*/}
                          {/*</TouchableOpacity>*/}
                       {/*<Pressable onPress={async () => {await onShare();}}>*/}
                       {/*     <Feather style={styles.shareBtn} name="share-2" size={25} color={"#fefefe"}  />*/}
                       {/*</Pressable>*/}
                       {/*    {labels.map((label, index) => (*/}
                       {/*        <Text key={index} style={styles.headerRecipeLabelText}>{label}</Text>*/}
                       {/*        // <Text style={styles.headerRecipeLabelText}>Label</Text>*/}
                       {/*    ))}*/}
                       <View style={styles.headerRecipeLabel}>
                            {labels.map((label, index) => (
                                <Text key={index} style={styles.headerRecipeLabelText}>{label}</Text>
                           // <Text style={styles.headerRecipeLabelText}>Label</Text>
                            ))}
                       </View>
                       <LinearGradient
                           colors={['transparent','rgba(0,0,0,0.8)' ]}
                           style={styles.blocRecipeGradient}
                       >
                           <Text style={styles.headerRecipeImageText}>{recipe.title}</Text>
                           <View style={styles.recipeLikes}>
                               <Text style={styles.recipeLikesText}>{recipe.aggregateLikes}</Text>
                               <FontAwesome style={styles.heart} name="heart" size={20} color="#9fc131" />
                           </View>
                       </LinearGradient>
                     </ImageBackground>

                       : <ImageBackground source={require('../../assets/no-photo.png')} style={styles.blocRecipeImage}>
                           <Text style={styles.headerRecipeImageText}>{recipe.title}</Text>
                           <View style={styles.headerRecipeLabel}>
                               <Text style={styles.headerRecipeLabelText}>Label</Text>
                           </View>
                           <View style={styles.recipeLikes}>
                               <Text style={styles.recipeLikesText}>{recipe.aggregateLikes}</Text>
                               <FontAwesome name="heart" size={20} color="#9fc131" />
                           </View>
                          </ImageBackground>
                       }
                </View>

                <View style={styles.recipeInfos}>
                    <Text style={styles.time}><Feather name="clock" size={20} color="#041721"/> Ready in {recipe.readyInMinutes} minutes</Text>
                    <Text style={styles.servings}><Feather name="user" size={20} color="#041721"/>Serves {recipe.servings} people</Text>
                    <View style={styles.ingredientList}>
                        <Text style={styles.ingredientListTitle}>INGREDIENTS</Text>
                        <FlatList data={ingredients} renderItem={ ({item}) => <Text style={styles.items}>{item}</Text>  } />

                    </View>
                    <View style={styles.recipeDescription}>
                        <Text style={styles.titleDesc}>PREPARATION</Text>
                        <FlatList data={instructions} renderItem={ ({item}) => <Text style={styles.items}>{item}</Text>  } />
                    </View>
                </View>
                <Text style={styles.enjoy}>Enjoy your meal ! 😋</Text>
                <Text style={styles.source}>Source : <Text style={styles.sourceLink} onPress={() => WebBrowser.openBrowserAsync(recipe.sourceUrl)}>{recipe.sourceUrl}</Text> </Text>
            </ScrollView>
        </View>
    );
}

export default Recipe;