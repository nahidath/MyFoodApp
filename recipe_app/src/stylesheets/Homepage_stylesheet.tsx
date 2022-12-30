import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c7b922',
        flexDirection: 'column',
    },
    headerBloc: {
        width: '100%',
        height: 190,
        backgroundColor: '#8cae00',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,

    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 70,
        padding: 20,
    },
    headerMenuLeft: {
        position: 'relative',
        top: 50,
        left: 20,
    },
    blocTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,

    },
    recipe1Title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
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
        backgroundColor: '#fff',
        margin: 20,

    }
});