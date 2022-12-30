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
    searchIcon: {
        position: 'relative',
        top: 10,
        left: 10,
        padding: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        height: 40,
        padding: 10,
        width: '80%',
        margin: 10,
        borderRadius: 20,
    },
    resultsText: {
        paddingLeft: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: hairlineWidth,
        fontSize: 20,
    },
    itemBloc: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10,
        height: 84,
        backgroundColor: '#fff',
        padding: 10,
    }
});