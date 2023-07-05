import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import Carousel from "react-native-snap-carousel";
import Recipe from "../screens/Recipe";
import {ScrollView, View, StyleSheet, Text} from "react-native";
import PagerView from "react-native-pager-view";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList, SearchStackList} from "../types/types";
import MyStackNavigationProp from "./MyStackNavigationProp";
import {useNavigation} from "@react-navigation/native";



interface CarouselRecipesProps {
    listeOfRecipes: (JSX.Element | undefined)[] | undefined;
    indexRecipe: number;
    lR : string[] | undefined;
}
type Props = NativeStackScreenProps<SearchStackList, 'Carousel'>
// @ts-ignore
type RecipesScreenProps = MyStackNavigationProp<HomeStackList, 'Recipe'>;


export const CarouselRecipes = ({listeOfRecipes, indexRecipe, lR} : CarouselRecipesProps) => {
    // type recipeProps = typeof listeOfRecipes[0];
    // const indx = Number(route.params.index);
    // const listeOfRecipes = route.params.listOfRecipes;
    // const [_, setActiveIndex] = useState<number>(indx);
    // const carouselEl = useRef(null);
    // const handleSnapToItem = (index: number) => {
    //     setActiveIndex(index);
    // };
    // const renderItem = ({ item, index }: { item: recipeProps; index: number }) => (
    //     <Recipe   navigation={item.id} route={item}/>
    // );
    const navigation = useNavigation<RecipesScreenProps>();
    const [activePage, setActivePage] = useState(indexRecipe);

    const setNextRecipe = (event: { nativeEvent: any; }) => {
        const { nativeEvent } = event;
        const nextPosition = nativeEvent.position;

        if (nextPosition !== activePage) {
            setActivePage(nextPosition);
        }

    }

    useEffect(() => {
        let namE : any = '';
        if (lR) {
            namE = lR[activePage]
            console.log(namE)
            // console.log("lr lenght:",lR.length);
            // console.log("active page", activePage);
            // console.log(lR[activePage]);
            namE = namE.title;
        }
        navigation.setOptions({
            headerTitle: namE,
        })

    }, [activePage]);


    return (
        <View style={{ flex: 1 }}>
            <PagerView style={styles.viewPager}  initialPage={indexRecipe} onPageScroll={setNextRecipe}>
                {listeOfRecipes}
            </PagerView>
        </View>

    );


}
const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});