import {FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../stylesheets/Recipe_stylesheet";
import general from "../stylesheets/General_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {FC} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const Recipe : FC = () => {
    return (
        <View style={[styles.container, general.container]}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            <ScrollView>
                <View style={styles.headerRecipeImage}>
                    <ImageBackground
                        // source={{uri: recipe.image}} resizeMode="cover" style={styles.blocRecipeImage}  imageStyle={{borderRadius: 10}}
                        >
                        <Text style={styles.headerRecipeImageText}>Recipe</Text>
                        <View style={styles.headerRecipeLabel}>
                            <Text style={styles.headerRecipeLabelText}>Label</Text>
                        </View>
                        <View style={styles.recipeLikes}>
                            <Text style={styles.recipeLikesText}>20</Text>
                            <FontAwesome name="heart" size={20} color="#9fc131" />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.recipeInfos}>
                    <View style={styles.ingredientList}>
                        <Text style={styles.ingredientListTitle}>INGREDIENTS</Text>
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
                            {key: 'Julie'},]} renderItem={ ({item}) => <Text>{item.key}</Text>  } />
                    </View>
                    <View style={styles.recipeDescription}>
                        <Text style={styles.titleDesc}>PREPARATION</Text>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Recipe;