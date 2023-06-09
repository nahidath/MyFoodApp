import {useEffect, useRef, useState} from "react";
import Carousel from "react-native-snap-carousel";
import Recipe from "../screens/Recipe";
import {ScrollView} from "react-native";



interface CarouselRecipesProps {
    listeOfRecipes: any;
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
        <Carousel
            ref={carouselEl}
            data={listeOfRecipes}
            renderItem={renderItem}
            layout={layout}
            onSnapToItem={handleSnapToItem}
        />
        // <ScrollView
        //     horizontal={true}
        //     showsHorizontalScrollIndicator={false}
        //     pagingEnabled={true}
        //     >
        //     {listeOfRecipes.map((item: recipeProps, index: number) => (
        //         <Recipe   navigation={item.id} route={item}/>
        //     ))}
        // </ScrollView>
    );


}