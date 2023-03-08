import {useTheme} from "@react-navigation/native";
import {ICheckboxButton} from "react-native-bouncy-checkbox-group";

interface IFilterList {
    colors?: any;
}


export function filtersList({colors}: IFilterList) {

    const sortList1: ICheckboxButton[] = [
        {
            id: 0,
            text: 'Popularity',
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
            text: 'Price',
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
            text: 'Time',
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
    const sortList2 = [{id: 1, name: 'Gluten Free'}, {id: 2, name: 'Ketogenic'}, {id: 3, name: 'Vegetarian'}, {id: 4, name: 'Lacto-Vegetarian'}, {id: 5, name: 'Ovo-Vegetarian'}, {id: 6, name: 'Vegan'}, {id: 7, name: 'Pescetarian'}, {id: 8, name: 'Paleo'}, {id: 9, name: 'Primal'}, {id: 10, name: 'Whole30'}];
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



