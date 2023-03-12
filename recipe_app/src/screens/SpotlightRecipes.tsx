import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList} from "../types/types";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import React, {useEffect, useState} from "react";
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useTheme} from "@react-navigation/native";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import axios from "axios";
import styles from "../stylesheets/SpotlightRecipes_stylesheet";
import general from "../stylesheets/General_stylesheet";
import Feather from "react-native-vector-icons/Feather";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {colors} from "react-native-elements";
import recipeStyles from "../stylesheets/SpotlightRecipes_stylesheet";
import {SkeletonLoaderSearch} from "../components/SkeletonLoader";
import fsPromise from "fs/promises";


type Props = NativeStackScreenProps<HomeStackList, 'SpotlightRecipes'>;
// @ts-ignore
type SpotlightScreenProps = MyStackNavigationProp<HomeStackList, 'SpotlightRecipes'>;
const SpotlightRecipes = ({route}: Props) => {
    const navigation = useNavigation<SpotlightScreenProps>();
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipesR, setRecipesR] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
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
            setLoading(false);
        },).catch((error) => {
            console.log(error);
        });

        // fsPromise.writeFile('../mock/spotlightRecipes.json', JSON.stringify(recipesR), 'utf8').then(() => {
        //     console.log('File written');
        // }).catch((error) => {
        //     console.log(error);
        // });


    }

    useEffect(() => {
        setLoading(true);
        getRecipes();
    },[])

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const m = minutes < 10 ? '0' + minutes : minutes
        return hours +'h' + m + ' min';
    }

    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {loading && (
                <View style={styles.loading}>
                    <SkeletonLoaderSearch theme={theme} color={colors} />
                </View>
            )}

            <ScrollView>
                {recipesR.map((recipe2: any) => {
                    return (
                        <TouchableOpacity key={recipe2.id} style={[styles.blocRecipe, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('Recipe', {id :recipe2.id, name: recipe2.title})}>
                            <View style={[styles.imgRecipe]}>
                                {recipe2.image ? <Image source={{uri: recipe2.image}} style={styles.blocRecipeImage}/> : <Image source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage} />}
                            </View>
                            <View style={styles.blocRecipeBelow}>
                                <Text style={[styles.blocRecipeImageText, {color:colors.text}]}>{recipe2.title}</Text>
                                <Text style={[styles.time, {color:colors.text}]}><Feather name="clock" size={20} color={colors.text}/> {recipe2.readyInMinutes > 59 ? formatTime(recipe2.readyInMinutes) :recipe2.readyInMinutes + " min"} </Text>
                                <View style={styles.blocRecipeLikes}>
                                    <Text style={[styles.recipeLikesText, {color:colors.text}]}>{recipe2.aggregateLikes} <FontAwesome style={styles.heart} name="heart" size={20} color="#9fc131" /></Text>
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