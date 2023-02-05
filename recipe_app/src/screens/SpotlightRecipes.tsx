import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import React, {useEffect, useState} from "react";
import {ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import axios from "axios";
import styles from "../stylesheets/SpotlightRecipes_stylesheet";
import general from "../stylesheets/General_stylesheet";
import Feather from "react-native-vector-icons/Feather";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";


type Props = NativeStackScreenProps<HomeStackList, 'SpotlightRecipes'>;
// @ts-ignore
type SpotlightScreenProps = MyStackNavigationProp<HomeStackList, 'SpotlightRecipes'>;
const SpotlightRecipes = ({route}: Props) => {
    const navigation = useNavigation<SpotlightScreenProps>();
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipesR, setRecipesR] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    let recipeFromHP  = route.params.recipesArray;
    // console.log(route.params.recipesArray);

    const getRecipes = () => {
        let dataRecipesMerged : string | any[] = [];
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 10} }).then((response) => {
            dataRecipesMerged = [...response.data.recipes, ...recipeFromHP];
            //filtering the array to remove duplicates
            dataRecipesMerged = dataRecipesMerged.filter((item: any, index: any) => {
                return dataRecipesMerged.indexOf(item) === index;
            });
            //sorting the array by average rating
            dataRecipesMerged.sort((a: any, b: any) => {
                return b.aggregateLikes - a.aggregateLikes;
            });
            setRecipesR(dataRecipesMerged);
        },).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getRecipes();
    },[])

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const m = minutes < 10 ? '0' + minutes : minutes
        return hours +'h' + m + ' min';
    }



    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
            <ScrollView>
                {recipesR.map((recipe2: any) => {
                    return (
                        <TouchableOpacity key={recipe2.id} style={[styles.blocRecipe, general.shadow]} onPress={() => navigation.push('Recipe', {id :recipe2.id, name: recipe2.title})}>
                            <View style={[styles.imgRecipe]}>
                                {recipe2.image ? <ImageBackground source={{uri: recipe2.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}} />}
                            </View>
                            <View style={styles.blocRecipeBelow}>
                                <Text style={styles.blocRecipeImageText}>{recipe2.title}</Text>
                                <Text style={styles.time}><Feather name="clock" size={20} color="#041721"/> {recipe2.readyInMinutes > 59 ? formatTime(recipe2.readyInMinutes) :recipe2.readyInMinutes + " min"} </Text>
                                <View style={styles.blocRecipeLikes}>
                                    <Text style={styles.recipeLikesText}>{recipe2.aggregateLikes}</Text>
                                    <FontAwesome style={styles.heart} name="heart" size={20} color="#9fc131" />
                                </View>
                            </View>
                            <View style={styles.blocRecipeLabel}>
                                {recipe2.vegan && <Text style={styles.blocRecipeLabelText}>Vegan</Text>}
                                {recipe2.veryHealthy && <Text style={styles.blocRecipeLabelText}>Very Healthy</Text>}
                                {recipe2.glutenFree && <Text style={styles.blocRecipeLabelText}>Gluten Free</Text>}
                                {recipe2.vegetarian && <Text style={styles.blocRecipeLabelText}>Vegetarian</Text>}
                                {recipe2.dairyFree && <Text style={styles.blocRecipeLabelText}>Dairy Free</Text>}
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )

}

export default SpotlightRecipes;