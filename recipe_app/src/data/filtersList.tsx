import {useTheme} from "@react-navigation/native";
import {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import {useLanguage} from "../translation/LanguageContext";
import {useEffect, useState} from "react";
import {useTranslation} from "../translation/TranslationFunc";

interface IFilterList {
    colors?: any;
}


export function filtersList({colors}: IFilterList) {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const [translationPopularity, setTranslationPopularity] = useState("Popularity");
    const [translationPrice, setTranslationPrice] = useState("Price");
    const [translationTime, setTranslationTime] = useState("Time");
    const [translationGlutenFree, setTranslationGlutenFree] = useState("Gluten Free");
    const [translationKetogenic, setTranslationKetogenic] = useState("Ketogenic");
    const [translationVegetarian, setTranslationVegetarian] = useState("Vegetarian");
    const [translationLactoVegetarian, setTranslationLactoVegetarian] = useState("Lacto-Vegetarian");
    const [translationOvoVegetarian, setTranslationOvoVegetarian] = useState("Ovo-Vegetarian");
    const [translationVegan, setTranslationVegan] = useState("Vegan");
    const [translationPescetarian, setTranslationPescetarian] = useState("Pescetarian");
    const [translationPaleo, setTranslationPaleo] = useState("Paleo");
    const [translationPrimal, setTranslationPrimal] = useState("Primal");
    const [translationWhole30, setTranslationWhole30] = useState("Whole30");
    const [translationDairy, setTranslationDairy] = useState("Dairy");
    const [translationEgg, setTranslationEgg] = useState("Egg");
    const [translationGluten, setTranslationGluten] = useState("Gluten");
    const [translationGrain, setTranslationGrain] = useState("Grain");
    const [translationPeanut, setTranslationPeanut] = useState("Peanut");
    const [translationSeafood, setTranslationSeafood] = useState("Seafood");
    const [translationSesame, setTranslationSesame] = useState("Sesame");
    const [translationShellfish, setTranslationShellfish] = useState("Shellfish");
    const [translationSoy, setTranslationSoy] = useState("Soy");
    const [translationSulfite, setTranslationSulfite] = useState("Sulfite");
    const [translationTreeNut, setTranslationTreeNut] = useState("Tree Nut");
    const [translationWheat, setTranslationWheat] = useState("Wheat");
    const [translationBreakfast, setTranslationBreakfast] = useState("Breakfast");
    const [translationLunch, setTranslationLunch] = useState("Lunch");
    const [translationDinner, setTranslationDinner] = useState("Dinner");
    const [translationSnack, setTranslationSnack] = useState("Snack");
    const [translationTeatime, setTranslationTeatime] = useState("Teatime");
    const [translationSauce, setTranslationSauce] = useState("Sauce");
    const [translationDrink, setTranslationDrink] = useState("Drink");
    const [translationDessert, setTranslationDessert] = useState("Dessert");
    const [translationAppetizer, setTranslationAppetizer] = useState("Appetizer");
    const [translationSalad, setTranslationSalad] = useState("Salad");
    const [translationBread, setTranslationBread] = useState("Bread");
    const [translationSoup, setTranslationSoup] = useState("Soup");
    const [translationBeverage, setTranslationBeverage] = useState("Beverage");
    const [translationMarinade, setTranslationMarinade] = useState("Marinade");
    const [translationFingerfood, setTranslationFingerfood] = useState("Fingerfood");
    const [translationMainCourse, setTranslationMainCourse] = useState("Main Course");
    const [translationSideDish, setTranslationSideDish] = useState("Side Dish");
    const [translationAmerican, setTranslationAmerican] = useState("American");
    const [translationBritish, setTranslationBritish] = useState("British");
    const [translationCajun, setTranslationCajun] = useState("Cajun");
    const [translationCaribbean, setTranslationCaribbean] = useState("Caribbean");
    const [translationChinese, setTranslationChinese] = useState("Chinese");
    const [translationEasternEuropean, setTranslationEasternEuropean] = useState("Eastern European");
    const [translationEuropean, setTranslationEuropean] = useState("European");
    const [translationFrench, setTranslationFrench] = useState("French");
    const [translationGerman, setTranslationGerman] = useState("German");
    const [translationGreek, setTranslationGreek] = useState("Greek");
    const [translationIndian, setTranslationIndian] = useState("Indian");
    const [translationIrish, setTranslationIrish] = useState("Irish");
    const [translationItalian, setTranslationItalian] = useState("Italian");
    const [translationJapanese, setTranslationJapanese] = useState("Japanese");
    const [translationJewish, setTranslationJewish] = useState("Jewish");
    const [translationKorean, setTranslationKorean] = useState("Korean");
    const [translationLatinAmerican, setTranslationLatinAmerican] = useState("Latin American");
    const [translationMediterranean, setTranslationMediterranean] = useState("Mediterranean");
    const [translationMexican, setTranslationMexican] = useState("Mexican");
    const [translationMiddleEastern, setTranslationMiddleEastern] = useState("Middle Eastern");
    const [translationNordic, setTranslationNordic] = useState("Nordic");
    const [translationSouthern, setTranslationSouthern] = useState("Southern");
    const [translationSpanish, setTranslationSpanish] = useState("Spanish");
    const [translationThai, setTranslationThai] = useState("Thai");
    const [translationVietnamese, setTranslationVietnamese] = useState("Vietnamese");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translationPopularity, translationPrice, translationTime, translationGlutenFree, translationKetogenic, translationVegetarian, translationLactoVegetarian, translationOvoVegetarian, translationVegan, translationPescetarian, translationPaleo, translationPrimal, translationWhole30, translationDairy, translationEgg, translationGluten, translationGrain, translationPeanut, translationSeafood, translationSesame, translationShellfish, translationSoy, translationSulfite, translationTreeNut, translationWheat, translationBreakfast, translationLunch, translationDinner, translationSnack, translationTeatime, translationSauce, translationDrink, translationDessert, translationAppetizer, translationSalad, translationBread, translationSoup, translationBeverage, translationMarinade, translationFingerfood, translationMainCourse, translationSideDish, translationAmerican, translationBritish, translationCajun, translationCaribbean, translationChinese, translationEasternEuropean, translationEuropean, translationFrench, translationGerman, translationGreek, translationIndian, translationIrish, translationItalian, translationJapanese, translationJewish, translationKorean, translationLatinAmerican, translationMediterranean, translationMexican, translationMiddleEastern, translationNordic, translationSouthern, translationSpanish, translationThai, translationVietnamese]);
                    setTranslationPopularity(elementsTranslated[0]);
                    setTranslationPrice(elementsTranslated[1]);
                    setTranslationTime(elementsTranslated[2]);
                    setTranslationGlutenFree(elementsTranslated[3]);
                    setTranslationKetogenic(elementsTranslated[4]);
                    setTranslationVegetarian(elementsTranslated[5]);
                    setTranslationLactoVegetarian(elementsTranslated[6]);
                    setTranslationOvoVegetarian(elementsTranslated[7]);
                    setTranslationVegan(elementsTranslated[8]);
                    setTranslationPescetarian(elementsTranslated[9]);
                    setTranslationPaleo(elementsTranslated[10]);
                    setTranslationPrimal(elementsTranslated[11]);
                    setTranslationWhole30(elementsTranslated[12]);
                    setTranslationDairy(elementsTranslated[13]);
                    setTranslationEgg(elementsTranslated[14]);
                    setTranslationGluten(elementsTranslated[15]);
                    setTranslationGrain(elementsTranslated[16]);
                    setTranslationPeanut(elementsTranslated[17]);
                    setTranslationSeafood(elementsTranslated[18]);
                    setTranslationSesame(elementsTranslated[19]);
                    setTranslationShellfish(elementsTranslated[20]);
                    setTranslationSoy(elementsTranslated[21]);
                    setTranslationSulfite(elementsTranslated[22]);
                    setTranslationTreeNut(elementsTranslated[23]);
                    setTranslationWheat(elementsTranslated[24]);
                    setTranslationBreakfast(elementsTranslated[25]);
                    setTranslationLunch(elementsTranslated[26]);
                    setTranslationDinner(elementsTranslated[27]);
                    setTranslationSnack(elementsTranslated[28]);
                    setTranslationTeatime(elementsTranslated[29]);
                    setTranslationSauce(elementsTranslated[30]);
                    setTranslationDrink(elementsTranslated[31]);
                    setTranslationDessert(elementsTranslated[32]);
                    setTranslationAppetizer(elementsTranslated[33]);
                    setTranslationSalad(elementsTranslated[34]);
                    setTranslationBread(elementsTranslated[35]);
                    setTranslationSoup(elementsTranslated[36]);
                    setTranslationBeverage(elementsTranslated[37]);
                    setTranslationMarinade(elementsTranslated[38]);
                    setTranslationFingerfood(elementsTranslated[39]);
                    setTranslationMainCourse(elementsTranslated[40]);
                    setTranslationSideDish(elementsTranslated[41]);
                    setTranslationAmerican(elementsTranslated[42]);
                    setTranslationBritish(elementsTranslated[43]);
                    setTranslationCajun(elementsTranslated[44]);
                    setTranslationCaribbean(elementsTranslated[45]);
                    setTranslationChinese(elementsTranslated[46]);
                    setTranslationEasternEuropean(elementsTranslated[47]);
                    setTranslationEuropean(elementsTranslated[48]);
                    setTranslationFrench(elementsTranslated[49]);
                    setTranslationGerman(elementsTranslated[50]);
                    setTranslationGreek(elementsTranslated[51]);
                    setTranslationIndian(elementsTranslated[52]);
                    setTranslationIrish(elementsTranslated[53]);
                    setTranslationItalian(elementsTranslated[54]);
                    setTranslationJapanese(elementsTranslated[55]);
                    setTranslationJewish(elementsTranslated[56]);
                    setTranslationKorean(elementsTranslated[57]);
                    setTranslationLatinAmerican(elementsTranslated[58]);
                    setTranslationMediterranean(elementsTranslated[59]);
                    setTranslationMexican(elementsTranslated[60]);
                    setTranslationMiddleEastern(elementsTranslated[61]);
                    setTranslationNordic(elementsTranslated[62]);
                    setTranslationSouthern(elementsTranslated[63]);
                    setTranslationSpanish(elementsTranslated[64]);
                    setTranslationThai(elementsTranslated[65]);
                    setTranslationVietnamese(elementsTranslated[66]);
                } catch (error) {
                    console.error('Erreur de traduction filtersList:', error);
                }
            }else {
                setTranslationPopularity("Popularity");
                setTranslationPrice("Price");
                setTranslationTime("Time");
                setTranslationGlutenFree("Gluten Free");
                setTranslationKetogenic("Ketogenic");
                setTranslationVegetarian("Vegetarian");
                setTranslationLactoVegetarian("Lacto-Vegetarian");
                setTranslationOvoVegetarian("Ovo-Vegetarian");
                setTranslationVegan("Vegan");
                setTranslationPescetarian("Pescetarian");
                setTranslationPaleo("Paleo");
                setTranslationPrimal("Primal");
                setTranslationWhole30("Whole30");
                setTranslationDairy("Dairy");
                setTranslationEgg("Egg");
                setTranslationGluten("Gluten");
                setTranslationGrain("Grain");
                setTranslationPeanut("Peanut");
                setTranslationSeafood("Seafood");
                setTranslationSesame("Sesame");
                setTranslationShellfish("Shellfish");
                setTranslationSoy("Soy");
                setTranslationSulfite("Sulfite");
                setTranslationTreeNut("Tree Nut");
                setTranslationWheat("Wheat");
                setTranslationBreakfast("Breakfast");
                setTranslationLunch("Lunch");
                setTranslationDinner("Dinner");
                setTranslationSnack("Snack");
                setTranslationTeatime("Teatime");
                setTranslationSauce("Sauce");
                setTranslationDrink("Drink");
                setTranslationDessert("Dessert");
                setTranslationAppetizer("Appetizer");
                setTranslationSalad("Salad");
                setTranslationBread("Bread");
                setTranslationSoup("Soup");
                setTranslationBeverage("Beverage");
                setTranslationMarinade("Marinade");
                setTranslationFingerfood("Fingerfood");
                setTranslationMainCourse("Main Course");
                setTranslationSideDish("Side Dish");
                setTranslationAmerican("American");
                setTranslationBritish("British");
                setTranslationCajun("Cajun");
                setTranslationCaribbean("Caribbean");
                setTranslationChinese("Chinese");
                setTranslationEasternEuropean("Eastern European");
                setTranslationEuropean("European");
                setTranslationFrench("French");
                setTranslationGerman("German");
                setTranslationGreek("Greek");
                setTranslationIndian("Indian");
                setTranslationIrish("Irish");
                setTranslationItalian("Italian");
                setTranslationJapanese("Japanese");
                setTranslationJewish("Jewish");
                setTranslationKorean("Korean");
                setTranslationLatinAmerican("Latin American");
                setTranslationMediterranean("Mediterranean");
                setTranslationMexican("Mexican");
                setTranslationMiddleEastern("Middle Eastern");
                setTranslationNordic("Nordic");
                setTranslationSouthern("Southern");
                setTranslationSpanish("Spanish");
                setTranslationThai("Thai");
                setTranslationVietnamese("Vietnamese");
            }
        }
        fetchTranslation();
    }, [language]);


    const sortList1: ICheckboxButton[] = [
        {
            id: 0,
            text: translationPopularity,
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
            text: translationPrice,
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
            text: translationTime,
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
    const sortList2 = [{id: 1, name: translationGlutenFree}, {id: 2, name: translationKetogenic}, {id: 3, name: translationVegetarian}, {id: 4, name: translationLactoVegetarian}, {id: 5, name: translationOvoVegetarian}, {id: 6, name: translationVegan}, {id: 7, name: translationPescetarian}, {id: 8, name: translationPaleo}, {id: 9, name: translationPrimal}, {id: 10, name: translationWhole30}];
    const sortList3 = [{id: 1, name: translationDairy}, {id: 2, name: translationEgg}, {id: 3, name: translationGluten}, {id: 4, name: translationGrain}, {id: 5, name: translationPeanut}, {id: 6, name: translationSeafood}, {id: 7, name: translationSesame}, {id: 8, name: translationShellfish}, {id: 9, name: translationSoy}, {id: 10, name: translationSulfite}, {id: 11, name: translationTreeNut}, {id: 12, name: translationWheat}];
    const sortList4 : ICheckboxButton[] = [
        {
            id: 1,
            text: translationBreakfast,
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
            text: translationLunch,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}


        },
        {
            id: 3, text: translationDinner,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 4, text: translationSnack,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 5, text: translationTeatime,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 6, text: translationSauce,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 7, text :translationDrink,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 8, text: translationDessert,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 9, text: translationAppetizer,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 10,text: translationSalad,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 11,text: translationBread,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 12,text: translationSoup,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 13,text: translationBeverage,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 14,text: translationMarinade,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 15,text: translationFingerfood,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 16,text: translationMainCourse,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 17,text: translationSideDish,
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        }
    ];
    const sortList5 = [{id: 1, name: translationAmerican}, {id: 2, name: translationBritish}, {id: 3, name: translationCajun}, {id: 4, name: translationCaribbean}, {id: 5, name: translationChinese}, {id: 6, name: translationEasternEuropean}, {id: 7, name: translationEuropean}, {id: 8, name: translationFrench}, {id: 9, name: translationGerman}, {id: 10, name: translationGreek}, {id: 11, name: translationIndian}, {id: 12, name: translationIrish}, {id: 13, name: translationItalian}, {id: 14, name: translationJapanese}, {id: 15, name: translationJewish}, {id: 16, name: translationKorean}, {id: 17, name: translationLatinAmerican}, {id: 18, name: translationMediterranean}, {id: 19, name: translationMexican}, {id: 20, name: translationMiddleEastern}, {id: 21, name: translationNordic}, {id: 22, name: translationSouthern}, {id: 23, name: translationSpanish}, {id: 24, name: translationThai}, {id: 25, name: translationVietnamese}];

    return {
        sortList1,
        sortList2,
        sortList3,
        sortList4,
        sortList5
    }
}



