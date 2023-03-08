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
    Image, ActivityIndicator, Keyboard, TouchableHighlight, Modal, StyleSheet
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
import {useIsFocused, useNavigation, useScrollToTop, useTheme} from "@react-navigation/native";
import ingredientsList from "../data/ingredientsList";
import {SkeletonLoaderSearch} from "../components/SkeletonLoader";
import {FilterModal} from "../components/Filters";
import hairlineWidth = StyleSheet.hairlineWidth;

// @ts-ignore
type SearchScreenProps = MyStackNavigationProp<SearchStackList, 'SearchPage'>;

const Search : FC = () => {
    const {colors} = useTheme();
    const theme = useTheme();
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
    const ref = useRef(null);
    const borderSpec=theme.dark ? "#fefefe" : "#505050";
    const textInputBckgr = theme.dark ? '#272727' : '#f2f2f2';

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

    useEffect(() => {
        if(isSearch){
            useScrollToTop(ref);
        }
    }, [isSearch]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (

                <View style={styles.searchContainer}>
                    <TextInput
                        ref={inputRef}
                        style={{color:colors.text, width: 290, marginRight: 10,  height: 40, borderRadius: 10, backgroundColor: textInputBckgr, paddingLeft: 10, paddingRight: 10, borderWidth: hairlineWidth, borderColor: borderSpec}}
                        placeholderTextColor={colors.text}
                        placeholder={'Search recipes, ingredients, etc.'}
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={handleSearch}
                    />
                    {/*<FontAwesome style={styles.icon} name={"search"} size={22} color={"#9e9e9e"} />*/}
                </View>
            ),
            //style back button
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather style={styles.icon} name={"arrow-left"} size={22} color={colors.text} />
                </TouchableOpacity>
            ),
        });
    },[theme, search, isSearch, isFocused]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const m = minutes < 10 ? '0' + minutes : minutes
        return hours +'h' + m + ' min';
    }



    // useEffect(() => {
    //     if(modalVisible){
    //         modalFilter();
    //     }
    // }, [modalVisible]);

//

    return (

        <View style={[general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {/*<View style={[styles.searchContainer, general.shadow, {backgroundColor: colors.notification}]}>*/}
            {/*    <FontAwesome style={styles.icon} name={"search"} size={22} color={"#9e9e9e"} />*/}
            {/*    <TextInput*/}
            {/*        ref={inputRef}*/}
            {/*        style={{color:colors.text}}*/}
            {/*        placeholderTextColor={colors.text}*/}
            {/*        placeholder={'Search recipes'}*/}
            {/*        value={search}*/}
            {/*        onChangeText={setSearch}*/}
            {/*        onSubmitEditing={handleSearch}*/}
            {/*    />*/}
            {/*</View>*/}
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
                    <SkeletonLoaderSearch theme={theme} color={colors}/>
                </View>
            )}

            {isSearch && results.length > 0 ? (
                <View style={styles.resultsContainer}>
                    <Text style={[styles.resultsText, {color:colors.text}]}>{nbResults} {nbResults == 1 ? "Result founded" : "Results founded" } </Text>
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <FilterModal search={search} setResults={setResults} setNoResults={setNoResults} setNbResults={setNbResults} setIsSearch={setIsSearch} setLoading={setLoading} setModalVisible={setModalVisible} screenName={'Search'} scrollRef={ref} />
                    </Modal>
                    <TouchableOpacity  style={styles.filterButton} onPress={() => setModalVisible(true)}>
                        <Feather name={"filter"} size={22} color={colors.text} />
                    </TouchableOpacity>
                    <Separator />
                    <ScrollView keyboardShouldPersistTaps='always' ref={ref}>
                        {results.map((result : any) => {
                            return (
                                <TouchableOpacity key={result.id} style={[recipeStyles.blocRecipe, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.navigate('Recipe', {id :result.id, name: result.title})}>
                                    <View style={recipeStyles.imgRecipe}>
                                        {result.image ? <Image source={{uri: result.image}} style={recipeStyles.blocRecipeImage}/> : <Image source={require('../../assets/no-photo-resized-new.png')} style={recipeStyles.blocRecipeImage} />}
                                    </View>
                                    {/*<View style={recipeStyles.blocRecipeLikes}>*/}
                                    {/*    <Text style={recipeStyles.recipeLikesText}>{result.aggregateLikes}<FontAwesome style={recipeStyles.heart} name="heart" size={20} color="#9fc131" /></Text>*/}
                                    {/*</View>*/}
                                    <View style={recipeStyles.blocRecipeBelow}>
                                        <Text style={[recipeStyles.blocRecipeImageText, {color:colors.text}]}>{result.title}</Text>
                                        <Text style={[recipeStyles.time, {color:colors.text}]}><Feather name="clock" size={20} color={colors.text}/> {result.readyInMinutes > 59 ? formatTime(result.readyInMinutes) : result.readyInMinutes + " min"}</Text>
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