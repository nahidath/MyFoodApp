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
    Image, ActivityIndicator, Keyboard
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
import {HomeStackList, SearchStackList} from "../types/types";
import {useIsFocused, useNavigation, useTheme} from "@react-navigation/native";
import ingredientsList from "../data/ingredientsList";

// @ts-ignore
type SearchScreenProps = MyStackNavigationProp<SearchStackList, 'SearchPage'>;

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
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const getSearchResult = (s?: string) => {
        let query = s ? s : search.trim();
        axios.get('https://api.spoonacular.com/recipes/complexSearch',{params:{apiKey: configValue, query: query.toLowerCase(), number: 100, addRecipeInformation:true} }).then((response1) => {
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
            setLoading(true);
            getSearchResult();
        }
    }

    const handleIngredient = (ingredient: string) => {
        setSearch(ingredient.trim());
        setLoading(true);
        getSearchResult(ingredient.trim());
    }

    useEffect(() => {
        if(isFocused){
            Keyboard.addListener('keyboardDidShow', () => {
                inputRef.current?.focus();
            });
        }
        setNoResults('');
        if(search == ''){
            setIsSearch(false);
        }
    }, [search, isSearch, isFocused]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const m = minutes < 10 ? '0' + minutes : minutes
        return hours +'h' + m + ' min';
    }

    const {colors} = useTheme();
    const theme = useTheme();
    const borderSpec=theme.dark ? "#fefefe" : "#505050";

    const modalFilter = () => {
        return (
            <View style={[styles.modalContainer, {backgroundColor: colors.background}]}>
                <View style={[styles.modalHeader, {backgroundColor: colors.notification}]}>
                    <Text style={[styles.modalTitle, {color:colors.text}]}>Filter</Text>
                    <Feather name={"x"} size={22} color={colors.text} onPress={() => setModalVisible(false)} />
                </View>
                <Separator />
                <View style={styles.modalBody}>
                    <Text style={[styles.modalText, {color:colors.text}]}>Sort by</Text>
                    <View style={styles.modalFilter}>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Popularity</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Price</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Time</Text></Pressable>
                    </View>
                    <Separator />
                    <Text style={[styles.modalText, {color:colors.text}]}>Diet</Text>
                    <View style={styles.modalFilter}>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Gluten Free</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Ketogenic</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Vegetarian</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Lacto-Vegetarian</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Ovo-Vegetarian</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Vegan</Text></Pressable>
                        <Pressable style={[styles.modalFilterButton, {backgroundColor: colors.notification, borderColor :borderSpec}]}><Text style={{color:colors.text}}>Pescetarian</Text></Pressable>
    }

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
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={handleSearch}
                />
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
                            <TouchableOpacity style={[styles.ingreBox, {backgroundColor: colors.notification, borderColor :borderSpec}]} onPress={() =>  handleIngredient(item.name.trim())}><Text style={{color:colors.text, textAlign:'center'}}>{item.name}{item.icon}</Text></TouchableOpacity>
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
                    <Feather name={"filter"} size={22} color={colors.text} onPress={() => setModalVisible(true)} />
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