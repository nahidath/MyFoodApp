import {StyleSheet} from "react-native";

export default StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: "#041721",
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
    },
    parentHr:{
        height:1,
        color: "#fff",
        width:'100%'
    },
    child:{
        backgroundColor: "#fff",
        padding: 16,

        // marginLeft: 10,
    }

});