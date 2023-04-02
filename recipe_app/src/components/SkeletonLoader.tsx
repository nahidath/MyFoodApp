import {FC, useEffect, useRef} from "react";
import {Animated, StyleSheet, View} from "react-native";
interface SkeletonLoaderProps {
    theme?: any;
    color?: any;
    width?: number | string;
    height?: number;
    borderRadius?: number;
}

export  function SkeletonLoader ({theme, color, height, width, borderRadius}: SkeletonLoaderProps)  {
    const colorSpec = theme.dark ? '#353535' : '#CCCCCC';
    const opacity = useRef(new Animated.Value(0.3));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.3,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                {
                    backgroundColor: colorSpec,
                    opacity: opacity.current,
                    height, width, borderRadius
                }
            ]}
        />


    )
}



export function SkeletonView ({theme, color}: SkeletonLoaderProps)  {
    return(
        <View style={[styles.container, {backgroundColor : color.background}]}>
            <SkeletonLoader theme={theme} height={200} width={'100%'} borderRadius={20}/>
            <SkeletonLoader theme={theme} height={20} width={'90%'} borderRadius={8}/>
            <SkeletonLoader theme={theme} height={20} width={'80%'} borderRadius={8}/>
        </View>
    )
}

export function SkeletonLoaderHomePage ({theme, color}: SkeletonLoaderProps)  {

    return (
        <View style={[styles.container2, {backgroundColor : color.background}]}>
            <SkeletonLoader theme={theme} height={260} width={150} borderRadius={10}/>
            <SkeletonLoader theme={theme} height={260} width={150} borderRadius={10}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        ...StyleSheet.absoluteFillObject,
        paddingRight: 17,
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        width: 800,
        height: 300,
    },

    skeleton: {
        width: '100%',
        margin:8,
    }
});