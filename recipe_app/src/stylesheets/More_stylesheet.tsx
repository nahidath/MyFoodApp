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
        color: '#041721',
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
    }

});