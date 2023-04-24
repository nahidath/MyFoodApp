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
        margin: 10,
        height: 84,
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
    }


});