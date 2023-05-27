import {inspect} from "util";
import {View, StyleSheet} from "react-native";


interface RecipeVideoProps {
    video: string;
}

const RecipeVideo = (video: RecipeVideoProps) => {
    return (
        <View style={styles.container}>
            <Video
                source={{uri: video.video}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.video}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 300,
    }
});

export default RecipeVideo;