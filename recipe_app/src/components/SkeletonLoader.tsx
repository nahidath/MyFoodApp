import { Skeleton } from 'moti/skeleton';
import {FC} from "react";
import {StyleSheet, View} from "react-native";
import {MotiView} from "moti";

interface SkeletonLoaderProps {
    theme?: any;
    color?: any;
}

export  function SkeletonLoader ({theme, color}: SkeletonLoaderProps)  {
    const colorMode = theme.dark ? 'dark' : 'light';
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;
    return (
        // <ContentLoader
        //     speed={2}
        //     backgroundColor={colorSpec}
        //     foregroundColor="#fafafa"
        //     style={{backgroundColor: color.background}}
        // >
        //     <Rect x="15" y="20" rx="20" ry="20" width="90%" height="200" />
        //     <Rect x="20" y="240" rx="5" ry="5" width="90%" height="20" />
        //     <Rect x="20" y="270" rx="5" ry="5" width="82%" height="20" />
        //     <Rect x="120" y="300" rx="5" ry="5" width="118" height="15" />
        //     <Rect x="20" y="330" rx="3" ry="3" width="87%" height="10" />
        //     <Rect x="20" y="360" rx="3" ry="3" width="80%" height="10" />
        //     <Rect x="20" y="390" rx="3" ry="3" width="77%" height="10" />
        //     <Rect x="120" y="420" rx="5" ry="5" width="118" height="15" />
        //     <Rect x="20" y="450" rx="3" ry="3" width="87%" height="10" />
        //     <Rect x="20" y="480" rx="3" ry="3" width="80%" height="10" />
        //     <Rect x="20" y="510" rx="3" ry="3" width="77%" height="10" />
        //     <Rect x="120" y="540" rx="5" ry="5" width="118" height="15" />
        //     <Rect x="20" y="570" rx="3" ry="3" width="87%" height="10" />
        //     <Rect x="20" y="600" rx="3" ry="3" width="80%" height="10" />
        //     <Rect x="20" y="630" rx="3" ry="3" width="77%" height="10" />
        // </ContentLoader>


        <MotiView
            transition={{
                type: 'timing',
            }}
            style={[styles.container, styles.padded]}
            animate={{ backgroundColor: theme.dark ? '#121212' : '#FAF9F6' }}
        >
            <Skeleton colorMode={colorMode}  height={200} width={'90%'} radius={20} />
            <Spacer />
            <Skeleton colorMode={colorMode} width={250} height={20} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'100%'}  />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'100%'}  />

        </MotiView>


    )
}

export function SkeletonLoaderSearch ({theme, color}: SkeletonLoaderProps)  {
    const colorMode = theme.dark ? 'dark' : 'light';
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;
    return (
        <MotiView
            transition={{
                type: 'timing',
            }}
            style={[styles.container, styles.padded]}
            animate={{ backgroundColor: color.background }}
        >
            <Skeleton colorMode={colorMode}  height={200} width={'90%'} radius={20} />
            <Spacer />
            <Skeleton colorMode={colorMode} width={'85%'} height={20} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'85%'} height={20} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'85%'} height={15} />

        </MotiView>

    )
}

export function SkeletonLoaderHomePage ({theme, color}: SkeletonLoaderProps)  {
    const colorSpec = theme.dark ? '#353535' : '#ececec';
    const colorMode = theme.dark ? 'dark' : 'light';
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;

    return (
        // <ContentLoader
        //     speed={2}
        //     backgroundColor={colorSpec}
        //     foregroundColor="#fafafa"
        //     width={800}
        //     height={400}
        //     viewBox={"0 0 800 400"}
        //     style={{marginBottom: -110, backgroundColor:color.background}}
        // >
        //     <Rect x="20" y="0" rx="10" ry="10" width="150" height="260" />
        //     <Rect x="180" y="0" rx="10" ry="10" width="170" height="260" />
        // </ContentLoader>
        <MotiView
            transition={{
                type: 'timing',
            }}
            style={[styles.container, styles.padded]}
            animate={{ backgroundColor: color.background }}
        >
            <Skeleton colorMode={colorMode}  height={200} width={'90%'} radius={20} />
            <Spacer />
            <Skeleton colorMode={colorMode} width={'85%'} height={20} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'85%'} height={20} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'85%'} height={15} />

        </MotiView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        // justifyContent: 'center',
    },
    padded: {
        padding: 20,
    },
});