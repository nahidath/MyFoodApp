import {Dimensions, ScrollView, View, Text, PixelRatio, StyleSheet, Image} from "react-native";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import FocusAwareStatusBar from "./StatusBarStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";

// interface SwiperStarterProps {
//     doneNavigation: boolean;
//     setShowIntro: Dispatch<SetStateAction<boolean>>;
// }

const SwiperStarter = ()  => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const { width, height } = Dimensions.get('window');
    const [showIntro, setShowIntro] = useState(true);
    const [translation1, setTranslation1] = useState<string>("What time is it ?\n It is time to cook ! ");
    const [translation2, setTranslation2] = useState<string>("Let's cook delicious and healthy food with easy recipes");
    const [translation3, setTranslation3] = useState<string>("Discover all the best recipes you needed");
    const [translation4, setTranslation4] = useState<string>("1000+ recipes for you to choose from and cook anytime");
    const [translation5, setTranslation5] = useState<string>("Happy cooking !");
    const [translation6, setTranslation6] = useState<string>("Cooking is fun and easy with our app");

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                    setTranslation6(elementsTranslated[5]);
                } catch (error) {
                    console.error('Erreur de traduction SwiperStarter:', error);
                }
            }else {
                setTranslation1("What time is it ?\n It is time to cook ! ");
                setTranslation2("Let's cook delicious and healthy food with easy recipes");
                setTranslation3("Discover all the best recipes you needed");
                setTranslation4("1000+ recipes for you to choose from and cook anytime");
                setTranslation5("Happy cooking !");
                setTranslation6("Cooking is fun and easy with our app");
            }
        }
        fetchTranslation();
    }, [language]);

    const slides : any = [
        {
            id: 1,
            image: require('../../assets/Lunch-time.gif'),
            title: {translation1},
            description: {translation2},
        },
        {
            id: 2,
            image: require('../../assets/Recipe-book.gif'),
            title: {translation3},
            description: {translation4},

        },
        {
            id: 3,
            image: require('../../assets/Cooking.gif'),
            title: {translation5},
            description: {translation6},
        }
    ];

    const labelButton = (label: string) => {
        return (
            <View style={styles.buttonNext}>
               <Text style={styles.buttonText}>{label}</Text>
            </View>
        );
    };
    const renderItem = ({item} : any) => {
        return (
            <View style={[styles.container, {width, height}]}>
                <Image source={item.image} style={styles.imageStyle}
                       resizeMode="contain"/>
                <View style={styles.wrapper}>
                    <Text style={styles.header}>{item.title}</Text>
                    <Text style={styles.paragraph}>{item.description}</Text>
                </View>
            </View>
        );
    }

    const onDone = async () => {
        // setShowIntro(false);
        await AsyncStorage.setItem('showIntro', 'false');
    }






    return (
        <>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#9fc131" />
            <AppIntroSlider
                renderNextButton={() => labelButton('Next')}
                renderDoneButton={() => labelButton('Start')}
                renderPrevButton={() => labelButton('Prev')}
                showSkipButton={true}
                onDone={() => onDone()}
                // onDone={() => setShowIntro(false)}
                activeDotStyle={{backgroundColor: '#f2f2f2', width: 30}}
                data={slides}
                renderItem={(item) => renderItem(item)}
            />
        </>

    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(135),
        width: '100%',
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#f2f2f2"
    },
    paragraph: {
        fontSize: 17,
        textAlign: 'center',
        paddingTop : 5,
        paddingHorizontal: 30,
        color: "#f2f2f2"
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 200,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#0898A0',
        marginLeft: 10,
    },
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // padding : 15,
        // // paddingTop: 100,
        backgroundColor: '#9fc131',
    },
    buttonNext: {
        padding: 12,
    },
    buttonText: {
        fontSize: 18,
        color: '#f2f2f2',
        fontWeight: '600',
    }

});

export default SwiperStarter;