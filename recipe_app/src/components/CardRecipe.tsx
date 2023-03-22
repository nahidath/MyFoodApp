import styles from "../stylesheets/Homepage_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, {useState} from "react";
import {useTheme} from "@react-navigation/native";


interface CardRecipeProps {
    recipe: any;
    navigation: any;

}

const CardRecipe = ({ recipe, navigation}: CardRecipeProps) => {
    const { colors } = useTheme();
    const theme = useTheme();
    const [saved, setSaved] = useState<boolean>(false);
    const [favRecipes, setFavRecipes] = useState<any[]>([]);

    const handleFavorite = (recipeIndx : any) => {
        // const db = firebase.firestore();
        // const user = auth.currentUser;
        // const uid = user?.uid;
        // db.collection('users').doc(uid).collection('favorites').add({
        //     recipe: recipe
        // }).then(() => {
        //     setSaved(true);
        // })

        //add recipeIndx to favorites array when star icon is pressed and remove it when pressed again and update the saved state
        const newFavRecipes = [...favRecipes];
        const index = newFavRecipes.indexOf(recipeIndx);
        if (index > -1) {
            newFavRecipes.splice(index, 1);
            console.log("removed");
            setSaved(!saved);

        } else {
            newFavRecipes.push(recipeIndx);
            console.log("added");
            setSaved(!saved);
        }

        setFavRecipes(newFavRecipes);

    }
    console.log(favRecipes);

   return (
       <TouchableOpacity style={[styles.blocRecipe, general.shadow, {backgroundColor: colors.background}]} onPress={() => navigation.push('Recipe', {id :recipe.id, name: recipe.title})}>
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
           <TouchableOpacity style={styles.blocRecipeLike}
                             onPress={() => handleFavorite(recipe.id)}
           >
               {saved ? <FontAwesome name="star" size={32} color={"#f8cf19"} /> : <FontAwesome name="star-o" size={32} color={"#fefefe"} />}
           </TouchableOpacity>
       </TouchableOpacity>
   )
}
export default CardRecipe;