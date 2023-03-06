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
    Image, ActivityIndicator, Keyboard, TouchableHighlight, Modal
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
import BouncyCheckboxGroup, {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import CheckBox from "@react-native-community/checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

    // useEffect(() => {
    //     if(modalVisible){
    //         modalFilter();
    //     }
    // }, [modalVisible]);

    function FilterModal() {
        // setModalVisible(true);
        const [checked, setChecked] = useState(false);

        const sortList1: ICheckboxButton[] = [
            {
                id: 0,
                text: 'Popularity',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}
,
            },
            {
                id: 1,
                text: 'Price',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}
,
            },
            {
                id: 2,
                text: 'Time',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}
,
            }
        ];
        const sortList2 = [{id: 1, name: 'Gluten Free'}, {id: 2, name: 'Ketogenic'}, {id: 3, name: 'Vegetarian'}, {id: 4, name: 'Lacto-Vegetarian'}, {id: 5, name: 'Ovo-Vegetarian'}, {id: 6, name: 'Vegan'}, {id: 7, name: 'Pescetarian'}, {id: 8, name: 'Paleo'}, {id: 9, name: 'Primal'}, {id: 10, name: 'Whole30'}];
        const sortList3 = [{id: 1, name: 'Dairy'}, {id: 2, name: 'Egg'}, {id: 3, name: 'Gluten'}, {id: 4, name: 'Grain'}, {id: 5, name: 'Peanut'}, {id: 6, name: 'Seafood'}, {id: 7, name: 'Sesame'}, {id: 8, name: 'Shellfish'}, {id: 9, name: 'Soy'}, {id: 10, name: 'Sulfite'}, {id: 11, name: 'Tree Nut'}, {id: 12, name: 'Wheat'}];
        const sortList4 = [{id: 1, name: 'Very Easy'}, {id: 2, name: 'Easy'}, {id: 3, name: 'Medium'}, {id: 4, name: 'Hard'}, {id: 5, name: 'Very Hard'}];
        const sortList5 : ICheckboxButton[] = [
            {
                id: 1,
                text: 'Breakfast',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {
                id: 2,
                text: 'Lunch',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}


            },
            {
                id: 3, text: 'Dinner',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {
                id: 4, text: 'Snack',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {
                id: 5, text: 'Teatime',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {
                id: 6, text: 'Sauce',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {
                id: 7, text :'Drink',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 8, text: 'Dessert',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 9, text: 'Appetizer',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 10,text: 'Salad',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 11,text: 'Bread',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 12,text: 'Soup',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 13,text: 'Beverage',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 14,text: 'Marinade',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 15,text: 'Fingerfood',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 16,text: 'Main Course',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            },
            {id: 17,text: 'Side Dish',
                style:{ margin: 5 },
                size:20,
                fillColor:"#9fc131",
                unfillColor: colors.background,
                textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
                iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
                innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

            }
        ];
        const sortList6 = [{id: 1, name: 'American'}, {id: 2, name: 'British'}, {id: 3, name: 'Cajun'}, {id: 4, name: 'Caribbean'}, {id: 5, name: 'Chinese'}, {id: 6, name: 'Eastern European'}, {id: 7, name: 'European'}, {id: 8, name: 'French'}, {id: 9, name: 'German'}, {id: 10, name: 'Greek'}, {id: 11, name: 'Indian'}, {id: 12, name: 'Irish'}, {id: 13, name: 'Italian'}, {id: 14, name: 'Japanese'}, {id: 15, name: 'Jewish'}, {id: 16, name: 'Korean'}, {id: 17, name: 'Latin American'}, {id: 18, name: 'Mediterranean'}, {id: 19, name: 'Mexican'}, {id: 20, name: 'Middle Eastern'}, {id: 21, name: 'Nordic'}, {id: 22, name: 'Southern'}, {id: 23, name: 'Spanish'}, {id: 24, name: 'Thai'}, {id: 25, name: 'Vietnamese'}];
        const [filters, setFilters] = useState<any>({ sort: '', diet: [], intolerance: [], complexity: [], type: '', cuisine: [] });
        const [toggleCheckBox, setToggleCheckBox] = useState(false);
        const colorSpec = theme.dark ? '#252525' : '#041721';

        return (
            <View style={styles.sideView}>
                <View style={[styles.modalContainer, {backgroundColor: colors.background}]}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalTitle, {color:colors.text}]}>Filters</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Feather name={"x"} size={24} color={colors.text}/>
                        </TouchableOpacity>
                    </View>
                    <Separator />
                    <ScrollView>
                        <View style={styles.modalBody}>
                            <Text style={[styles.modalText, {color:colors.text}]}>Sort by</Text>
                            <View style={styles.modalFilter}>
                                <BouncyCheckboxGroup
                                    data={sortList1}
                                    style={{ flexDirection: "column" }}
                                    onChange={(selectedItem: ICheckboxButton) => {
                                        setFilters({ ...filters, sort: selectedItem.text?.toLowerCase() });
                                        // setSelectedSort(selectedItem.text);
                                        // console.log("SelectedItem: ", selectedItem.text);
                                    }}
                                />
                            </View>
                            <Separator />
                            <Text style={[styles.modalText, {color:colors.text}]}>Diet</Text>
                            <View style={styles.modalFilter}>
                                {sortList2.map((item, index) => {
                                    return (
                                        <BouncyCheckbox
                                            key={index}
                                            style={{ margin: 5 }}
                                            size={20}
                                            fillColor="#9fc131"
                                            unfillColor={colors.background}
                                            text={item.name}
                                           iconStyle={{  height: 20, width: 20,borderRadius: 5,borderColor: colors.border }}
                                             innerIconStyle={{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}}
                                            textStyle={{ color: colors.text, fontSize: 15, textDecorationLine: "none" }}
                                            //push the selected diet to the array
                                            onPress={() => {setToggleCheckBox(!toggleCheckBox), setFilters({ ...filters, diet: [...filters.diet, item.name.toLowerCase()] })}}
                                        />
                                    );
                                })}
                            </View>
                            <Separator />
                            <Text style={[styles.modalText, {color:colors.text}]}>Intolerances</Text>
                            <View style={styles.modalFilter}>
                                {sortList3.map((item, index) => {
                                    return (
                                        <BouncyCheckbox
                                            key={index}
                                            style={{ margin: 5 }}
                                            size={20}
                                            fillColor="#9fc131"
                                            unfillColor={colors.background}
                                            text={item.name}
                                           iconStyle={{  height: 20, width: 20,borderRadius: 5,borderColor: colors.border }}
                                             innerIconStyle={{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}}
                                            textStyle={{ color: colors.text, fontSize: 15, textDecorationLine: "none" }}
                                            onPress={() => {setToggleCheckBox(!toggleCheckBox), setFilters({ ...filters, intolerance: [...filters.intolerance, item.name.toLowerCase()] })}}
                                        />
                                    );
                                })}
                            </View>
                            {/*<Separator />*/}
                            {/*<Text style={[styles.modalText, {color:colors.text}]}>Preparation Time</Text>*/}
                            {/*<View style={styles.modalFilter}>*/}
                            {/*    {sortList4.map((item, index) => {*/}
                            {/*        return (*/}
                            {/*            <BouncyCheckbox*/}
                            {/*                key={index}*/}
                            {/*                style={{ margin: 5 }}*/}
                            {/*                size={20}*/}
                            {/*                fillColor="#9fc131"*/}
                            {/*                unfillColor={colors.background}*/}
                            {/*                text={item.name}*/}
                            {/*               iconStyle={{  height: 20, width: 20,borderRadius: 5,borderColor: colors.border }}*/}
                            {/*                 innerIconStyle={{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}}*/}
                            {/*                textStyle={{ color: colors.text, fontSize: 15, textDecorationLine: "none" }}*/}
                            {/*                onPress={() => {setToggleCheckBox(!toggleCheckBox), setFilters({ ...filters, complexity: [...filters.complexity, item.name.toLowerCase()] })}}*/}
                            {/*            />*/}
                            {/*        );*/}
                            {/*    })}*/}
                            {/*</View>*/}
                            <Separator />
                            <Text style={[styles.modalText, {color:colors.text}]}>Type of Dish</Text>
                            <View style={styles.modalFilter}>
                                <BouncyCheckboxGroup
                                    data={sortList5}
                                    style={{ flexDirection: "column" }}
                                    onChange={(selectedItem: ICheckboxButton) => {
                                        setFilters({ ...filters, type: selectedItem.text?.toLowerCase() });
                                    }}
                                />
                            </View>
                            <Separator />
                            <Text style={[styles.modalText, {color:colors.text}]}>Culinary speciality</Text>
                            <View style={styles.modalFilter}>
                                {sortList6.map((item, index) => {
                                    return (
                                        <BouncyCheckbox
                                            key={index}
                                            style={{ margin: 5 }}
                                            size={20}
                                            fillColor="#9fc131"
                                            unfillColor={colors.background}
                                            text={item.name}
                                            iconStyle={{  height: 20, width: 20,borderRadius: 5,borderColor: colors.border}}
                                            innerIconStyle={{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}}
                                            textStyle={{ color: colors.text, fontSize: 15, textDecorationLine: "none" }}
                                            onPress={() => {setToggleCheckBox(!toggleCheckBox), setFilters({ ...filters, cuisine: [...filters.cuisine, item.name.toLowerCase()] })}}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    </ScrollView>
                    <Separator />
                    <TouchableOpacity style={[styles.modalButton, {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() =>{filterResult(filters), setLoading(true)}} >
                        <Text style={styles.modalButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const filterResult = (filtersArray : any) => {
        let dietFilters = filtersArray.diet;
        let intoleranceFilters = filtersArray.intolerance;
        // let filteredRecipesbyComplexity = filtersArray.complexity;
        let dishTypeFilter = filtersArray.type;
        let cuisineFilters = filtersArray.cuisine;
        let sortFilter = filtersArray.sort;

        axios.get('https://api.spoonacular.com/recipes/complexSearch',{params:{apiKey: configValue, query: search.toLowerCase(), number: 100, addRecipeInformation:true, diet : dietFilters.toString(), intolerances:intoleranceFilters.toString(), type: dishTypeFilter, cuisine: cuisineFilters, sort: sortFilter } }).then((response1) => {
            setResults(response1.data.results);
            setNbResults(response1.data.results.length);
            setIsSearch(true);
            setLoading(false);
            if(response1.data.results.length == 0){
                setNoResults('No results found');
            }
        },).catch((error) => {
            console.log(error);
        });



        setModalVisible(false);
    };


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
                    <Text style={[styles.resultsText, {color:colors.text}]}>{nbResults} {nbResults == 1 ? "Result founded" : "Results founded" } </Text>
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <FilterModal />
                    </Modal>
                    <TouchableOpacity  style={styles.filterButton} onPress={() => setModalVisible(true)}>
                        <Feather name={"filter"} size={22} color={colors.text} />
                    </TouchableOpacity>
                    <Separator />
                    <ScrollView keyboardShouldPersistTaps='always'>
                        {results.map((result : any) => {
                            return (
                                <TouchableOpacity key={result.id} style={[recipeStyles.blocRecipe, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.navigate('Recipe', {id :result.id, name: result.title})}>
                                    <View style={recipeStyles.imgRecipe}>
                                        {result.image ? <Image source={{uri: result.image}} style={recipeStyles.blocRecipeImage}/> : <Image source={require('../../assets/no-photo-resized-new.png')} style={recipeStyles.blocRecipeImage} />}
                                    </View>
                                    <View style={recipeStyles.blocRecipeBelow}>
                                        <Text style={[recipeStyles.blocRecipeImageText, {color:colors.text}]}>{result.title}</Text>
                                        <Text style={[recipeStyles.time, {color:colors.text}]}><Feather name="clock" size={20} color={colors.text}/> {result.readyInMinutes > 59 ? formatTime(result.readyInMinutes) : result.readyInMinutes + " min"}</Text>
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