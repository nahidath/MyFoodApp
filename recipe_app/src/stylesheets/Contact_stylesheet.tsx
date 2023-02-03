import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        flexDirection: 'column',
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    sendBtn: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#041721',
        color: '#fff',
    },
    header: {
        marginTop: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#041721',
    }
});