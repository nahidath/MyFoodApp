import {inspect} from "util";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useTheme} from "@react-navigation/native";
import {Dispatch, SetStateAction} from "react";


interface RecipeVideoProps {
    videoID: string;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const RecipeVideo = ({videoID, setModalVisible}: RecipeVideoProps) => {
    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.modalContainer, {backgroundColor: colors.background}]}>
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, {color: colors.text}]}>Video</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <FontAwesome name="close" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>
                <YoutubePlayer
                    height={300}
                    play={true}
                    videoId={videoID}
                    webViewStyle={{borderRadius: 10, opacity: 0.99}}
                    webViewProps={{
                        renderToHardwareTextureAndroid: true,
                        androidLayerType:
                            Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none',
                    }}
                />
            </View>
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
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        padding: 20,
        borderRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});

export default RecipeVideo;