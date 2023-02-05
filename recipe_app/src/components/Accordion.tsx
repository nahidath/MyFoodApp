import {ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, FC} from "react";
import {View, Text, LayoutAnimation, TouchableOpacity} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import {StyleSheet} from "react-native";
import general from "../stylesheets/General_stylesheet";


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

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }

    return (
        <View>
            <TouchableOpacity style={[styles.row, general.shadow]} onPress={()=>toggleExpand()}>
            {/*<TouchableOpacity style={styles.row} onPress={()=>toggleExpand()}>*/}

                <Text style={styles.title}>{title}</Text>
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={"#041721"} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                expanded &&
                <View style={styles.child}>
                    <Text style={{paddingLeft:10, color: "#041721"}}>{data}</Text>
                </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: "#041721",
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: "#fff",
    },
    parentHr:{
        height:1,
        color: "#fff",
        width:'100%'
    },
    child:{
        backgroundColor: "#fff",
        padding: 16,

        // marginLeft: 10,
    }

});

export default Accordion;