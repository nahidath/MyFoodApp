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
import {FilterModal} from "../components/Filters";
import hairlineWidth = StyleSheet.hairlineWidth;
import {SkeletonView} from "../components/SkeletonLoader";
import searchRecipes from "../mock/searchResultsBeef.json";
import searchVideos from "../mock/searchVideosPasta.json";
import RecipeVideo from "../components/RecipeVideo";
import * as WebBrowser from 'expo-web-browser';


// @ts-ignore
type SearchScreenProps = MyStackNavigationProp<SearchStackList, 'SearchPage'>;

const Search : FC = () => {
    const {colors} = useTheme();
    const theme = useTheme();
    const navigation = useNavigation<SearchScreenProps>();
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<any>([]);
    const [resultsVideo, setResultsVideo] = useState<any>([]);
    const [noResults, setNoResults] = useState<string>('');
    const [noResultsVideo, setNoResultsVideo] = useState<string>('');
    const [nbResults, setNbResults] = useState<number>(0);
    const [nbResultsVideo, setNbResultsVideo] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const configValue : string | undefined = REACT_APP_API_KEY;
    const inputRef = useRef<TextInput>(null);
    const myList = ingredientsList.sort((a: any, b: any) => a.name.localeCompare(b.name));
    const [loading, setLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalVisible2, setModalVisible2] = useState<boolean>(false);
    // const ref = useRef(null);
    const borderSpec=theme.dark ? "#fefefe" : "#505050";
    const textInputBckgr = theme.dark ? '#272727' : '#f2f2f2';
    const [showRecipe, setShowRecipe] = useState<boolean>(true);
    const [showVideos, setShowVideos] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState('recipeBtn');


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
        },
        (error) => {
            setResults(searchRecipes.results);
            setNbResults(searchRecipes.totalResults);
            setIsSearch(true);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });


    }

    const getSearchVideoResults = (s?: string) => {
        let query = s ? s : search.trim();
        axios.get('https://api.spoonacular.com/food/videos/search',{params:{apiKey: configValue, query: query.toLowerCase(), number: 100, addRecipeInformation:true} }).then((response1) => {
                setResultsVideo(response1.data.videos);
                setNbResultsVideo(response1.data.totalResults);
                setIsSearch(true);
                setLoading(false);
                if(response1.data.videos.length == 0){
                    setNoResultsVideo('No results found');
                }
            },
            (error) => {
                setResultsVideo(searchVideos.videos);
                setNbResultsVideo(searchVideos.totalResults);
                setIsSearch(true);
                setLoading(false);
            }).catch((error) => {
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
        if(selectedButton == 'videoBtn'){
            setLoading(true);
            getSearchVideoResults(search);
        }
    }, [selectedButton]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (

                <View style={styles.searchContainer}>
                    <TextInput
                        ref={inputRef}
                        style={{color:colors.text, width: 290, marginRight: 10,  height: 40,  backgroundColor: textInputBckgr, paddingLeft: 10, paddingRight: 10, borderBottomWidth: hairlineWidth, borderBottomColor: borderSpec}}
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
                <TouchableOpacity onPress={() => {setIsSearch(false), setSearch(''), setSelectedButton('recipeBtn'), setResultsVideo('')}}>
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

    const colorSpeBtn = theme.dark ? "#f2f2f2" : "#041721";
    const colorSpeBtn2 = theme.dark ? "#505050" : "#f2f2f2";
    const colorSpeBtnText = theme.dark ? "#041721" : "#f2f2f2";
    const colorSpeBtnText2 = theme.dark ? "#f2f2f2" : "#041721";


    // useEffect(() => {
    //     if(modalVisible){
    //         modalFilter();
    //     }
    // }, [modalVisible]);

    const handleButtonPress = (buttonName: string) => {
        setSelectedButton(buttonName);
    };


    return (

        <View style={[general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {!isSearch && (
                <View style={styles.ingredientListContainer}>
                    <FlatList
                        numColumns={3}
                        data={myList}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                        renderItem={({item}) => (
                            <TouchableOpacity style={[styles.ingreBox, general.shadow, {backgroundColor: colors.notification, borderColor :borderSpec}]} onPress={() =>  handleIngredient(item.name.trim())}><Text style={{color:colors.text, textAlign:'center'}}>{item.name}{item.icon}</Text></TouchableOpacity>
                        )}
                    />
                </View>
            )}
            {loading && (
                 <SkeletonView theme={theme} color={colors}/>
            )}

            {isSearch ? (
                <View style={styles.resultsContainer}>
                    <View style={styles.resultsHeader}>
                        <Text style={[styles.resultsText, {color:colors.text}]}>{selectedButton === 'videoBtn' ? nbResultsVideo==1 ? nbResultsVideo + ' video found' : nbResultsVideo + ' videos found' : nbResults==1 ? nbResults + ' recipe found' : nbResults + ' recipes found'}</Text>
                        <TouchableOpacity style={[styles.recipeTab, {backgroundColor: selectedButton === 'recipeBtn' ? colorSpeBtn : colorSpeBtn2}]} onPress={() => handleButtonPress('recipeBtn')}>
                            <Feather name={"book-open"} size={13} color={selectedButton === 'recipeBtn' ? colorSpeBtnText : colorSpeBtnText2} />
                            <Text style={[styles.recipeBtnText, {color: selectedButton === 'recipeBtn' ? colorSpeBtnText : colorSpeBtnText2}]}> Recipes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.recipeTab, {backgroundColor: selectedButton === 'videoBtn' ? colorSpeBtn : colorSpeBtn2}]} onPress={() => handleButtonPress('videoBtn')}>
                            <Feather name={"video"} size={13} color={selectedButton === 'videoBtn' ? colorSpeBtnText : colorSpeBtnText2} />
                            <Text style={[styles.recipeBtnText, {color: selectedButton === 'videoBtn' ? colorSpeBtnText : colorSpeBtnText2}]}> Videos</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        {selectedButton === 'recipeBtn' ? (
                            <FilterModal search={search} setResults={setResults} setNoResults={setNoResults} setNbResults={setNbResults} setIsSearch={setIsSearch} setLoading={setLoading} setModalVisible={setModalVisible} screenName={'Search'} category={'filterRecipes'} />
                        ) : (
                            <FilterModal search={search} setResults={setResultsVideo} setNoResults={setNoResultsVideo} setNbResults={setNbResultsVideo} setIsSearch={setIsSearch} setLoading={setLoading} setModalVisible={setModalVisible} screenName={'Search'} category={'filterVideos'} />
                        )}

                    </Modal>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.floatingButton, general.shadow]}
                        onPress={() => setModalVisible(true)}
                    >
                        <FontAwesome name="filter" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    <Separator />
                    <ScrollView keyboardShouldPersistTaps='always' >
                        {selectedButton === 'recipeBtn' ? (
                            results.length === 0 ? (
                                <Text style={[styles.resultsText, {color:colors.text}]}>{noResults}</Text>
                            ) : (
                                results.map((result : any, index : number) => {
                                    return (
                                        <TouchableOpacity key={index} style={[recipeStyles.blocRecipe, general.shadow, {backgroundColor: colors.notification}]}
                                                          // onPress={() => navigation.navigate('Recipe', {id :result.id, name: result.title})}
                                            onPress={() => navigation.navigate('Carousel', {index: index, listOfRecipes: results})}
                                        >
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
                                })
                            )
                        ) : (
                            resultsVideo.length === 0 ? (
                                <Text style={[styles.resultsText, {color:colors.text}]}>{noResultsVideo}</Text>
                            ) : (
                                resultsVideo.map((resultV : any, index: number) => {
                                    return (

                                        <TouchableOpacity key={index} style={[recipeStyles.blocRecipe, general.shadow, {backgroundColor: colors.notification}]} onPress={() => WebBrowser.openBrowserAsync('https://www.youtube.com/embed/' + resultV.youTubeId)}>
                                            <View style={recipeStyles.imgRecipe}>
                                                {resultV.thumbnail ? <Image source={{uri: resultV.thumbnail}} style={recipeStyles.blocRecipeImage}/> : <Image source={require('../../assets/no-photo-resized-new.png')} style={recipeStyles.blocRecipeImage} />}
                                            </View>
                                            <View style={recipeStyles.blocRecipeBelow}>
                                                <Text style={[recipeStyles.blocRecipeImageText, {color:colors.text}]}>{resultV.shortTitle}</Text>
                                                <Text style={[recipeStyles.time, {color:colors.text}]}><Feather name="eye" size={20} color={colors.text}/> {resultV.views}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })
                            )
                        )}
                    </ScrollView>
                </View>
            ) : (
                <Text style={[styles.resultsText, {color:colors.text}]}>{noResults}</Text>
            )}

        </View>

    );
}

export default Search;