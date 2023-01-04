import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c7b922',
        flexDirection: 'column',
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        margin: 10,
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
        color: '#1C1E21',
        paddingLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    boxShadowIOS:{
        shadowOffset: {width:-2, height: 4},
        shadowColor:'#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    boxShadowAndroid:{
        shadowColor:'#52006A',
        elevation: 20,
    }

});