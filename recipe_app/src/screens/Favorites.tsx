import React, {FC, useEffect, useState} from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Notifications_stylesheet";
import general from "../stylesheets/General_stylesheet";
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";
import {auth, database} from "../firebase/config";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {FavoritesStackList} from "../types/types";
import Recipe from "./Recipe";
import {child, ref, onValue, remove} from "firebase/database";
import axios from "axios";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import CardRecipe from "../components/CardRecipe";
import {SkeletonLoaderFavoritesPage} from "../components/SkeletonLoader";


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
    const [loggedIn, setLoggedIn] = useState(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

        return unsubscribe;
    }, [auth]);

    useFocusEffect(
        React.useCallback(() => {
            if(loggedIn){
                navigation.navigate('Favorites', {screen: 'FavoritesStackScreen/Favs'});
            }else {
                navigation.navigate('Home', {screen: 'HomeStackScreen/HomePage'});
            }
        }, [loggedIn]));


    const getFavRecipeUser = () => {
        const userID = user?.uid;
        const recipesRef = ref(database, `users/${userID}/recipes/`);
        let favRecipes : any[] = [];

        //retrieve all recipes for the user from the database
        onValue(recipesRef, snapshot => {
            const recipes = snapshot.val(); // this will give you an object with all recipes for the user
            // console.log(recipes);
            if(recipes != null){
                for (const [key, value] of Object.entries(recipes)) {
                    favRecipes.push(key);
                }
            }
        });

        axios.get('https://api.spoonacular.com/recipes/informationBulk', {params: {apiKey: configValue, ids: favRecipes.toString()} }).then((response) => {
            setFavRecipes(response.data);
            setRefreshing(false);
        }).catch((error) => {
            console.log(error);
        });
    }



    // useEffect(() => {
    //     getFavRecipeUser();
    // }, [favRecipes]);

    useFocusEffect(
        React.useCallback(() => {
            setRefreshing(true);
            getFavRecipeUser();
        }, [])
    )

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {!loggedIn ? <View style={[styles.restricted, {backgroundColor: colors.background}]}>
                    <Text style={[styles.restrictedText, {color: colors.text}]}>You must be logged in to view this page.</Text>
                    <TouchableOpacity style={[styles.button,  {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() => navigation.push('LoginStackScreen')}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View> :
                // <View style={styles.favList}>
                    favRecipes.length === 0 ? <View style={{alignItems: 'center', justifyContent: 'center'}}><Text style={{color: colors.text, fontSize: 15}}>No saved recipes</Text></View> :
                        refreshing ? <SkeletonLoaderFavoritesPage theme={theme} color={colors} /> :
                <FlatList
                    data={favRecipes}
                    renderItem={({item}) => <CardRecipe trash={true} label={false} fontSize={17} height={180} width={130} star={false} recipe={item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: 'space-between', alignItems: 'center', padding: 10}}
                />

            // </View>
            }
        </View>
    );
}

export default Favorites;