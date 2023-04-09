import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,

    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    form: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 60,
    },
    input: {
        width: '80%',
        height: 56,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
    },
    loginBtn: {
        width: '80%',
        // height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        color: '#fff',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,

    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    error: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'rgba(255,79,79,0.34)',
    },
    inner: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#003f5c',
        fontSize: 18,
        // fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        textDecorationLine: 'underline',
    },
    belowContainer: {
        flexDirection: 'row',
    },
    editButton:{
        position: 'absolute',
        right: 20,
        padding: 10,
        // marginRight: ,
        // marginTop: 10,
        // top: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    showButton: {
        position: 'absolute',
        right: 35,
        padding: 10,
        top: 100,
    },
    showBtn : {
        position: 'absolute',
        right: 20,
        padding: 10,
        // top: 100,
    },
    activityIndicator: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 1000,
        backgroundColor: '#FAF9F6',
    },
    success: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        // margin: 20,
        // backgroundColor: 'white',
        borderRadius: 15,
        // padding: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',

    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        // flex: 1,
        fontWeight: 'normal',
        justifyContent: 'flex-start',
        alignItems: 'flex-start' ,
        // textAlign: 'left',
        flexDirection: 'row',
    }


});