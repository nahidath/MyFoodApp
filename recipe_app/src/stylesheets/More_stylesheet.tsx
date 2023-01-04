import {StyleSheet} from "react-native";
// import fontsLoaded from "../components/Fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        flexDirection: 'column',
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1C1E21',
        margin: 10,
        marginTop: 15,
    },
    btnStyle: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,
        margin: 5,
        flexDirection: 'row',

    },
    btnStyleText: {
        fontSize: 15,
        // fontWeight: 'bold',
        color: '#666666',
        paddingLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 2,
        // fontFamily: 'sans-serif-medium',
    },
    boxShadowIOS:{
        shadowOffset: {width:0, height: 1},
        shadowColor:'#171717',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    boxShadowAndroid:{
        shadowColor:'#000',
        elevation: 2,
    }

});