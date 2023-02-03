import {StyleSheet} from "react-native";
// import fontsLoaded from "../components/Fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        flexDirection: 'column',
    },
    textTitle: {
        fontSize: 20,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        // alignItems: "center",

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    languageBtn: {
        // borderTopColor: '#666666',
        // borderBottomColor: '#666666',
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        height: 40,
        // margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageBtnText: {
        color: '#666666',
    }

});