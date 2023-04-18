import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    pusherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: '#fff',
        borderRadius: 10,
        height: 56,
        margin: 10,
    },
    textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        // color: '#041721',
    },
    switchContainer: {
        marginTop: 15,
    },
    subTitle: {
        fontSize: 15,
        color: '#666666',
        flexWrap: 'wrap',
        padding: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 5,
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',

    }
});