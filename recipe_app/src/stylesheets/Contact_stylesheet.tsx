import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    form: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
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
        // height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#041721',
        color: '#fff',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#041721',
        textAlign: 'center',
        margin: 10,
    },
    inputMsg: {
        width: '80%',
        height: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        textAlignVertical: 'top',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }
});