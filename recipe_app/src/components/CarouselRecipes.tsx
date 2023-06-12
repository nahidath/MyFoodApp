import {useEffect, useRef, useState} from "react";
import Carousel from "react-native-snap-carousel";
import Recipe from "../screens/Recipe";
import {ScrollView, View} from "react-native";
import PagerView from "react-native-pager-view";



interface CarouselRecipesProps {
    listeOfRecipes: any[];
    indexRecipe: number;
    layout?: "default" | "stack" | "tinder" | undefined;
}


export const CarouselRecipes = ({listeOfRecipes, indexRecipe, layout} : CarouselRecipesProps) => {
    type recipeProps = typeof listeOfRecipes[0];
    const [_, setActiveIndex] = useState(indexRecipe);
    const carouselEl = useRef(null);
    const handleSnapToItem = (index: number) => {
        setActiveIndex(index);
    };
    const renderItem = ({ item, index }: { item: recipeProps; index: number }) => (
        <Recipe   navigation={item.id} route={item}/>
    );

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
            <PagerView  initialPage={indexRecipe}>
                {listeOfRecipes.map((item, index) => (
                    <Recipe navigation={item} route={item} key={index}/>
                ))}
            </PagerView>
        </View>
    );


}