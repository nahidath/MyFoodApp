import {useTheme} from "@react-navigation/native";
import {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import {useLanguage} from "../translation/LanguageContext";
import {useEffect, useState} from "react";

interface IFilterList {
    colors?: any;
}


export function filtersList({colors}: IFilterList) {
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
                    const translationOfPopularity = await t(translationPopularity);
                    const translationOfPrice = await t(translationPrice);
                    const translationOfTime = await t(translationTime);
                    const translationOfGlutenFree = await t(translationGlutenFree);
                    const translationOfKetogenic = await t(translationKetogenic);
                    const translationOfVegetarian = await t(translationVegetarian);
                    const translationOfLactoVegetarian = await t(translationLactoVegetarian);
                    const translationOfOvoVegetarian = await t(translationOvoVegetarian);
                    const translationOfVegan = await t(translationVegan);
                    const translationOfPescetarian = await t(translationPescetarian);
                    const translationOfPaleo = await t(translationPaleo);
                    const translationOfPrimal = await t(translationPrimal);
                    const translationOfWhole30 = await t(translationWhole30);
                    const translationOfDairy = await t(translationDairy);
                    const translationOfEgg = await t(translationEgg);
                    const translationOfGluten = await t(translationGluten);
                    const translationOfGrain = await t(translationGrain);
                    const translationOfPeanut = await t(translationPeanut);
                    const translationOfSeafood = await t(translationSeafood);
                    const translationOfSesame = await t(translationSesame);
                    const translationOfShellfish = await t(translationShellfish);
                    const translationOfSoy = await t(translationSoy);
                    const translationOfSulfite = await t(translationSulfite);
                    const translationOfTreeNut = await t(translationTreeNut);
                    const translationOfWheat = await t(translationWheat);
                    const translationOfBreakfast = await t(translationBreakfast);
                    const translationOfLunch = await t(translationLunch);
                    const translationOfDinner = await t(translationDinner);
                    const translationOfSnack = await t(translationSnack);
                    const translationOfTeatime = await t(translationTeatime);
                    const translationOfSauce = await t(translationSauce);
                    const translationOfDrink = await t(translationDrink);
                    const translationOfDessert = await t(translationDessert);
                    const translationOfAppetizer = await t(translationAppetizer);
                    const translationOfSalad = await t(translationSalad);
                    const translationOfBread = await t(translationBread);
                    const translationOfSoup = await t(translationSoup);
                    const translationOfBeverage = await t(translationBeverage);
                    const translationOfMarinade = await t(translationMarinade);
                    const translationOfFingerfood = await t(translationFingerfood);
                    const translationOfMainCourse = await t(translationMainCourse);
                    const translationOfSideDish = await t(translationSideDish);
                    const translationOfAmerican = await t(translationAmerican);
                    const translationOfBritish = await t(translationBritish);
                    const translationOfCajun = await t(translationCajun);
                    const translationOfCaribbean = await t(translationCaribbean);
                    const translationOfChinese = await t(translationChinese);
                    const translationOfEasternEuropean = await t(translationEasternEuropean);
                    const translationOfEuropean = await t(translationEuropean);
                    const translationOfFrench = await t(translationFrench);
                    const translationOfGerman = await t(translationGerman);
                    const translationOfGreek = await t(translationGreek);
                    const translationOfIndian = await t(translationIndian);
                    const translationOfIrish = await t(translationIrish);
                    const translationOfItalian = await t(translationItalian);
                    const translationOfJapanese = await t(translationJapanese);
                    const translationOfJewish = await t(translationJewish);
                    const translationOfKorean = await t(translationKorean);
                    const translationOfLatinAmerican = await t(translationLatinAmerican);
                    const translationOfMediterranean = await t(translationMediterranean);
                    const translationOfMexican = await t(translationMexican);
                    const translationOfMiddleEastern = await t(translationMiddleEastern);
                    const translationOfNordic = await t(translationNordic);
                    const translationOfSouthern = await t(translationSouthern);
                    const translationOfSpanish = await t(translationSpanish);
                    const translationOfThai = await t(translationThai);
                    const translationOfVietnamese = await t(translationVietnamese);
                    setTranslationPopularity(translationOfPopularity);
                    setTranslationPrice(translationOfPrice);
                    setTranslationTime(translationOfTime);
                    setTranslationGlutenFree(translationOfGlutenFree);
                    setTranslationKetogenic(translationOfKetogenic);
                    setTranslationVegetarian(translationOfVegetarian);
                    setTranslationLactoVegetarian(translationOfLactoVegetarian);
                    setTranslationOvoVegetarian(translationOfOvoVegetarian);
                    setTranslationVegan(translationOfVegan);
                    setTranslationPescetarian(translationOfPescetarian);
                    setTranslationPaleo(translationOfPaleo);
                    setTranslationPrimal(translationOfPrimal);
                    setTranslationWhole30(translationOfWhole30);
                    setTranslationDairy(translationOfDairy);
                    setTranslationEgg(translationOfEgg);
                    setTranslationGluten(translationOfGluten);
                    setTranslationGrain(translationOfGrain);
                    setTranslationPeanut(translationOfPeanut);
                    setTranslationSeafood(translationOfSeafood);
                    setTranslationSesame(translationOfSesame);
                    setTranslationShellfish(translationOfShellfish);
                    setTranslationSoy(translationOfSoy);
                    setTranslationSulfite(translationOfSulfite);
                    setTranslationTreeNut(translationOfTreeNut);
                    setTranslationWheat(translationOfWheat);
                    setTranslationBreakfast(translationOfBreakfast);
                    setTranslationLunch(translationOfLunch);
                    setTranslationDinner(translationOfDinner);
                    setTranslationSnack(translationOfSnack);
                    setTranslationTeatime(translationOfTeatime);
                    setTranslationSauce(translationOfSauce);
                    setTranslationDrink(translationOfDrink);
                    setTranslationDessert(translationOfDessert);
                    setTranslationAppetizer(translationOfAppetizer);
                    setTranslationSalad(translationOfSalad);
                    setTranslationBread(translationOfBread);
                    setTranslationSoup(translationOfSoup);
                    setTranslationBeverage(translationOfBeverage);
                    setTranslationMarinade(translationOfMarinade);
                    setTranslationFingerfood(translationOfFingerfood);
                    setTranslationMainCourse(translationOfMainCourse);
                    setTranslationSideDish(translationOfSideDish);
                    setTranslationAmerican(translationOfAmerican);
                    setTranslationBritish(translationOfBritish);
                    setTranslationCajun(translationOfCajun);
                    setTranslationCaribbean(translationOfCaribbean);
                    setTranslationChinese(translationOfChinese);
                    setTranslationEasternEuropean(translationOfEasternEuropean);
                    setTranslationEuropean(translationOfEuropean);
                    setTranslationFrench(translationOfFrench);
                    setTranslationGerman(translationOfGerman);
                    setTranslationGreek(translationOfGreek);
                    setTranslationIndian(translationOfIndian);
                    setTranslationIrish(translationOfIrish);
                    setTranslationItalian(translationOfItalian);
                    setTranslationJapanese(translationOfJapanese);
                    setTranslationJewish(translationOfJewish);
                    setTranslationKorean(translationOfKorean);
                    setTranslationLatinAmerican(translationOfLatinAmerican);
                    setTranslationMediterranean(translationOfMediterranean);
                    setTranslationMexican(translationOfMexican);
                    setTranslationMiddleEastern(translationOfMiddleEastern);
                    setTranslationNordic(translationOfNordic);
                    setTranslationSouthern(translationOfSouthern);
                    setTranslationSpanish(translationOfSpanish);
                    setTranslationThai(translationOfThai);
                    setTranslationVietnamese(translationOfVietnamese);
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
    const sortList2 = [{id: 1, name: translationGlutenFree}, {id: 2, name: translationKetogenic}, {id: 3, name: translationVegetarian}, {id: 4, name: 'Lacto-Vegetarian'}, {id: 5, name: 'Ovo-Vegetarian'}, {id: 6, name: 'Vegan'}, {id: 7, name: 'Pescetarian'}, {id: 8, name: 'Paleo'}, {id: 9, name: 'Primal'}, {id: 10, name: 'Whole30'}];
    const sortList3 = [{id: 1, name: 'Dairy'}, {id: 2, name: 'Egg'}, {id: 3, name: 'Gluten'}, {id: 4, name: 'Grain'}, {id: 5, name: 'Peanut'}, {id: 6, name: 'Seafood'}, {id: 7, name: 'Sesame'}, {id: 8, name: 'Shellfish'}, {id: 9, name: 'Soy'}, {id: 10, name: 'Sulfite'}, {id: 11, name: 'Tree Nut'}, {id: 12, name: 'Wheat'}];
    const sortList4 : ICheckboxButton[] = [
        {
            id: 1,
            text: 'Breakfast',
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
            text: 'Lunch',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}


        },
        {
            id: 3, text: 'Dinner',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 4, text: 'Snack',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 5, text: 'Teatime',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 6, text: 'Sauce',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {
            id: 7, text :'Drink',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 8, text: 'Dessert',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 9, text: 'Appetizer',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 10,text: 'Salad',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 11,text: 'Bread',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 12,text: 'Soup',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 13,text: 'Beverage',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 14,text: 'Marinade',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 15,text: 'Fingerfood',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 16,text: 'Main Course',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        },
        {id: 17,text: 'Side Dish',
            style:{ margin: 5 },
            size:20,
            fillColor:"#9fc131",
            unfillColor: colors.background,
            textStyle: { color: colors.text, fontSize: 15, textDecorationLine: "none" },
            iconStyle:{ height: 20, width: 20,borderRadius: 5,borderColor: colors.border },
            innerIconStyle:{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, borderColor: colors.border}

        }
    ];
    const sortList5 = [{id: 1, name: 'American'}, {id: 2, name: 'British'}, {id: 3, name: 'Cajun'}, {id: 4, name: 'Caribbean'}, {id: 5, name: 'Chinese'}, {id: 6, name: 'Eastern European'}, {id: 7, name: 'European'}, {id: 8, name: 'French'}, {id: 9, name: 'German'}, {id: 10, name: 'Greek'}, {id: 11, name: 'Indian'}, {id: 12, name: 'Irish'}, {id: 13, name: 'Italian'}, {id: 14, name: 'Japanese'}, {id: 15, name: 'Jewish'}, {id: 16, name: 'Korean'}, {id: 17, name: 'Latin American'}, {id: 18, name: 'Mediterranean'}, {id: 19, name: 'Mexican'}, {id: 20, name: 'Middle Eastern'}, {id: 21, name: 'Nordic'}, {id: 22, name: 'Southern'}, {id: 23, name: 'Spanish'}, {id: 24, name: 'Thai'}, {id: 25, name: 'Vietnamese'}];

    return {
        sortList1,
        sortList2,
        sortList3,
        sortList4,
        sortList5
    }
}



