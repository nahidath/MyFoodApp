import {StyleSheet, View, Animated, TouchableOpacity, TouchableWithoutFeedback, Easing} from "react-native";

interface StarIconLikeProps {
    scale: number;
}

const StarIconLike = ({ scale } : StarIconLikeProps) => {
    const animatedValue = new Animated.Value(0);

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animatedStyle = {
        transform: [{ scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, scale],
            }) }],
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container} >
                <Animated.Image source={require('../../assets/star.png')} style={[styles.starIcon, animatedStyle]} resizeMode={"center"} />
            </View>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        ...StyleSheet.absoluteFillObject,
    },
    starIcon: {
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.35,
        shadowRadius: 35,
    },
});

export default StarIconLike;