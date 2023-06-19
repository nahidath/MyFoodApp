import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import Carousel from "react-native-snap-carousel";
import Recipe from "../screens/Recipe";
import {ScrollView, View, StyleSheet, Text} from "react-native";
import PagerView from "react-native-pager-view";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {SearchStackList} from "../types/types";



interface CarouselRecipesProps {
    listeOfRecipes: (JSX.Element | undefined)[] | undefined;
    indexRecipe: number;
    setRecipe: Dispatch<SetStateAction<any>>;
}
type Props = NativeStackScreenProps<SearchStackList, 'Carousel'>

export const CarouselRecipes = ({listeOfRecipes, indexRecipe, setRecipe} : CarouselRecipesProps) => {
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

    const setNextRecipe = () => {
        console.log("next recipe");
        setRecipe((prev: number) => prev + 1);
    }


    return (
        // <Carousel
        //     ref={carouselEl}
        //     data={listeOfRecipes}
        //     renderItem={renderItem}
        //     layout={layout}
        //     onSnapToItem={handleSnapToItem}
        // />
        // <ScrollView
        //     horizontal={true}
        //     showsHorizontalScrollIndicator={false}
        //     pagingEnabled={true}
        //     >
        //     {listeOfRecipes.map((item: recipeProps, index: number) => (
        //         <Recipe   navigation={item.id} route={item}/>
        //     ))}
        // </ScrollView>
        <View style={{ flex: 1 }}>
            <PagerView style={styles.viewPager}   initialPage={indexRecipe} onPageScroll={() => setNextRecipe()}>
                {/*<View style={styles.page} key="1">*/}
                {/*    <Text>First page</Text>*/}
                {/*    <Text>Swipe ➡️</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.page} key="2">*/}
                {/*    <Text>Second page</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.page} key="3">*/}
                {/*    <Text>Third page</Text>*/}
                {/*</View>*/}
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