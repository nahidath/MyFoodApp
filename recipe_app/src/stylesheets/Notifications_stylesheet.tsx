import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    notificationContainer: {
        flexDirection: 'column',
        margin: 10,
    },
    notification: {
        backgroundColor: '#fff',
        marginVertical: 10,
        // height: 84,
        flex: 1,
    },
    notificationText: {
        fontSize: 20,
        padding: 10,

    },
    restricted: {
        flex : 1,
        flexDirection: 'column',
        backgroundColor: '#E19271',
        margin: 10,
        height: 84,
        alignItems: 'center',
        justifyContent: 'center',
    },
    restrictedText: {
        fontSize: 20,
        padding: 10,
    },
    button: {
        width: 100,
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    favList: {
        flexDirection: 'column',
        padding: 15,
    },
    notificationTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        padding: 5,
    },
    notificationBody: {
        fontSize: 15,
        padding: 5,
    },
    deleteButton: {
        width: 100,
        height: 84,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginVertical: 10,
    },
    deleteText: {
        color: '#f2f2f2',
        fontWeight: '600',
        fontSize: 18,
        paddingHorizontal: 10,
    },
    nonotif:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }


});