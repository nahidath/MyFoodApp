import React, {FC} from "react";
import {View, Text, Pressable, TouchableOpacity, ScrollView} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import styles from "../stylesheets/Profile_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import general from "../stylesheets/General_stylesheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MyStackNavigationProp from "../components/MyStackNavigationProp";

// type ProfileProps = MyStackNavigationProp<any>

const Profile : FC = () => {
    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <View style={styles.profilePicContainer}>
                <View style={styles.profilePic}></View>
                <Pressable style={styles.editProfilePic}>
                    <Feather name={"camera"} size={24} color={"#ffffff"} />
                </Pressable>
                <Text style={styles.profileName}>John Doe</Text>
            </View>
            <Separator />
            <ScrollView>
                <View style={styles.profileInfoContainer}>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"info"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Informations personnelles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <FontAwesome name={"key"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Changer de mot de passe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <FontAwesome name={"heart"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Mes recettes favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"trash-2"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Supprimer mon compte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, general.shadow]}>
                        <Feather name={"log-out"} size={24} color={"#666666"} />
                        <Text style={styles.btnStyleText}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default Profile;