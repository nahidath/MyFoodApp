import {StyleSheet} from "react-native";



export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    profilePicContainer: {
        marginTop: 20,
        height: 200,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePic: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 80,

    },
    profileView: {
        top: 10,
        width: 130,
        height: 130,
        borderRadius: 70,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editProfilePic: {
        position: 'absolute',
        top: 130,
        right: 100,
        backgroundColor: '#E19271',
        borderRadius: 50,
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E19271',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileInfoContainer: {
        flexDirection: 'column',
    },
    btnStyle: {
        padding: 10,
        borderRadius: 10,
        height: 50,
        margin: 5,
        flexDirection: 'row',
    },
    btnStyleText: {
        fontSize: 15,
        // fontWeight: 'bold',
        paddingLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 2,
        // fontFamily: 'sans-serif-medium',
    },
    pp: {
        width: 65,
        height: 65,
        borderRadius: 50,
    },
    profileBtn: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        margin:5,
    },
    profileBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 2,
    },
    arrowGo: {
        position: 'absolute',
        right: 10,
        top: 40,

    }

});