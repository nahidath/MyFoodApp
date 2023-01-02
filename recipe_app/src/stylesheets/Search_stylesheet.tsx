import {StyleSheet} from "react-native";
import hairlineWidth = StyleSheet.hairlineWidth;


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c7b922',
    },
    searchContainer: {
        flexDirection: 'row',
    },
    searchButton: {
        position: 'relative',
        top: 15,
        left: 5,
        // padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E19271',
        height: 45,
        width: 45,
        borderRadius: 50,
    },
    searchInput: {
        backgroundColor: '#fff',
        height: 50,
        padding: 10,
        width: '80%',
        margin: 10,
        borderRadius: 20,
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
    }
});