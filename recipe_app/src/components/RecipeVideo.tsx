import {inspect} from "util";
import {View, StyleSheet, TouchableOpacity, Text, Platform} from "react-native";
import YouTube from 'react-native-youtube';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useTheme} from "@react-navigation/native";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { WebView } from 'react-native-webview';
import YoutubePlayer from "react-native-youtube-iframe";
import {useLanguage} from "../translation/LanguageContext";
import {useTranslation} from "../translation/TranslationFunc";





interface RecipeVideoProps {
    videoID: string;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const RecipeVideo = ({videoID, setModalVisible}: RecipeVideoProps) => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const {colors} = useTheme();
    const theme = useTheme();
    const [translationTitle, setTranslationTitle] = useState("Video");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translationTitle]);
                    setTranslationTitle(elementsTranslated[0]);
                } catch (error) {
                    console.error('Erreur de traduction recipeVideo:', error);
                }

            }else {
                setTranslationTitle("Video");
            }
        }
        fetchTranslation();
    }, [language]);

    return (
        <View style={styles.container}>
            <View style={[styles.modalContainer, {backgroundColor: colors.background}]}>
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, {color: colors.text}]}>{translationTitle}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <FontAwesome name="close" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>
                <YoutubePlayer
                    height={300}
                    play={false}
                    videoId={videoID}
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
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 300,
    },
    modalContainer: {
        width: '100%',
        height: 400,
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