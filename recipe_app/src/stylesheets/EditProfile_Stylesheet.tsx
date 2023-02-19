import {StyleSheet} from "react-native";


export default StyleSheet.create({
    profileView: {
        top: 10,
        width: 150,
        height: 150,
        borderRadius: 80,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePic: {
        width: 160,
        height: 160,
        borderRadius: 90,
        borderColor: '#171717',
        borderWidth: StyleSheet.hairlineWidth,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(192, 192, 192, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editProfileBtn: {
        position: 'absolute',
        top: 130,
        right: 100,
        backgroundColor: '#9fc131',
        borderRadius: 50,
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
    }
});