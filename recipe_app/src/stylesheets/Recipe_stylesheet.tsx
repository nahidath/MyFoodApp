import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fefefe',
        flexDirection: 'column',

    },
    headerRecipeImage: {
        height: 300,
    },
    headerRecipeImageText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fefefe',
    },
    headerRecipeLabel: {
        backgroundColor: 'rgba(195,229,111,0.75)',
        position: 'absolute',
        top: 10,
        left: 10,
        borderRadius: 10,
    },
    headerRecipeLabelText : {
        fontSize: 10,
        color: '#041721',
        padding: 5,
    },
    recipeLikes: {
        flexDirection: 'row',
    },
    recipeLikesText: {
        fontSize: 20,
        color: '#fefefe',
        padding: 5,
    },
    recipeInfos: {
        flexDirection: 'column',
        padding: 20,
    },
    ingredientList: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    ingredientListTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#041721',
        marginBottom: 10,
    },
    recipeDescription: {
        flexDirection: 'column',
    },
    titleDesc: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#041721',
        marginBottom: 10,
    }
});
