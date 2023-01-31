import React, {FC, useEffect, useState} from "react";
import {View, Text, TextInput, FlatList, ScrollView, Pressable, TouchableOpacity, ImageBackground} from "react-native";
import styles from '../stylesheets/Search_stylesheet';
import recipeStyles from '../stylesheets/SpotlightRecipes_stylesheet';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import axios from "axios";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {HomeStackList} from "../types";
import {useNavigation} from "@react-navigation/native";

// @ts-ignore
type SearchScreenProps = MyStackNavigationProp<HomeStackList, 'Search'>;

const Search : FC = () => {
    const navigation = useNavigation<SearchScreenProps>();
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<string[]>([]);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const configValue : string | undefined = REACT_APP_API_KEY;


    const getSearchResult = () => {
        axios.get('https://api.spoonacular.com/recipes/complexSearch',{params:{apiKey: configValue, query: search} }).then((response) => {
            setResults(response.data.results);
            setIsSearch(true);
        },).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getSearchResult();
    }, [search]);

    return (
        // <KeyboardAwareScrollView
        //     resetScrollToCoords={{ x: 0, y: 0 }}
        //     style={{ backgroundColor: '#F5F9FA' }}
        //     scrollEnabled={true}
        // >
            <View style={general.container}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} placeholder={'Rechercher une recette'} onSubmitEditing={(searchTxt) => setSearch(searchTxt.nativeEvent.text)} />
                    {/*<Pressable style={styles.searchButton}>*/}
                    {/*    <FontAwesome name={"search"} size={24} color={"#ffffff"} />*/}
                    {/*</Pressable>*/}
                </View>
                <Separator />
                {isSearch && results.length > 0 ? (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.resultsText}>{results.length} Resultat(s) trouvé(s)</Text>
                        <Separator />
                        {results.map((result : any) => {
                            return (
                                <TouchableOpacity key={result.id} style={[recipeStyles.blocRecipe, general.shadow]} onPress={() => navigation.navigate('Recipe', {id :result.id, name: result.title})}>
                                <View style={[recipeStyles.imgRecipe]}>
                                    {result.image ? <ImageBackground source={{uri: result.image}} style={recipeStyles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo.png')} style={recipeStyles.blocRecipeImage} imageStyle={{borderRadius: 10}} />}
                                </View>
                                <View style={recipeStyles.blocRecipeBelow}>
                                    <Text style={recipeStyles.blocRecipeImageText}>{result.title}</Text>
                                    <Text style={recipeStyles.time}><Feather name="clock" size={20} color="#041721"/> {result.readyInMinutes} min</Text>
                                    <View style={recipeStyles.blocRecipeLikes}>
                                        <Text style={recipeStyles.recipeLikesText}>{result.aggregateLikes}</Text>
                                        <FontAwesome style={recipeStyles.heart} name="heart" size={20} color="#9fc131" />
                                    </View>
                                </View>
                                <View style={recipeStyles.blocRecipeLabel}>
                                    {result.vegan && <Text style={recipeStyles.blocRecipeLabelText}>Vegan</Text>}
                                    {result.veryHealthy && <Text style={recipeStyles.blocRecipeLabelText}>Very Healthy</Text>}
                                    {result.glutenFree && <Text style={recipeStyles.blocRecipeLabelText}>Gluten Free</Text>}
                                    {result.vegetarian && <Text style={recipeStyles.blocRecipeLabelText}>Vegetarian</Text>}
                                    {result.dairyFree && <Text style={recipeStyles.blocRecipeLabelText}>Dairy Free</Text>}
                                </View>
                            </TouchableOpacity>
                            )
                        })}

                    </View>
                ) : (
                    <Text style={styles.resultsText}>Aucun résultat</Text>
                )}

            </View>
        // </KeyboardAwareScrollView>

    );
}

export default Search;