import {
    Button,
    FlatList,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Share,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Alert,
    LayoutChangeEvent,
    Modal,
    PanResponder,
    PanResponderInstance, Dimensions, NativeScrollEvent, NativeSyntheticEvent
} from "react-native";
import styles from "../stylesheets/Recipe_stylesheet";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {FC, useEffect, useRef, useState} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5Free from "react-native-vector-icons/FontAwesome";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList} from "../types/types";
import axios from "axios";
import * as WebBrowser from 'expo-web-browser';
import { LogBox } from 'react-native';
// import Share from "react-native-share";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import Feather from "react-native-vector-icons/Feather";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation, useTheme} from "@react-navigation/native";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {SkeletonLoader, SkeletonView} from "../components/SkeletonLoader";
import StarIconLike from "../components/StarIconLike";
//import recipe649503.json from mock directory
import recipeMock from "../mock/recipe649503.json";
import bulkRecipeMock from "../mock/bulkRecipeMock.json";
import app, {auth, database} from "../firebase/config";
import { ref, set, remove, child } from "firebase/database";
import RecipeVideo from "../components/RecipeVideo";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {CarouselRecipes} from "../components/CarouselRecipes";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";



type Props = NativeStackScreenProps<HomeStackList, 'Recipe'>;
// @ts-ignore
type RecipesScreenProps = MyStackNavigationProp<HomeStackList, 'Recipe'>;

const Recipe = ({route}: Props) => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const navigation = useNavigation<RecipesScreenProps>();
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipe, setRecipe] = useState<any>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    let lastTap : any = null;
    const {id} = route.params;
    const {name} = route.params;
    let {listOfRecipes} = route.params;
    const {listOfRecipesIDs} = route.params;
    const {screenFrom} = route.params;
    const {indxCurrent} = route.params;
    const [iC, setIC] = useState(indxCurrent ? indxCurrent : 0);
    const {colors} = useTheme();
    const theme = useTheme();
    const sourceUrlColor = theme.dark ? "#9892ef" : "#2319ad";
    const [animated, setAnimated] = useState<boolean>(false);
    const [titleLength, setTitleLength] = useState<number>(0);
    const [fontSize, setFontSize] = useState<number>(30);
    const titleRef = useRef<Text>(null);
    const [allRecipes , setAllRecipes] = useState<any>(listOfRecipes);
    const [translation1, setTranslation1] = useState<string>("minutes");
    const [translation2, setTranslation2] = useState<string>("Hey, I found this recipe on Recipe App, check it out!");
    const [translation3, setTranslation3] = useState<string>("Confirmation");
    const [translation4, setTranslation4] = useState<string>("Are you sure you want to delete this recipe?");
    const [translation5, setTranslation5] = useState<string>("No");
    const [translation6, setTranslation6] = useState<string>("Yes");
    const [translation7, setTranslation7] = useState<string>("Vegan");
    const [translation8, setTranslation8] = useState<string>("Vegetarian");
    const [translation9, setTranslation9] = useState<string>("Gluten Free");
    const [translation10, setTranslation10] = useState<string>("Dairy Free");
    const [translation11, setTranslation11] = useState<string>("Very Healthy");
    const [translation12, setTranslation12] = useState<string>("INGREDIENTS");
    const [translation13, setTranslation13] = useState<string>("No ingredients available");
    const [translation14, setTranslation14] = useState<string>("PREPARATION");
    const [translation15, setTranslation15] = useState<string>("No instructions available");
    const [translation16, setTranslation16] = useState<string>("Enjoy your meal !");
    const [translation17, setTranslation17] = useState<string>("Ready in");
    const [translation18, setTranslation18] = useState<string>("Serves");
    const [translation19, setTranslation19] = useState<string>("people");



    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6, translation7, translation8, translation9, translation10, translation11, translation12, translation13, translation14, translation15, translation16, translation17, translation18, translation19]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                    setTranslation6(elementsTranslated[5]);
                    setTranslation7(elementsTranslated[6]);
                    setTranslation8(elementsTranslated[7]);
                    setTranslation9(elementsTranslated[8]);
                    setTranslation10(elementsTranslated[9]);
                    setTranslation11(elementsTranslated[10]);
                    setTranslation12(elementsTranslated[11]);
                    setTranslation13(elementsTranslated[12]);
                    setTranslation14(elementsTranslated[13]);
                    setTranslation15(elementsTranslated[14]);
                    setTranslation16(elementsTranslated[15]);
                    setTranslation17(elementsTranslated[16]);
                    setTranslation18(elementsTranslated[17]);
                    setTranslation19(elementsTranslated[18]);
                } catch (error) {
                    console.error('Erreur de traduction Recipe:', error);
                }
            } else {
                setTranslation1("minutes");
                setTranslation2("Hey, I found this recipe on Recipe App, check it out!");
                setTranslation3("Confirmation");
                setTranslation4("Are you sure you want to delete this recipe?");
                setTranslation5("No");
                setTranslation6("Yes");
                setTranslation7("Vegan");
                setTranslation8("Vegetarian");
                setTranslation9("Gluten Free");
                setTranslation10("Dairy Free");
                setTranslation11("Very Healthy");
                setTranslation12("INGREDIENTS");
                setTranslation13("No ingredients available");
                setTranslation14("PREPARATION");
                setTranslation15("No instructions available");
                setTranslation16("Enjoy your meal !");
                setTranslation17("Ready in");
                setTranslation18("Serves");
                setTranslation19("people");
            }
        }
        fetchTranslation();
    }, [language]);


    const getRecipe = (idRecipe? : string) => {
        let idOfRecipe : string = idRecipe ? idRecipe : JSON.stringify(id);
        let dataInstruction : string | any[] = [];
        axios.get('https://api.spoonacular.com/recipes/'+idOfRecipe+'/information',{params:{apiKey: configValue} }).then((response) => {
            setRecipe(response.data);
            setIngredients(response.data.extendedIngredients.map((item: any) => item.original));
            dataInstruction = response.data.analyzedInstructions.map((item: any) => item.steps.map((item: any) => 'Step ' + item.number + ' : ' + item.step))
            setInstructions(dataInstruction[0]);
            setIsLoading(false);
            setTitleLength(response.data.title);
            setIsLoaded(true);
        }, (error) => {
            setRecipe(recipeMock);
            setIngredients(recipeMock.extendedIngredients.map((item: any) => item.original));
            dataInstruction = recipeMock.analyzedInstructions.map((item: any) => item.steps.map((item: any) => 'Step ' + item.number + ' : ' + item.step))
            setInstructions(dataInstruction[0]);
            setIsLoading(false);
            setIsLoaded(true);
            }).catch((error) => {
            console.log(error);


        });



    }



    //
    // useEffect(() => {
    //     if (listOfRecipesIDs) {
    //         console.log('search')
    //         console.log(listOfRecipesIDs.toString())
    //         setIsLoading(true);
    //         getMultipleRecipes();
    //
    //     }
    // }, [listOfRecipesIDs]);

    // console.log('allRecipes', allRecipes);




    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const m = minutes < 10 ? '0' + minutes : minutes
        return hours +'h' + m + translation1;
    }



    //share recipe
    let message : string = translation2+'\n'+'\n'+recipe.title+'\n'+'\n'+recipe.sourceUrl;
    const onShare = async () => {
        try {
            await Share.share({
                message
            });
        } catch (err) {
            console.log(err);
        }
    }

   const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            if(!auth.currentUser) {
                Alert.alert('Warning',
                    'You need to be logged in to save a recipe');
                return;
            }
            setSaved(true);
            saveRecipe();
            setAnimated(true);
            setTimeout(() => {
                setAnimated(false)
            }, 500);
        } else {
            lastTap = now;
        }
   }

    const confirmDelete = () => {
        Alert.alert(
            translation3,
            translation4,
            [
                {
                    text: translation5,
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                },
                {text: translation6, onPress: () => deleteRecipe()},
            ],
            {cancelable: false},
        );
    }


    const deleteRecipe = () => {
        setSaved(false);
        const db = ref(database);
        const user = auth.currentUser;
        const userId = user?.uid;
        const recipeId = recipe.id;
        const recipeRef = child(db, `users/${userId}/recipes/${recipeId}`);
        remove(recipeRef).then(() => {
            console.log('Recipe deleted successfully');
        }).catch((error: any) => {
            console.log(error);
        });
    }

//save recipe into firebase database
    const saveRecipe = () => {
        const db = ref(database);
        const user = auth.currentUser;
        const userID = user?.uid;
        const recipeID = recipe.id;
        const recipeData = {
            recipeID: recipeID,
            userID: userID,
        };
        set(child(db, `users/${userID}/recipes/${recipeID}`), true).then(r => {
            console.log('Recipe saved successfully');

        });

    }

    const handleSave = () => {
        if(!auth.currentUser) {
            Alert.alert('Warning','You need to be logged in to save a recipe');
            return;
        }
        if(saved) {
            confirmDelete();
        } else {
            setSaved(true);
            saveRecipe();
            setAnimated(true);
            setTimeout(() => {
                setAnimated(false)
            }, 500);
        }
    }

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.measure((x: any, y: any, width: number, height: any, pageX: any, pageY: any) => {
                if (height > 80) {
                    setFontSize(fontSize - 2);
                }
            });
        }
    }, [fontSize]);
    const handleTextLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (height > 80 && fontSize > 20) {
            setFontSize(fontSize - 2);
        }
    };

    const getMultipleRecipes = (idss : any) => {
        axios.get('https://api.spoonacular.com/recipes/informationBulk',{params:{apiKey: configValue, ids: idss.toString()} }).then((response) => {
            setAllRecipes(response.data);
            setIsLoading(false);
        }, (error) => {
            setAllRecipes(bulkRecipeMock);
            setIsLoading(false);
            console.log("1 " ,error);
        }).catch((error) => {
            console.log("2 ", error);
        });
    }

    useEffect(() => {
        if(screenFrom === 'Search' && listOfRecipesIDs) {
            // console.log('search')
            // console.log(listOfRecipesIDs.toString())
            setIsLoading(true);
            getMultipleRecipes(listOfRecipesIDs);
        }
        setAllRecipes(listOfRecipes);
    }, [listOfRecipesIDs]);



    // console.log(listOfRecipes?.length);

    const renderedList = allRecipes?.map((recipe: any, index : any) => {
        const [translationA, setTranslationA] = useState<string>(recipe.title);
        const [translationB, setTranslationB] = useState<any>(recipe.extendedIngredients.map((item: any) => item.original));
        const [translationC, setTranslationC] = useState<any>(recipe.analyzedInstructions.map((item: any) => item.steps.map((item: any) => item.number + '. ' + item.step + '\n\n')));

        //TODO: fix translation
        // if(language != 'EN-US') {
        //     const fetchTranslation = async () => {
        //         try {
        //             const elementsTranslated = await translationFunc([translationA, translationB.toString(), translationC.toString()]);
        //             setTranslationA(elementsTranslated[0]);
        //             setTranslationB(elementsTranslated[1].split(','));
        //             setTranslationC(elementsTranslated[2].split(','));
        //         } catch (error) {
        //             console.error('Erreur de traduction Recipe2:', error);
        //         }
        //     }
        //     fetchTranslation();
        // }else {
        //     setTranslationA(recipe.title);
        //     setTranslationB(recipe.extendedIngredients.map((item: any) => item.original));
        //     setTranslationC(recipe.analyzedInstructions.map((item: any) => item.steps.map((item: any) => item.number + '. ' + item.step)));
        // }

        const getLabels = () => {
            let allLabels : string[] = [];
            const vegan : string = translation7;
            const vegetarian : string = translation8;
            const glutenFree : string = translation9;
            const dairyFree : string = translation10;
            const veryHealthy : string = translation11;

            if (recipe.vegan) {
                allLabels.push(vegan);
            }
            if (recipe.vegetarian) {
                allLabels.push(vegetarian);
            }
            if (recipe.glutenFree) {
                allLabels.push(glutenFree);
            }
            if (recipe.dairyFree) {
                allLabels.push(dairyFree);
            }
            if (recipe.veryHealthy) {
                allLabels.push(veryHealthy);
            }

            return allLabels;
        }

            return (
                <ScrollView key={index}>
                    <View style={styles.headerRecipeImage} >
                        <TouchableWithoutFeedback style={{zIndex: 100}} onPress={() => handleDoubleTap()}>
                            {recipe.image ? <ImageBackground source={{uri: recipe.image}} style={styles.blocRecipeImage} imageStyle={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} /> : <ImageBackground source={require('../../assets/no-photo-resized-new.png')} style={styles.blocRecipeImage}/>}
                        </TouchableWithoutFeedback>
                        {animated && <StarIconLike  scale={2} />}
                        <TouchableOpacity style={styles.shareBtn} onPress={() => onShare()}>
                            <Feather  name="share-2" size={32} color={"#fefefe"}  />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.heartBtn} onPress={() => handleSave()}>
                            {saved ? <FontAwesome name="heart" size={32} color={"#f8cf19"} /> : <FontAwesome name="heart-o" size={32} color={"#fefefe"} />}
                        </TouchableOpacity>
                        <View style={styles.headerRecipeLabel}>
                            {getLabels().map((label, index) => (
                                <Text key={index} style={styles.headerRecipeLabelText}>{label}</Text>
                            ))}
                        </View>
                        <LinearGradient
                            colors={['transparent','rgba(0,0,0,0.8)' ]}
                            style={styles.blocRecipeGradient}
                        >
                            {/*{recipe.title.length > 30 ? <Text style={styles.headerRecipeImageTextSmall}>{recipe.title}</Text> : <Text style={styles.headerRecipeImageText}>{recipe.title}</Text>}*/}
                            <Text ref={titleRef} style={[styles.headerRecipeImageText, {fontSize: fontSize}]} onLayout={handleTextLayout}>{translationA}</Text>
                            {/*<Text style={styles.headerRecipeImageText}>{recipe.title}</Text>*/}
                            <View style={styles.recipeLikes}>
                                <Text style={styles.recipeLikesText}>{recipe.aggregateLikes}</Text>
                                <FontAwesome style={styles.heart} name="thumbs-up" size={20} color="#9fc131" />
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={styles.recipeInfos}>
                        <Text style={[styles.time, {color:colors.text}]}><Feather name="clock" size={20} color={colors.text}/> {translation17} {recipe.readyInMinutes > 59 ? formatTime(recipe.readyInMinutes) :recipe.readyInMinutes + " " + translation1} </Text>
                        <Text style={[styles.servings, {color:colors.text}]}><Feather name="user" size={20} color={colors.text}/>  {translation18 + " " + recipe.servings + " " + translation19} </Text>
                        <View style={styles.ingredientList}>
                            <Text style={[styles.ingredientListTitle, {color:colors.text}]}>{translation12}</Text>
                            {translationB.length == 0 ? <Text style={[styles.items, {color:colors.text, fontStyle: "italic"}]}>{translation13}</Text>  :
                                translationB.map((ingredient : any, index: any) => (
                                <Text key={index} style={[styles.items, {color:colors.text}]}>- {ingredient}</Text>
                            ))}
                        </View>
                        <View style={styles.recipeDescription}>
                            <Text style={[styles.titleDesc, {color:colors.text}]}>{translation14}</Text>
                            {translationC.length == 0 ? <Text style={[styles.items, {color:colors.text, fontStyle: "italic"}]}>{translation15}</Text>  : translationC.map((step: any, index: any) => (
                                <Text key={index} style={[styles.items, {color:colors.text}]}>{step}</Text>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.enjoy}>{translation16} 😋</Text>
                    <Text style={[styles.source, {color:colors.text}]}>Source : <Text style={[styles.sourceLink, {color: sourceUrlColor}]} onPress={() => WebBrowser.openBrowserAsync(recipe.sourceUrl)}>{recipe.sourceUrl}</Text> </Text>
                </ScrollView>
            )
    })



    return (
        <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            {isLoading ? <SkeletonView theme={theme} color={colors}/> :

                <CarouselRecipes listeOfRecipes={renderedList} indexRecipe={indxCurrent ? indxCurrent : 0}  lR={allRecipes}/>
            }
        </View>
    );
}

export default Recipe;