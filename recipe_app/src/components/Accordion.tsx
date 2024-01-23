import {ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, FC, useEffect} from "react";
import {View, Text, LayoutAnimation, TouchableOpacity} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import {StyleSheet} from "react-native";
import general from "../stylesheets/General_stylesheet";
import {useTheme} from "@react-navigation/native";
import {useLanguage} from "../translation/LanguageContext";
import styles from "../stylesheets/Accordion_stylesheet";
import {useTranslation} from "../translation/TranslationFunc";


// interface TitleProps{
//     title?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
// }
//
// interface DataProps{
//     data?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
// }

interface AccordionProps{
    title?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
    data?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
}

const Accordion : FC<AccordionProps>  = ({title, data})  => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const {colors} = useTheme();
    const theme = useTheme();
    const [translationTitle, setTranslationTitle] = useState(title);
    const [translationData,setTranslationData] = useState(data);

    useEffect(() => {
        const fetchTranslation = async () => {
            if(language != "EN-US") {
                try {
                    const elementsTranslated = await translationFunc([translationTitle, translationData]);
                    setTranslationTitle(elementsTranslated[0]);
                    setTranslationData(elementsTranslated[1]);
                } catch (error) {
                    console.error('Erreur de traduction Accordion:', error);
                }

            }else {
                setTranslationTitle(title);
                setTranslationData(data);
            }
        }
        fetchTranslation();
    }, [language]);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }

    return (
        <View>
            <TouchableOpacity style={[styles.row, general.shadow, {backgroundColor: colors.notification}]} onPress={()=>toggleExpand()}>
            {/*<TouchableOpacity style={styles.row} onPress={()=>toggleExpand()}>*/}

                <Text style={[styles.title, {color:colors.text}]}>{translationTitle}</Text>
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                expanded &&
                <View style={[styles.child, {backgroundColor: colors.background}]}>
                    <Text style={{paddingLeft:10, color: colors.text}}>{translationData}</Text>
                </View>
            }

        </View>
    );
}



export default Accordion;