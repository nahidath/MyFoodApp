import {StyleSheet} from "react-native";
import hairlineWidth = StyleSheet.hairlineWidth;



export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fefefe',
        flexDirection: 'column',

    },
    headerRecipeImage: {
        height: 300,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    blocRecipeImage: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },
    headerRecipeImageText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fefefe',
        width: '80%',
        top: 40,
    },
    headerRecipeLabel: {
        position: 'absolute',
        top: 10,
        flexDirection: 'row',

    },
    headerRecipeLabelText : {
        backgroundColor: 'rgba(195,229,111,0.75)',
        borderRadius: 10,
        fontSize: 10,
        color: '#041721',
        padding: 5,
        marginLeft: 5,
    },
    recipeLikes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: 'rgba(254,254,254,0.82)',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recipeDescription: {
        flexDirection: 'column',
        textAlign: 'justify',
    },
    titleDesc: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: 'rgba(254,254,254,0.82)',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#041721',
        marginBottom: 10,
    },
    source : {
        fontSize: 12,
        marginBottom: 10,
        fontStyle: 'italic',
        padding: 20,
    },
    sourceLink: {
        fontSize: 12,
        // color: '#2319ad',
        marginBottom: 10,
        fontStyle: 'italic',
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    items: {
        marginBottom: 5,
        fontSize: 15,
        textAlign: 'justify',
    },
    shareBtn: {
        position: 'absolute',
        top: 10,
        left: 320,

    },
    blocRecipeGradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        // width: '100%',
    },
    heart: {
        marginTop: 9,
    },
    enjoy: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d59b24',
        fontStyle: 'italic',
        padding: 20,
    },
    time:{
        fontSize: 15,
        fontStyle: 'italic',
    },
    servings: {
        fontSize: 15,
        marginBottom: 10,
        fontStyle: 'italic',
    }
});
