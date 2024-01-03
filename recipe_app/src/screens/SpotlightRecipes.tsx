import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList} from "../types/types";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import React, {useEffect, useState} from "react";
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useTheme} from "@react-navigation/native";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import axios from "axios";
import styles from "../stylesheets/SpotlightRecipes_stylesheet";
import general from "../stylesheets/General_stylesheet";
import Feather from "react-native-vector-icons/Feather";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {colors} from "react-native-elements";
import recipeStyles from "../stylesheets/SpotlightRecipes_stylesheet";
import {SkeletonView} from "../components/SkeletonLoader";
import spotlightRecipes from "../mock/spotlightRecipes.json";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";

type Props = NativeStackScreenProps<HomeStackList, 'SpotlightRecipes'>;
// @ts-ignore
type SpotlightScreenProps = MyStackNavigationProp<HomeStackList, 'SpotlightRecipes'>;
const SpotlightRecipes = ({route}: Props) => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();

    const navigation = useNavigation<SpotlightScreenProps>();
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipesR, setRecipesR] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    let recipeFromHP  = route.params.recipesArray;
    const [translation1, setTranslation1] = useState<string>('Vegan');
    const [translation2, setTranslation2] = useState<string>('Very Healthy');
    const [translation3, setTranslation3] = useState<string>('Gluten Free');
    const [translation4, setTranslation4] = useState<string>('Vegetarian');
    const [translation5, setTranslation5] = useState<string>('Dairy Free');
    // console.log(route.params.recipesArray);

    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                } catch (error) {
                    console.log("Error in translation SpotlightRecipes: ", error);
                }
            } else {
                setTranslation1('Vegan');
                setTranslation2('Very Healthy');
                setTranslation3('Gluten Free');
                setTranslation4('Vegetarian');
                setTranslation5('Dairy Free');
            }
        }
        fetchTranslation();
    }, [language]);


    const getRecipes = () => {
        let dataRecipesMerged : string | any[] = [];
        axios.get('https://api.spoonacular.com/recipes/random',{params:{apiKey: configValue, number: 10} }).then((response) => {
            dataRecipesMerged = [...response.data.recipes, ...recipeFromHP];
            //filtering the array to remove duplicates
            dataRecipesMerged = dataRecipesMerged.filter((item: any, index: any) => {
                return dataRecipesMerged.indexOf(item) === index;
            });
            //sorting the array by average rating
            dataRecipesMerged.sort((a: any, b: any) => {
                return b.aggregateLikes - a.aggregateLikes;
            });
            setRecipesR(dataRecipesMerged);
            setLoading(false);
        },
        (error) => {
            dataRecipesMerged = [...spotlightRecipes.recipes, ...recipeFromHP];
            dataRecipesMerged = dataRecipesMerged.filter((item: any, index: any) => {
                return dataRecipesMerged.indexOf(item) === index;
            });
            dataRecipesMerged.sort((a: any, b: any) => {
                return b.aggregateLikes - a.aggregateLikes;
            });
            setRecipesR(dataRecipesMerged);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });


    }

    useEffect(() => {
        setLoading(true);
        getRecipes();
    },[])

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const m = minutes < 10 ? '0' + minutes : minutes
        return hours +'h' + m + ' min';
    }

    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {/*{loading && (*/}
            {/*    <View style={styles.loading}>*/}
            {/*        <SkeletonLoaderSearch theme={theme} color={colors} />*/}
            {/*    </View>*/}
            {/*)}*/}
            {loading ? <SkeletonView theme={theme} color={colors}/> :
            <ScrollView>
                {recipesR.map((recipe2: any) => {
                    return (
                        <TouchableOpacity key={recipe2.id} style={[styles.blocRecipe, general.shadow, {backgroundColor: colors.notification}]} onPress={() => navigation.push('Recipe', {id :recipe2.id, name: recipe2.title})}>
                            <View style={[styles.imgRecipe]}>
                                {recipe2.image ? <Image source={{uri: recipe2.image}} style={styles.blocRecipeImage}/> : <Image source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage} />}
                            </View>
                            <View style={styles.blocRecipeBelow}>
                                <Text style={[styles.blocRecipeImageText, {color:colors.text}]}>{recipe2.title}</Text>
                                <Text style={[styles.time, {color:colors.text}]}><Feather name="clock" size={20} color={colors.text}/> {recipe2.readyInMinutes > 59 ? formatTime(recipe2.readyInMinutes) :recipe2.readyInMinutes + " min"} </Text>
                                <View style={styles.blocRecipeLikes}>
                                    <Text style={[styles.recipeLikesText, {color:colors.text}]}>{recipe2.aggregateLikes} <FontAwesome style={styles.heart} name="thumbs-up" size={20} color="#9fc131" /></Text>
                                </View>
                            </View>
                            <View style={styles.blocRecipeLabel}>
                                {recipe2.vegan && <Text style={styles.blocRecipeLabelText}>{translation1}</Text>}
                                {recipe2.veryHealthy && <Text style={styles.blocRecipeLabelText}>{translation2}</Text>}
                                {recipe2.glutenFree && <Text style={styles.blocRecipeLabelText}>{translation3}</Text>}
                                {recipe2.vegetarian && <Text style={styles.blocRecipeLabelText}>{translation4}</Text>}
                                {recipe2.dairyFree && <Text style={styles.blocRecipeLabelText}>{translation5}</Text>}
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            }
        </View>
    )

}

export default SpotlightRecipes;