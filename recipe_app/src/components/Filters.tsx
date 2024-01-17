import BouncyCheckboxGroup, {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Search_stylesheet";
import Feather from "react-native-vector-icons/Feather";
import Separator from "./Separator";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useScrollToTop, useTheme} from "@react-navigation/native";
import axios from "axios";
import RangeSlider from 'react-native-range-slider-expo';
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";

import {filtersList} from "../data/filtersList";
import {useLanguage} from "../translation/LanguageContext";
import {useTranslation} from "../translation/TranslationFunc";

interface IFilterModalProps {
    search: string;
    setResults: Dispatch<SetStateAction<any>>;
    setNbResults: Dispatch<SetStateAction<number>>;
    setIsSearch: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    setNoResults: Dispatch<SetStateAction<string>>;
    cuisine? : string;
    screenName? : string;
    // scrollRef?: any;
    category? : string;

}

export function FilterModal({search, setResults, setNbResults, setIsSearch, setLoading, setModalVisible, setNoResults, cuisine, screenName, category}: IFilterModalProps) {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const configValue : string | undefined = REACT_APP_API_KEY;


    const {colors} = useTheme();
    const theme = useTheme();
    const {sortList1, sortList2, sortList3, sortList4, sortList5} = filtersList({colors});

    const [filters, setFilters] = useState<any>({ sort: '', diet: [], intolerance: [], complexity: [], type: '', cuisine: [] });
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const colorSpec = theme.dark ? '#252525' : '#041721';
    const [filtered, setFiltered] = useState<boolean>(false);
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(999);
    const [value, setValue] = useState(0);
    const [translationSort, setTranslationSort] = useState("Sort by");
    const [translationDiet, setTranslationDiet] = useState("Diet");
    const [translationIntolerance, setTranslationIntolerance] = useState("Intolerance");
    const [translationType, setTranslationType] = useState("Type of Dish");
    const [translationCuisine, setTranslationCuisine] = useState("Culinary speciality");
    const [translationApply, setTranslationApply] = useState("Apply");
    const [translationVD, setTranslationVD] = useState("Video duration");
    const [translationNF, setTranslationNF] = useState("No results found");
    const [translationFilters, setTranslationFilters] = useState("Filters");
    const [translationTime, setTranslationTime] = useState("Time : ");
    const [translationSec, setTranslationSec] = useState(" sec to ");
    const [translationSec2, setTranslationSec2] = useState(" sec");


    const filterResult =  (filtersArray : any) => {

        let dietFilters = filtersArray.diet;
        let intoleranceFilters = filtersArray.intolerance;
        // let filteredRecipesbyComplexity = filtersArray.complexity;
        let dishTypeFilter = filtersArray.type;
        let cuisineFilters = cuisine ? cuisine : filtersArray.cuisine;
        let sortFilter = filtersArray.sort;

        if(category == 'filterRecipes') {

            axios.get('https://api.spoonacular.com/recipes/complexSearch', {
                params: {
                    apiKey: configValue,
                    query: search.toLowerCase(),
                    number: 100,
                    addRecipeInformation: true,
                    diet: dietFilters.toString(),
                    intolerances: intoleranceFilters.toString(),
                    type: dishTypeFilter,
                    cuisine: cuisineFilters,
                    sort: sortFilter
                }
            }).then((response1) => {
                setResults(response1.data.results);
                setNbResults(response1.data.results.length);
                setIsSearch(true);
                setLoading(false);
                setFiltered(true);
                if (response1.data.results.length == 0) {
                    setNoResults(translationNF);
                }
            },).catch((error) => {
                console.log(error);
            });

            // useScrollToTop(scrollRef);
            setModalVisible(false);

            //write the filters result in a file in the mock folder
        } else if (category == 'filterVideos') {
            axios.get('https://api.spoonacular.com/food/videos/search', {
                params: {
                    apiKey: configValue,
                    query: search.toLowerCase(),
                    number: 100,
                    diet: dietFilters.toString(),
                    type: dishTypeFilter,
                    cuisine: cuisineFilters,
                    minLength: fromValue,
                    maxLength: toValue,
                }
            }).then((response1) => {
                setResults(response1.data.videos);
                setNbResults(response1.data.videos.length);
                setIsSearch(true);
                setLoading(false);
                setFiltered(true);
                if (response1.data.videos.length == 0) {
                    setNoResults(translationNF);
                }
            },).catch((error) => {
                console.log(error);
            });
            setModalVisible(false);

        }
    };

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translationSort, translationDiet, translationIntolerance, translationType, translationCuisine, translationApply, translationVD, translationNF, translationFilters, translationTime, translationSec, translationSec2]);
                    setTranslationSort(elementsTranslated[0]);
                    setTranslationDiet(elementsTranslated[1]);
                    setTranslationIntolerance(elementsTranslated[2]);
                    setTranslationType(elementsTranslated[3]);
                    setTranslationCuisine(elementsTranslated[4]);
                    setTranslationApply(elementsTranslated[5]);
                    setTranslationVD(elementsTranslated[6]);
                    setTranslationNF(elementsTranslated[7]);
                    setTranslationFilters(elementsTranslated[8]);
                } catch (error) {
                    console.error('Erreur de traduction filterModal:', error);
                }

            }else {
                setTranslationSort("Sort by");
                setTranslationDiet("Diet");
                setTranslationIntolerance("Intolerance");
                setTranslationType("Type of Dish");
                setTranslationCuisine("Culinary speciality");
                setTranslationApply("Apply");
                setTranslationVD("Video duration");
                setTranslationNF("No results found");
                setTranslationFilters("Filters");
            }
        }
        fetchTranslation();
    }, [language]);

    //TODO: persist checkbox state

    return (
        <View style={styles.sideView}>
            <View style={[styles.modalContainer, {backgroundColor: colors.background}]}>
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, {color:colors.text}]}>{translationFilters}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Feather name={"x"} size={24} color={colors.text}/>
                    </TouchableOpacity>
                </View>
                <Separator />
                <ScrollView>
                    <View style={styles.modalBody}>
                        {category == 'filterRecipes' &&
                            <>
                                <Text style={[styles.modalText, {color:colors.text}]}>{translationSort}</Text>
                                <View style={styles.modalFilter}>
                                    <BouncyCheckboxGroup
                                        data={sortList1}
                                        style={{ flexDirection: "column" }}
                                        onChange={(selectedItem: ICheckboxButton) => {
                                            setFilters({ ...filters, sort: selectedItem.text?.toLowerCase() });
                                        }}
                                    />
                                </View>
                                <Separator />
                            </>
                        }
                        <Text style={[styles.modalText, {color:colors.text}]}>{translationDiet}</Text>
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
                        {category == 'filterRecipes' &&
                            <>
                                <Text style={[styles.modalText, {color:colors.text}]}>{translationIntolerance}</Text>
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
                                <Separator />
                            </>
                        }
                        <Text style={[styles.modalText, {color:colors.text}]}>{translationType}</Text>
                        <View style={styles.modalFilter}>
                            <BouncyCheckboxGroup
                                data={sortList4}
                                style={{ flexDirection: "column" }}
                                onChange={(selectedItem: ICheckboxButton) => {
                                    setFilters({ ...filters, type: selectedItem.text?.toLowerCase() });
                                }}
                            />
                        </View>
                        {screenName == 'Search' || category == 'filterVideos' &&
                            <>
                                <Separator />
                                <Text style={[styles.modalText, {color:colors.text}]}>{translationCuisine}</Text>
                                <View style={styles.modalFilter}>
                                    {sortList5.map((item, index) => {
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
                            </>
                        }
                        {category == 'filterVideos' &&
                            <>
                                <Separator />
                                <Text style={[styles.modalText, {color:colors.text}]}>{translationVD}</Text>
                                <View style={styles.modalFilter}>
                                    <RangeSlider min={0} max={999}
                                                 step={1}
                                                 fromValueOnChange={(value: React.SetStateAction<number>) => setFromValue(value)}
                                                 toValueOnChange={(value: React.SetStateAction<number>) => setToValue(value)}
                                                 initialFromValue={0}
                                                 inRangeBarColor={colorSpec}
                                                 outOfRangeBarColor={colors.border}
                                                 barHeight={5}
                                                 knobSize={20}
                                                 fromKnobColor={'#9fc131'}
                                                 toKnobColor={'#9fc131'}
                                                 rangeLabelsTextColor={colors.text}
                                    />
                                    <Text style={{color: colors.text}}>{translationTime} {fromValue} {translationSec} {toValue} {translationSec2} </Text>
                                </View>
                            </>
                        }
                    </View>
                </ScrollView>
                <Separator />
                <TouchableOpacity style={[styles.modalButton, {backgroundColor: colorSpec, borderColor: colors.border}]} onPress={() =>{filterResult(filters), setLoading(true)}} >
                    <Text style={styles.modalButtonText}>{translationApply}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


}