import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    blocRecipe: {
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        margin: 7,
    },
    imgRecipe: {
        height: 200,
    },
    blocRecipeImage: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
    blocRecipeImageText: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textWrap: 'wrap',
    },
    blocRecipeLabel: {
        position: 'absolute',
        top: 15,
        marginLeft: 10,
        flexDirection: 'row',
    },
    blocRecipeLabelText : {
        backgroundColor: 'rgba(195,229,111,0.75)',
        fontSize: 10,
        color: '#041721',
        padding: 5,
        marginLeft: 5,
        borderRadius: 10,
    },
    blocRecipeLikes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'relative',
        bottom: 40,
    },
    recipeLikesText: {
        fontSize: 20,
        padding: 5,
    },
    heart: {
        marginTop: 9,
    },
    blocRecipeBelow: {
        height: 120,
    },
    time:{
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 10,
    },

});