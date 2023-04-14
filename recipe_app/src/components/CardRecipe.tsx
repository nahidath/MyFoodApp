import styles from "../stylesheets/Homepage_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, {useState} from "react";
import {useTheme} from "@react-navigation/native";
import {auth} from "../firebase/config";


interface CardRecipeProps {
    recipe: any;
    navigation: any;
    width?: number;
    height?: number;
    fontSize?: number;
    star?: boolean;
    label?: boolean;

}

const CardRecipe = ({ recipe, navigation, height=260, width=170, fontSize=20, star=true, label=true}: CardRecipeProps) => {
    const { colors } = useTheme();
    const theme = useTheme();
    const [saved, setSaved] = useState<boolean>(false);
    const [favRecipes, setFavRecipes] = useState<any[]>([]);
    const user = auth.currentUser;

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

   return (
       <TouchableOpacity style={[styles.blocRecipe, general.shadow, {backgroundColor: colors.background, height: height, width: width}]} onPress={() => navigation.push('Recipe', {id :recipe.id, name: recipe.title})} activeOpacity={0.4}>
           {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage} imageStyle={{borderRadius: 10}}  />}
           <LinearGradient
               colors={['transparent','rgba(0,0,0,0.8)' ]}
               style={[styles.blocRecipeGradient, {width: width}]}
           >
               <Text style={[styles.blocRecipeImageText, {fontSize: fontSize}]}>{recipe.title}</Text>
           </LinearGradient>
              {label &&
           <View style={styles.blocRecipeLabel}>
               {recipe.vegan && <Text style={styles.blocRecipeLabelText}>Vegan</Text>}
               {recipe.veryHealthy && <Text style={styles.blocRecipeLabelText}>Very Healthy</Text>}
           </View>}
           {star &&
           <TouchableOpacity style={styles.blocRecipeLike}
                             onPress={() => handleFavorite(recipe.id)}
                             activeOpacity={0.4}
           >
               {saved ? <FontAwesome name="star" size={32} color={"#f8cf19"} /> : <FontAwesome name="star-o" size={32} color={"#fefefe"} />}
           </TouchableOpacity>}
       </TouchableOpacity>
   )
}
export default CardRecipe;