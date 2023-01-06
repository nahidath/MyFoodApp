import React, {FC} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../stylesheets/More_stylesheet";
import { useFonts } from 'expo-font';
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";




const More : FC = () => {

    // const [fontsLoaded] = useFonts({
    //     // 'PlusJakartaSans': require('../../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
    //     // 'Nunito': require('../../assets/fonts/Nunito-VariableFont_wght.ttf'),
    //     'Poppins': require('../../assets/fonts/Poppins-Regular.ttf'),
    // });

    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView>
                <View>
                    <Text style={styles.textTitle}>Paramètres</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"bell"} size={24} color={"#666666"} />
                        {/*<Text style={[styles.btnStyleText, {fontFamily: 'Poppins'}]}>Notifications</Text>*/}
                        <Text style={styles.btnStyleText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"monitor"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Affichage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"globe"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Langue</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <Text style={styles.textTitle}>Aide</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"help-circle"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"mail"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Contact</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textTitle}>Vous aimez MyFoodApp ?</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <FontAwesome name={"star"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Laissez-nous un avis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <FontAwesome name={"share"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Partagez l'application</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textTitle}>A propos</Text>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"shield"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Politique de confidentialité</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <FontAwesome name={"file"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Conditions d'utilisation</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}
export default More;