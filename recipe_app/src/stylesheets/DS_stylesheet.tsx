import {StyleSheet} from "react-native";



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        flexDirection: 'column',
    },
    pusherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 56,
        margin: 10,
    },
    textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#041721',
    },
    switchContainer: {
        marginTop: 15,
    }

});
