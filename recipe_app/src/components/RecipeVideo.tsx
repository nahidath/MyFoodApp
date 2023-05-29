import {inspect} from "util";
import {View, StyleSheet, TouchableOpacity, Text, Platform} from "react-native";
import YouTube from 'react-native-youtube';
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
                <YouTube
                    videoId={videoID}
                    play={true}
                    apiKey="AIzaSyBqxVvUSqKq6OmfbmRUAjW3jTrZFcpHpaI"
                />
                {/*<WebView*/}
                {/*    style={{width: '100%', height: 300, borderRadius: 10}}*/}
                {/*    javaScriptEnabled={true}*/}
                {/*    domStorageEnabled={true}*/}
                {/*    source={{uri: `https://www.youtube.com/embed/${videoID}`}}*/}
                {/*/>*/}
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