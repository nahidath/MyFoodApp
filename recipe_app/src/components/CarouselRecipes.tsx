import {useEffect, useRef, useState} from "react";
import Carousel from "react-native-snap-carousel";
import Recipe from "../screens/Recipe";
import {ScrollView, View} from "react-native";
import PagerView from "react-native-pager-view";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {SearchStackList} from "../types/types";



// interface CarouselRecipesProps {
//     listeOfRecipes: any[];
//     indexRecipe: number;
//     layout?: "default" | "stack" | "tinder" | undefined;
// }
type Props = NativeStackScreenProps<SearchStackList, 'Carousel'>

export const CarouselRecipes = ({route} : Props) => {
    // type recipeProps = typeof listeOfRecipes[0];
    const indx = Number(route.params.index);
    const listeOfRecipes = route.params.listOfRecipes;
    const [_, setActiveIndex] = useState<number>(indx);
    const carouselEl = useRef(null);
    const handleSnapToItem = (index: number) => {
        setActiveIndex(index);
    };
    // const renderItem = ({ item, index }: { item: recipeProps; index: number }) => (
    //     <Recipe   navigation={item.id} route={item}/>
    // );

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
            <PagerView  initialPage={indx}>
                {listeOfRecipes.map((item, index) => (
                    <View key={index}>
                        <Recipe  navigation={item.id} route={item}/>
                    </View>
                ))}
            </PagerView>
        </View>
    );


}