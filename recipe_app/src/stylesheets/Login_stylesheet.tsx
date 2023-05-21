import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#9fc131',
        // margin:10,
    },
    header: {
        padding: 20,
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10,

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
        justifyContent: 'center',
        // marginTop: -50,
        // padding: 10,
    },
    input: {
        width: '80%',
        height: 52,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        // backgroundColor: 'rgba(226,226,226,0.68)',
        // borderRadius: 8,
        color: '#f2f2f2',
        paddingLeft: 30,
    },
    loginBtn: {
        width: '80%',
        height: 52,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#9fc131',
        fontWeight: 'bold',
        fontSize: 16,

    },
    text: {
        color:"#f2f2f2",
        fontSize:16,
        textAlign: 'right',
    },
    error: {
        color: 'red',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        bottom: 0,
        // backgroundColor: 'rgba(255,79,79,0.34)',
    },
    inner: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#f2f2f2',
        fontSize: 13,
        // fontWeight: 'bold',
        // textAlign: 'right',
        // marginRight: 40,
        // marginTop:8,
        // marginBottom:24,
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

        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
        marginLeft: 40,
        color: "#f2f2f2",
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

    },
    icon: {
        position: 'absolute',
        left: 25,
        padding: 10,
        top: 6,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        color: '#f2f2f2',
    },
    logo: {
        width: 130,
        height: 130,

    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'left',
        color: '#f2f2f2',
    },
    btnText2: {
        color: '#f2f2f2',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerButton: {
        color: '#f2f2f2',
        fontWeight: 'bold',
    },
    registerAsk: {
        flexDirection:'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 115,
    },
    socialLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    socialBtn: {
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 18,

    },
    line: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '40%',
        margin: 10,
    },
    dividerText: {
        color: '#f2f2f2',
        fontWeight: 'bold',
        fontSize: 16,

    },
    tooltip: {
        position: 'absolute',
        right: 60,
        top: -2,
        padding: 20,
        textAlignVertical: 'center',
        textAlign:'right',
    },
    errorPwd: {
        color: 'red',
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 'bold',
        // textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        // backgroundColor: 'rgba(255,79,79,0.34)',
    },
    agreeZone: {
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        marginRight: 25,
        marginLeft: 15,
        padding: 10,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: '#f2f2f2',
        // backgroundColor: 'rgba(155,155,155,0.52)',

    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    }


});