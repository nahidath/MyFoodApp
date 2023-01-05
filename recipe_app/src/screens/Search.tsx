import React, {FC} from "react";
import {View, Text, TextInput, FlatList, ScrollView, Pressable, TouchableOpacity} from "react-native";
import styles from '../stylesheets/Search_stylesheet';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Feather from "react-native-vector-icons/Feather";
import Separator from "../components/Separator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";


const Search : FC = () => {
    return (
        // <KeyboardAwareScrollView
        //     resetScrollToCoords={{ x: 0, y: 0 }}
        //     style={{ backgroundColor: '#F5F9FA' }}
        //     scrollEnabled={true}
        // >
            <View style={general.container}>
                <FocusAwareStatusBar barStyle="light-content" backgroundColor="#064851" />
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} placeholder={'Rechercher une recette'} />
                    <Pressable style={styles.searchButton}>
                        <FontAwesome name={"search"} size={24} color={"#ffffff"} />
                    </Pressable>
                </View>
                <Text style={styles.resultsText}>Resultat de la recherche</Text>
                <Separator />
                <View style={styles.resultsContainer}>
                    <FlatList data={[
                        {key: 'Devin'},
                        {key: 'Dan'},
                        {key: 'Dominic'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},]} renderItem={ ({item}) => <TouchableOpacity style={styles.itemBloc}><Text>{item.key}</Text></TouchableOpacity>  } />
                </View>
            </View>
        // </KeyboardAwareScrollView>

    );
}

export default Search;