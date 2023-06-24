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
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 56,
        margin: 10,
    },
    textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#041721',
        padding: 5,
        marginLeft: 10,
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
        marginLeft: 10,
    },
    themeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: '#fff',
        borderRadius: 10,
        height: 56,
        margin: 10,
    },
    themeCardContainer: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: '#fff',
        borderRadius: 10,
        // height: 56,
        margin: 10,
    },
    themeCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        // backgroundColor: '#fff',
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#ccc',
        height: 300,
        width: 140,
        marginRight: 15,
    },
    themeImage: {
        width: 140,
        height: 300,
        flex: 1,
        borderRadius: 10,

    },
    themeTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 5,
        // marginLeft: 10,
        textAlign: 'center',
    },
    themeCardTitleContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        // marginRight: 60,
        // backgroundColor: '#fff',

    }


});
