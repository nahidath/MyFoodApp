import {FC} from "react";
import {View, Text, Pressable, TouchableOpacity, ScrollView} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import styles from "../stylesheets/Profile_stylesheet";


const Profile : FC = () => {
    return (
        <View style={styles.container}>
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
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.btnStyleText}>Informations personnelles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.btnStyleText}>Changer de mot de passe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.btnStyleText}>Mes recettes favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.btnStyleText}>Supprimer mon compte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.btnStyleText}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default Profile;