import styles from "../stylesheets/Homepage_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {ImageBackground, LayoutChangeEvent, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {auth, database} from "../firebase/config";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";
import {child, ref, remove} from "firebase/database";
import {useLanguage} from "../translation/LanguageContext";
import {useTranslation} from "../translation/TranslationFunc";


interface CardRecipeProps {
    recipe: any;
    navigation: any;
    width?: number;
    height?: number;

    star?: boolean;
    label?: boolean;
    trash?: boolean;
    listOfRecipesId?: any[];
    index?: number;

}

const CardRecipe = ({ recipe, navigation, height=260, width=170, star=true, label=true, trash=false, listOfRecipesId, index}: CardRecipeProps) => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const { colors } = useTheme();
    const theme = useTheme();
    const [saved, setSaved] = useState<boolean>(false);
    const [favRecipes, setFavRecipes] = useState<any[]>([]);
    const user = auth.currentUser;
    const titleRef = useRef<Text>(null);
    const [fontSize, setFontSize] = useState<number>(20);
    const [translationRecipeTitle, setTranslationRecipeTitle] = useState<any>(recipe.title);
    const[translationVegan, setTranslationVegan] = useState<string>("Vegan");
    const[translationVeryHealthy, setTranslationVeryHealthy] = useState<string>("Very Healthy");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translationRecipeTitle, translationVegan, translationVeryHealthy]);
                    setTranslationVegan(elementsTranslated[1]);
                    setTranslationVeryHealthy(elementsTranslated[2]);
                    setTranslationRecipeTitle(elementsTranslated[0]);

                } catch (error) {
                    console.error('Erreur de traduction CardRecipe:', error);
                }
            }else {
                setTranslationVegan("Vegan");
                setTranslationVeryHealthy("Very Healthy");
                setTranslationRecipeTitle(recipe.title);
            }
        }
        fetchTranslation();
    }, [language]);


    const handleFavorite = (recipeIndx : any) => {
        //alert to say that user should be logged in to save a recipe
        if (!auth.currentUser) {
            alert("You need to be logged in to save a recipe");
            return;
        }else{
            //add recipeIndx to favorites array when star icon is pressed and remove it when pressed again and update the saved state
            const newFavRecipes = [...favRecipes];
            // console.log("before fav", newFavRecipes);
            const index = newFavRecipes.indexOf(recipeIndx);
            if (index > -1) {
                // newFavRecipes.splice(index, 1);
                const newArray = newFavRecipes.filter((item) => item !== recipeIndx);
                setFavRecipes(newArray);
                console.log("removed");
                setSaved(!saved);

            } else {
                // newFavRecipes.push(recipeIndx);
                setFavRecipes([...favRecipes, recipeIndx]);
                console.log("added");
                setSaved(!saved);
            }
        }




        // const db = firebase.firestore();
        // const user = auth.currentUser;
        // const uid = user?.uid;
        // db.collection('users').doc(uid).collection('favorites').add({
        //     recipe: recipe
        // }).then(() => {
        //     setSaved(true);
        // })

        //add recipeIndx to favorites array when star icon is pressed and remove it when pressed again and update the saved state
        // const newFavRecipes = [...favRecipes];
        // // console.log("before fav", newFavRecipes);
        // const index = newFavRecipes.indexOf(recipeIndx);
        // if (index > -1) {
        //     // newFavRecipes.splice(index, 1);
        //     const newArray = newFavRecipes.filter((item) => item !== recipeIndx);
        //     setFavRecipes(newArray);
        //     console.log("removed");
        //     setSaved(!saved);
        //
        // } else {
        //     // newFavRecipes.push(recipeIndx);
        //     setFavRecipes([...favRecipes, recipeIndx]);
        //     console.log("added");
        //     setSaved(!saved);
        // }
        // console.log(newFavRecipes);

        // setFavRecipes(newFavRecipes);
        // console.log("favRecipes", favRecipes);

    }
    // console.log("after", favRecipes);
    // console.log("length", favRecipes.length);
    const deleteFavorite = (recipeId: any) => {
        const db = ref(database);
        const user = auth.currentUser;
        const userId = user?.uid;
        const recipeRef = child(db, `users/${userId}/recipes/${recipeId}`);
        remove(recipeRef).then(() => {
            console.log("removed");
        }).catch((error: any) => {
            console.log(error);
        });
    }
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.measure((x, y, width, height, pageX, pageY) => {
                if (height > 100) {
                    setFontSize(fontSize - 2);
                }
            });
        }
    }, [fontSize]);
    const handleTextLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (height > 100 && fontSize > 15) {
            setFontSize(fontSize - 2);
        }
    };


    return (
       <TouchableOpacity style={[styles.blocRecipe, general.shadow, {backgroundColor: colors.background, height: height, width: width}]} onPress={() => navigation.push('Recipe', {id :recipe.id, name: translationRecipeTitle, listOfRecipes : listOfRecipesId, indxCurrent: index})} activeOpacity={0.4}>
           {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}  />}
           <LinearGradient
               colors={['transparent','rgba(0,0,0,0.8)' ]}
               style={[styles.blocRecipeGradient, {width: width}]}
           >
               <Text ref={titleRef} style={[styles.blocRecipeImageText, {fontSize: fontSize}]} onLayout={handleTextLayout}>{recipe.title}</Text>
           </LinearGradient>
              {label &&
           <View style={styles.blocRecipeLabel}>
               {recipe.vegan && <Text style={styles.blocRecipeLabelText}>{translationVegan}</Text>}
               {recipe.veryHealthy && <Text style={styles.blocRecipeLabelText}>{translationVeryHealthy}</Text>}
           </View>}
           {star &&
           <TouchableOpacity style={styles.blocRecipeLike}
                             onPress={() => handleFavorite(recipe.id)}
                             activeOpacity={0.4}
           >
               {saved ? <FontAwesome name="heart" size={32} color={"#f8cf19"} /> : <FontAwesome name="heart-o" size={32} color={"#fefefe"} />}
           </TouchableOpacity>}
           {trash && <TouchableOpacity style={styles.blocRecipeDelete}
                                       onPress={() => deleteFavorite(recipe.id)}
                                       activeOpacity={0.4}
           >
               <Icon name={"delete"} size={24} color={"#b3d838"} />
           </TouchableOpacity>}
       </TouchableOpacity>
   )
}
export default CardRecipe;