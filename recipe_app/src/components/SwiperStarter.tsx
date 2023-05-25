import {Dimensions, ScrollView, View, Text, PixelRatio, StyleSheet, Image} from "react-native";
import React, {Dispatch, SetStateAction, useState} from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import FocusAwareStatusBar from "./StatusBarStyle";

interface SwiperStarterProps {
    doneNavigation: boolean;
}

const SwiperStarter = ({doneNavigation} : SwiperStarterProps)  => {
    const { width, height } = Dimensions.get('window');
    const [showRealApp, setShowRealApp] = useState(true);

    const slides : any = [
        {
            id: 1,
            image: require('../../assets/Lunch-time.gif'),
            title: 'What time is it ?\n It is time to cook ! ',
            description: "Let's cook delicious and healthy food with easy recipes",
        },
        {
            id: 2,
            image: require('../../assets/Recipe-book.gif'),
            title: 'Discover all the best recipes you needed',
            description: '1000+ recipes for you to choose from and cook anytime',

        },
        {
            id: 3,
            image: require('../../assets/Cooking.gif'),
            title: "Happy cooking !",
            description: 'Cooking is fun and easy with our app',
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





        return (
            <>
                <FocusAwareStatusBar barStyle="light-content" backgroundColor="#9fc131" />
                <AppIntroSlider
                    renderNextButton={() => labelButton('Next')}
                    renderDoneButton={() => labelButton('Start')}
                    renderPrevButton={() => labelButton('Prev')}
                    showSkipButton={true}
                    onDone={() => setShowRealApp(doneNavigation)}
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