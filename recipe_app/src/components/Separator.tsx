import {View, StyleSheet} from "react-native";


const Separator = () => {
    return (
        <View style={styles.separator}></View>
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin:10,
    }
})

export default Separator;
