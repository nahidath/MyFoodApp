import {FC} from "react";
import {View, Text, TextInput, FlatList, ScrollView} from "react-native";
import styles from '../stylesheets/Search_stylesheet';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Feather from "react-native-vector-icons/Feather";


const Search : FC = () => {
    return (
        // <KeyboardAwareScrollView
        //     resetScrollToCoords={{ x: 0, y: 0 }}
        //     style={{ backgroundColor: '#F5F9FA' }}
        //     scrollEnabled={true}
        // >
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} placeholder={'Rechercher une recette'} />
                    <Feather style={styles.searchIcon} name={'search'} size={24} color={'#111111'} />
                </View>
                <View>
                        <Text style={styles.resultsText}>Resultat de la recherche</Text>
                        {/*<View style={styles.divider}></View>*/}
                        <View style={{padding:10}}>
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
                                {key: 'Julie'},]} renderItem={ ({item}) => <View style={styles.itemBloc}><Text>{item.key}</Text></View>  } />
                        </View>
                </View>
            </View>
        // </KeyboardAwareScrollView>

    );
}

export default Search;