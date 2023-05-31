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
                    setNoResults('No results found');
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
                    setNoResults('No results found');
                }
            },).catch((error) => {
                console.log(error);
            });
            setModalVisible(false);

        }
    };


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
                        {category == 'filterRecipes' &&
                            <>
                                <Text style={[styles.modalText, {color:colors.text}]}>Sort by</Text>
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
                        {category == 'filterRecipes' &&
                            <>
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
                                <Separator />
                            </>
                        }
                        <Text style={[styles.modalText, {color:colors.text}]}>Type of Dish</Text>
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
                                <Text style={[styles.modalText, {color:colors.text}]}>Culinary speciality</Text>
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
                                <Text style={[styles.modalText, {color:colors.text}]}>Video duration</Text>
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
                                    <Text style={{color: colors.text}}>Time : {fromValue} sec to {toValue} sec </Text>
                                </View>
                            </>
                        }
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