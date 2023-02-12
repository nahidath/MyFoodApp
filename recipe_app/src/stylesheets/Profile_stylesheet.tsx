import {StyleSheet} from "react-native";



export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    profilePicContainer: {
        height: 200,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePic: {
        top: 10,
        width: 130,
        height: 130,
        borderRadius: 70,
        backgroundColor: '#d9d9d9',
    },
    editProfilePic: {
        position: 'absolute',
        top: 100,
        right: 120,
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
        marginTop: 30,
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
});