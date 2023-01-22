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

const Recipe = ({route}: Props) => {
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipe, setRecipe] = useState<any>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [instructions2, setInstructions2] = useState<string[]>([]);
    const {id} = route.params;

    const getRecipe = () => {
        // let dataIngredient: string | any[] = [];
        // let dataInstruction : string | any[] = [];
        axios.get('https://api.spoonacular.com/recipes/'+JSON.stringify(id)+'/information',{params:{apiKey: configValue} }).then((response) => {
            setRecipe(response.data);
            // console.log(response.data);
            // console.log(response.data.extendedIngredients);
            setIngredients(response.data.extendedIngredients.map((item: any) => item.original));
            setInstructions(response.data.analyzedInstructions.map((item: any) => item.steps.map((item: any) => 'Step ' + item.number + ' : ' + item.step)));

            // dataIngredient = response.data.extendedIngredients;
            // dataInstruction = response.data.analyzedInstructions;
            // console.log(dataIngredient);
            // for (let i = 0; i < response.data.extendedIngredients.length; i++) {
            //     setIngredients([...ingredients, response.data.extendedIngredients[i].original]);
            // }
            // for (let i = 0; i < response.data.analyzedInstructions.length; i++) {
            //     setInstructions([...instructions, response.data.analyzedInstructions[i].steps[i].number + response.data.analyzedInstructions[i].steps[i].step]);
            // }
        },).catch((error) => {
            console.log(error);
        });


    }



    // const getInstructions = () => {
    //     let dataInstruction : string | any[] = [];
    //     axios.get('https://api.spoonacular.com/recipes/'+JSON.stringify(id)+'/analyzedInstructions',{params:{apiKey: configValue} }).then((response) => {
    //         setInstructions(response.data);
    //     },).catch((error) => {
    //         console.log(error);
    //     });
    //
    //     for (let i = 0; i < dataInstruction.length; i++) {
    //         setInstructions([...instructions, dataInstruction[i].steps[i].number + dataInstruction[i].steps[i].step]);
    //     }
    // }

    useEffect(() => {
        getRecipe();
        // getInstructions();
    }, []);

    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView>
                <View style={styles.headerRecipeImage} key={recipe.id}>
                   {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}>

                           <Text style={styles.headerRecipeImageText}>{recipe.title}</Text>
                           <View style={styles.headerRecipeLabel}><Text style={styles.headerRecipeLabelText}>Label</Text>
                           </View>
                           <View style={styles.recipeLikes}>
                           <Text style={styles.recipeLikesText}>{recipe.aggregateLikes}</Text>
                           <FontAwesome name="heart" size={20} color="#9fc131" />
                           </View>
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
            </ScrollView>
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
                        <FlatList data={ingredients} renderItem={ ({item}) => <Text>{item}</Text>  } />

                    </View>
                    <View style={styles.recipeDescription}>
                        <Text style={styles.titleDesc}>PREPARATION</Text>
                        <FlatList data={instructions[0]} renderItem={ ({item}) => <Text>{item}</Text>  } />
                    </View>
                </View>
        </View>
    );
}

export default Recipe;