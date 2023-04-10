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
        flexDirection: 'column',
        marginTop: 50,
        // padding: 10,
    },
    input: {
        width: '80%',
        height: 52,
        marginBottom: 10,
        borderWidth: 1,
        padding: 16,
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
        fontSize: 16,
        fontWeight: '500',
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
        fontSize: 16,
        // fontWeight: 'bold',
        // textAlign: 'center',
        marginLeft: 40,
        marginTop:8,
        marginBottom:24,
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
        right: 30,
        top: 0,
        padding: 18,
        textAlignVertical: 'center',
        textAlign:'right',
        // top: 100,
    },
    showBtn : {
        position: 'absolute',
        // right: 20,
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
        flexDirection: 'column',
        width: '100%',
        padding: 10,
    },
    modalContainer: {
        flex: 1,

        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(155,155,155,0.52)',
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
        width: '100%',
    },
    modalView: {
        width: '100%',
        height: '80%',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        // flex: 1,
        fontWeight: 'normal',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start' ,
        // textAlign: 'left',
        marginLeft: 40,
        // margin: 10,
        // flexDirection: 'column',
    },
    inputZone: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
        margin: 10,
        alignItems: 'center',

    }


});