import {StyleSheet} from "react-native";
import hairlineWidth = StyleSheet.hairlineWidth;


export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fefefe',
        flexDirection: 'column',
    },
    headerBloc: {
        width: '100%',
        padding : 0,

    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#041721',
        padding: 20,
        paddingTop: 10,
    },
    subHeaderText: {
        fontSize: 20,
        color: '#f5f2eb',
        paddingLeft: 20,
        marginTop: -15,
    },
    headerBlocText:{
        top: 20,

    },
    headerNotification: {
        top: -40,
        right: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    recipesDisplay: {
       top: -30,
    },
    blocTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,

    },
    recipe1Title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#041721',
        width: '80%',
    },
    recipe1Button: {
        padding: 6,
        fontWeight: 'bold',
    },
    blocDisplay: {
        flexDirection: 'row',
    },
    blocRecipe: {
        width: 170,
        height: 260,
        borderRadius: 20,
        backgroundColor: '#fefefe',
        margin: 20,
        marginTop: 0,
        borderColor: '#d9d9d9',
        borderWidth: hairlineWidth,

    },
    blocRecipeImage: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },
    blocRecipeImageText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fefefe',
        padding: 10,
    },
    blocRecipeLabel: {
        position: 'absolute',
        top: 10,
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
    blocRecipeLike: {
        position: 'absolute',
        top: 10,
        left: 135,
    },
    blocRecipeGradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: 170,
    },
    blocRecipeShadowAndroid: {
        shadowColor:'#000',
        elevation: 5,
    },
    blocRecipeShadowIOS: {
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor:'#171717',
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderColor: '#064851',
        backgroundColor: '#9fc131',
    },
    searchBloc: {
        flexDirection: 'row',
        height: 50,
        borderRadius: 10,
        margin: 20,
        backgroundColor: '#fefefe',
        // margin: 20,
        // marginBottom: 0,
        top: -20,
    },
    searchInput: {
        height: 60,
        width: '100%',
        backgroundColor: '#fefefe',
        borderRadius: 10,
        padding: 10,
        paddingRight: 50,
    },
    searchButton: {
        padding: 10,
    }

});