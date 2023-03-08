import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    blocRecipe: {
        flexDirection: 'column',
        padding: 15,
        borderRadius: 10,
        margin: 10,
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
        width: '90%'
    },
    blocRecipeLabel: {
        position: 'absolute',
        top: 20,
        marginLeft: 15,
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

    },
    recipeLikesText: {
        fontSize: 20,
        // padding: 5,
        color: '#041721',
    },
    heart: {
        marginTop: 9,
    },
    blocRecipeBelow: {
        // height: 120,
        flex:1,
    },
    time:{
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 10,
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#9fc131',
        borderRadius: 100,
        zIndex: 100,
    },

    resultsText: {
        paddingLeft: 10,
        fontSize: 20,
        marginTop: 10,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FAF9F6',
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,

    },


});