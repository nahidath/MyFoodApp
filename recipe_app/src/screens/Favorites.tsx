import React, {FC, useState} from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {useNavigation, useTheme} from "@react-navigation/native";
import {auth, database} from "../firebase/config";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {FavoritesStackList} from "../types/types";
import Recipe from "./Recipe";
import {child, ref, onValue} from "firebase/database";
import axios from "axios";

// @ts-ignore
type FavoriteProps = MyStackNavigationProp<FavoritesStackList, 'Favs'>;

const Favorites : FC = () => {
    const {colors} = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    // console.log(user);
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const navigation = useNavigation<FavoriteProps>();
    const [favRecipes, setFavRecipes] = useState<string[]>([]);

    const getFavRecipeUser = () => {
        const userID = user?.uid;
        const recipesRef = ref(database, `users/${userID}/recipes`);

        onValue(recipesRef, snapshot => {
            const recipes = snapshot.val(); // this will give you an object with all recipes for the user
            setFavRecipes(recipes);
            console.log(recipes);
        });
    }

    const getFavRecipes = () => {
        axios.get('https://api.spoonacular.com/recipes/informationBulk', {params: {
                ids: favRecipes,
            }
        })
    }

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <Text>Favorites</Text>
            <View style={styles.favList}>
                <FlatList data={} renderItem={}
            </View>
        </View>
    );
}

export default Favorites;