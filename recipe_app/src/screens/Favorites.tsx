import React, {FC, useEffect, useState} from "react";
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
import {REACT_APP_API_KEY} from "@env";
import CardRecipe from "../components/CardRecipe";


// @ts-ignore
type FavoriteProps = MyStackNavigationProp<FavoritesStackList, 'Favs'>;

const Favorites : FC = () => {
    const {colors} = useTheme();
    const theme = useTheme();
    const user = auth.currentUser;
    // console.log(user);
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const navigation = useNavigation<FavoriteProps>();
    const [favRecipes, setFavRecipes] = useState<any[]>([]);
    const configValue : string | undefined = REACT_APP_API_KEY;


    const getFavRecipeUser = () => {
        const userID = user?.uid;
        const recipesRef = ref(database, `users/${userID}/recipes`);
        let favRecipes : string[] = [];

        onValue(recipesRef, snapshot => {
            const recipes = snapshot.val(); // this will give you an object with all recipes for the user
            for (const [key, value] of Object.entries(recipes)) {
                if (typeof value === "string") {
                    favRecipes.push(value);
                }
            }
        });
        axios.get('https://api.spoonacular.com/recipes/informationBulk', {params: {apiKey: configValue, ids: favRecipes.toString()} }).then((response) => {
            setFavRecipes(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        getFavRecipeUser();
    }, []);

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {user == null ? <View style={[styles.restricted, {backgroundColor: colors.background}]}>
                    <Text style={[styles.restrictedText, {color: colors.text}]}>You must be logged in to view this page.</Text>
                    <TouchableOpacity style={[styles.button,  {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() => navigation.push('LoginStackScreen')}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View> :
                <View style={styles.favList}>
                {favRecipes.length === 0 ? <Text style={{color: colors.text, flex: 1, flexDirection: 'column'}}>You have no saved recipes</Text> :
                <FlatList
                    data={favRecipes}
                    renderItem={({item}) => <CardRecipe recipe={item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
                }
            </View>
            }
        </View>
    );
}

export default Favorites;