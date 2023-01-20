import {FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Recipe_stylesheet";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {FC, useEffect, useState} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import axios from "axios";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";


type Props = NativeStackScreenProps<HomeStackList, 'Recipe'>;

const Recipe : FC<Props> = ({id}) => {
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const getRecipe = () => {
        axios.get('https://api.spoonacular.com/recipes/'+id+'/information',{params:{apiKey: configValue} }).then((response) => {
            setRecipe(response.data);
            setIngredients(response.data.extendedIngredients);
        },).catch((error) => {
            console.log(error);
        });
    }

    const getInstructions = () => {
        axios.get('https://api.spoonacular.com/recipes/'+id+'/analyzedInstructions',{params:{apiKey: configValue} }).then((response) => {
            setInstructions(response.data);
        },).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getRecipe();
        getInstructions();
    }, []);

    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView>
                    {recipe.map((r: any) => {
                        return (
                            <View style={styles.headerRecipeImage} key={r.id}>
                               {r.image ? <ImageBackground source={{uri: r.image}} style={styles.blocRecipeImage} /> : <ImageBackground source={require('../assets/no-photo.png')} style={styles.blocRecipeImage} />}
                                <Text style={styles.headerRecipeImageText}>{r.title}</Text>
                                <View style={styles.headerRecipeLabel}>
                                    <Text style={styles.headerRecipeLabelText}>Label</Text>
                                </View>
                                <View style={styles.recipeLikes}>
                                    <Text style={styles.recipeLikesText}>{r.aggregateLikes}</Text>
                                    <FontAwesome name="heart" size={20} color="#9fc131" />
                                </View>
                            </View>
                            // </ImageBackground>
                        )
                    })}
                    {/*}*/}

                {/*    /!*<ImageBackground*!/*/}
                {/*    /!*    // source={{uri: recipe.image}} resizeMode="cover" style={styles.blocRecipeImage}  imageStyle={{borderRadius: 10}}*!/*/}
                {/*    /!*    >*!/*/}
                {/*        <Text style={styles.headerRecipeImageText}>Recipe</Text>*/}
                {/*        <View style={styles.headerRecipeLabel}>*/}
                {/*            <Text style={styles.headerRecipeLabelText}>Label</Text>*/}
                {/*        </View>*/}
                {/*        <View style={styles.recipeLikes}>*/}
                {/*            <Text style={styles.recipeLikesText}>20</Text>*/}
                {/*            <FontAwesome name="heart" size={20} color="#9fc131" />*/}
                {/*        </View>*/}
                {/*    /!*</ImageBackground>*!/*/}
                {/*</View>*/}
                <View style={styles.recipeInfos}>
                    <View style={styles.ingredientList}>
                        <Text style={styles.ingredientListTitle}>INGREDIENTS</Text>
                        {ingredients.map((i: any) => {
                            return (
                                <FlatList data={[
                                    {key: i.id},]} renderItem={ ({item}) => <Text>{item.key}</Text>  } />
                            )
                        }

                    </View>
                    <View style={styles.recipeDescription}>
                        <Text style={styles.titleDesc}>PREPARATION</Text>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Recipe;