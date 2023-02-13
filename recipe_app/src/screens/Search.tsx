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
    Image
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
    const [ids, setIds] = useState<string>('');
    const [infoR, setInfoR] = useState<any>([]);
    const configValue : string | undefined = REACT_APP_API_KEY;
    const inputRef = useRef<TextInput>(null);
    const myList = ingredientsList;

    const getSearchResult = () => {
        let dataIds : string | any = [];
        axios.get('https://api.spoonacular.com/recipes/complexSearch',{params:{apiKey: configValue, query: search.toLowerCase(), number: 100} }).then((response) => {
            setResults(response.data.results);
            setNbResults(response.data.totalResults);
            dataIds=response.data.results.map((item: any) => item.id)
            setIds(dataIds.toString());
            setIsSearch(true);
            if(response.data.results.length == 0){
                setNoResults('No results found');
            }
        },).catch((error) => {
            console.log(error);
        });
    }

    const getRecipeInfo = () => {
        axios.get('https://api.spoonacular.com/recipes/informationBulk',{params:{apiKey: configValue, includeNutrition: false, ids:ids} }).then((response) => {
            setInfoR(response.data);
        },).catch((error) => {
            console.log(error);
        });
    }

    const handleSearch = () => {
        if(search!=''){
            getSearchResult();
            getRecipeInfo();
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
        setNoResults('');
        // if(search!='' && isSearch){
        //     getSearchResult();
        //     console.log('search', search);
        // }

    }, [search, isSearch]);

    const {colors} = useTheme();
    const theme = useTheme();

    return (
        // <KeyboardAwareScrollView
        //     resetScrollToCoords={{ x: 0, y: 0 }}
        //     style={{ backgroundColor: '#F5F9FA' }}
        //     scrollEnabled={true}
        // >
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
                <View style={styles.ingredientListContainer}>
                    <FlatList
                        // numColumns={3}
                        data={myList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.ingreBox} onPress={() => setSearch(item.name)}><Text style={{color:colors.text, textAlign:'center'}}>{item.name}{item.icon}</Text></TouchableOpacity>
                        )}
                    />
                </View>
                {isSearch && results.length > 0 ? (
                    <View style={styles.resultsContainer}>
                        <Text style={[styles.resultsText, {color:colors.text}]}>{nbResults} {results.length == 1 ? "Result founded" : "Results founded" } </Text>
                        <Separator />
                        <ScrollView>
                            {results.map((result : any) => {
                                return (
                                    <TouchableOpacity key={result.id} style={[recipeStyles.blocRecipe, general.shadow]} onPress={() => navigation.navigate('Recipe', {id :result.id, name: result.title})}>
                                    <View style={[recipeStyles.imgRecipe]}>
                                        {result.image ? <ImageBackground source={{uri: result.image}} style={recipeStyles.blocRecipeImage} imageStyle={{borderRadius: 10}}/> : <ImageBackground source={require('../../assets/no-photo-resized-new.png')} style={recipeStyles.blocRecipeImage} imageStyle={{borderRadius: 10}} />}
                                    </View>
                                    <View style={recipeStyles.blocRecipeBelow}>
                                        <Text style={[recipeStyles.blocRecipeImageText, {color:colors.text}]}>{result.title}</Text>
                                        {infoR.map((info : any) => (
                                            <View>
                                                {info.map((i : any) => (
                                                    <View>
                                                        <View style={recipeStyles.blocRecipeLabel}>
                                                            {i.vegan && <Text style={recipeStyles.blocRecipeLabelText}>Vegan</Text>}
                                                            {i.veryHealthy && <Text style={recipeStyles.blocRecipeLabelText}>Very Healthy</Text>}
                                                            {i.glutenFree && <Text style={recipeStyles.blocRecipeLabelText}>Gluten Free</Text>}
                                                            {i.vegetarian && <Text style={recipeStyles.blocRecipeLabelText}>Vegetarian</Text>}
                                                            {i.dairyFree && <Text style={recipeStyles.blocRecipeLabelText}>Dairy Free</Text>}
                                                        </View>

                                                        <Text style={[recipeStyles.time, {color:colors.text}]}><Feather name="clock" size={20} color="#041721"/> {i.readyInMinutes} min</Text>
                                                        <View style={recipeStyles.blocRecipeLikes}>
                                                            <Text style={[recipeStyles.recipeLikesText, {color:colors.text}]}>{i.aggregateLikes}</Text>
                                                            <FontAwesome style={recipeStyles.heart} name="heart" size={20} color="#9fc131" />
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        ))}
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
        // </KeyboardAwareScrollView>

    );
}

export default Search;