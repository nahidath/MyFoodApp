import React, {FC} from "react";
import {View, Text, TouchableOpacity, ScrollView, Platform} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../stylesheets/More_stylesheet";
import DropShadow from "react-native-drop-shadow";





const More : FC = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.textTitle}>Paramètres</Text>
                    <TouchableOpacity style={[styles.btnStyle, Platform.OS==='ios'] ? styles.boxShadowIOS : styles.boxShadowAndroid}>
                        <Feather name={"bell"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Feather name={"monitor"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Affichage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Feather name={"globe"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Langue</Text>
                    </TouchableOpacity>
                </View>
                <Separator />
                <View >
                    <Text style={styles.textTitle}>Aide</Text>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Feather name={"help-circle"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Feather name={"mail"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Contact</Text>
                    </TouchableOpacity>
                </View>
                <Separator />
                <View>
                    <Text style={styles.textTitle}>Vous aimez MyFoodApp ?</Text>
                    <TouchableOpacity style={styles.btnStyle}>
                        <FontAwesome name={"star"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Laissez-nous un avis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <FontAwesome name={"share"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Partagez l'application</Text>
                    </TouchableOpacity>
                </View>
                <Separator />
                <View>
                    <Text style={styles.textTitle}>A propos</Text>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Feather name={"shield"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Politique de confidentialité</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <FontAwesome name={"file"} size={24} color={"#1C1E21"} />
                        <Text style={styles.btnStyleText}>Conditions d'utilisation</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}
export default More;