import {StyleSheet} from "react-native";
import hairlineWidth = StyleSheet.hairlineWidth;


export default StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        height: 50,
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#fefefe',
    },
    searchButton: {
        position: 'relative',
        top: 15,
        left: 5,
        // padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#064851',
        height: 45,
        width: 45,
        borderRadius: 50,
    },
    searchInput: {
        // backgroundColor: '#fefefe',
        // height: 50,
        // padding: 10,
        // // margin: 10,
        // borderRadius: 10,
        // flex : 1,
        fontSize: 15,
    },
    resultsText: {
        paddingLeft: 10,
        fontSize: 20,
    },
    itemBloc: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10,
        height: 84,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
    },
    resultsContainer: {
        flex: 1,
        padding: 10,
    },
    icon:{
        padding: 10,
    }
});