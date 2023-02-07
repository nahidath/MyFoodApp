import {View, StyleSheet} from "react-native";
import {useTheme} from "@react-navigation/native";


const Separator = () => {
    const {colors} = useTheme();

    return (
        <View style={[styles.separator, {borderBottomColor: colors.border}]}></View>
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
