import React, {FC, useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    ScrollView,
    Pressable,
    TouchableOpacity,
    ImageBackground,
    Image, ActivityIndicator
} from "react-native";
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
import {HomeStackList} from "../types/types";
import {useNavigation, useTheme} from "@react-navigation/native";
import ingredientsList from "../data/ingredientsList";

// @ts-ignore
type SearchScreenProps = MyStackNavigationProp<HomeStackList, 'Search'>;

const Search : FC = () => {
    const navigation = useNavigation<SearchScreenProps>();
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<any>([]);
    const [noResults, setNoResults] = useState<string>('');
    const [nbResults, setNbResults] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const configValue : string | undefined = REACT_APP_API_KEY;
    const inputRef = useRef<TextInput>(null);
    const myList = ingredientsList.sort((a: any, b: any) => a.name.localeCompare(b.name));
    const [loading, setLoading] = useState<boolean>(false);

    const getSearchResult = () => {
        console.log("loading",loading);
        axios.get('https://api.spoonacular.com/recipes/complexSearch',{params:{apiKey: configValue, query: search.toLowerCase().trim(), number: 100, addRecipeInformation:true} }).then((response1) => {
            setResults(response1.data.results);
            setNbResults(response1.data.totalResults);
            setIsSearch(true);
            setLoading(false);
            if(response1.data.results.length == 0){
                setNoResults('No results found');
            }
        },).catch((error) => {
            console.log(error);
        });

    }


    const handleSearch = () => {
        if(search!=''){
            // console.log('search', search);
            setLoading(true);
            getSearchResult();
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
        setNoResults('');
        const searchPress = search;
        if(searchPress!=''){
            setSearch(searchPress);
            setLoading(true);
            getSearchResult();
        }

        // if(search!='' && isSearch){
        //     getSearchResult();
        //     console.log('search', search);
        // }

    }, [search, isSearch]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const m = minutes < 10 ? '0' + minutes : minutes
        return hours +'h' + m + ' min';
    }

    const {colors} = useTheme();
    const theme = useTheme();
    const borderSpec=theme.dark ? "#fefefe" : "#505050";

    return (

        <View style={[general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <View style={[styles.searchContainer, general.shadow, {backgroundColor: colors.notification}]}>
                <FontAwesome style={styles.icon} name={"search"} size={22} color={"#9e9e9e"} />
                <TextInput
                    ref={inputRef}
                    style={{color:colors.text}}
                    placeholderTextColor={colors.text}
                    placeholder={'Search recipes'}
                    keyboardType="default"
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={handleSearch} />
            </View>
            {!isSearch && (
                <View style={styles.ingredientListContainer}>
                    <FlatList
                        numColumns={3}
                        data={myList}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                        renderItem={({item}) => (
                            <TouchableOpacity style={[styles.ingreBox, {backgroundColor: colors.notification, borderColor :borderSpec}]} onPress={() => [setSearch(item.name.trim()), handleSearch()]}><Text style={{color:colors.text, textAlign:'center'}}>{item.name}{item.icon}</Text></TouchableOpacity>
                        )}
                    />
                </View>
            )}
            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#9fc131" />
                </View>
            )}

            {isSearch && results.length > 0 ? (
                <View style={styles.resultsContainer}>
                    <Text style={[styles.resultsText, {color:colors.text}]}>{nbResults} {results.length == 1 ? "Result founded" : "Results founded" } </Text>
                    <Separator />
                    <ScrollView keyboardShouldPersistTaps='always'>
                        {results.map((result : any) => {
                            return (
                                <TouchableOpacity key={result.id} style={[recipeStyles.blocRecipe, general.shadow]} onPress={() => navigation.navigate('Recipe', {id :result.id, name: result.title})}>
                                <View style={recipeStyles.imgRecipe}>
                                    {result.image ? <Image source={{uri: result.image}} style={recipeStyles.blocRecipeImage}/> : <Image source={require('../../assets/no-photo-resized-new.png')} style={recipeStyles.blocRecipeImage} />}
                                </View>
                                <View style={recipeStyles.blocRecipeBelow}>
                                    <Text style={[recipeStyles.blocRecipeImageText, {color:colors.text}]}>{result.title}</Text>
                                    <Text style={[recipeStyles.time, {color:colors.text}]}><Feather name="clock" size={20} color="#041721"/> {result.readyInMinutes > 59 ? formatTime(result.readyInMinutes) : result.readyInMinutes + " min"}</Text>
                                    <View style={recipeStyles.blocRecipeLikes}>
                                        <Text style={[recipeStyles.recipeLikesText, {color:colors.text}]}>{result.aggregateLikes}</Text>
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
                    </ScrollView>

                </View>
            ) : (
                <Text style={[styles.resultsText, {color:colors.text}]}>{noResults}</Text>
            )}

        </View>

    );
}

export default Search;