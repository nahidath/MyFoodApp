import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import MyStackNavigationProp from "../components/MyStackNavigationProp";
import {useEffect, useState} from "react";
import {ActivityIndicator, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
// @ts-ignore
import {REACT_APP_API_KEY} from "@env";
import axios from "axios";


type Props = NativeStackScreenProps<HomeStackList, 'SpotlightRecipes'>;
// @ts-ignore
type SpotlightScreenProps = MyStackNavigationProp<HomeStackList, 'SpotlightRecipes'>;
const SpotlightRecipes = ({route}: Props) => {
    const navigation = useNavigation<SpotlightScreenProps>();
    const configValue : string | undefined = REACT_APP_API_KEY;
    const [recipes, setRecipes] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const {name} = route.params;
    const {id} = route.params;

    const getRecipes = () => {
        axios.get('https://api.spoonacular.com/recipes/'+JSON.stringify(id)+'/similar',{params:{apiKey: configValue} }).then((response) => {
            setRecipes(response.data);
            setIsLoaded(true);
        },).catch((error) => {
            console.log(error);
            setIsError(true);
        });
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: name,
        })
        getRecipes();
    },[])

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Recipe', {id: item.id, name: item.title})}>
                <Image style={styles.image} source={{uri: item.image}} />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {isLoaded ? (
                <FlatList
                    data={recipes}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <View style={styles.loadingContainer}>
                    {isError ? (
                        <Text style={styles.errorText}>Error loading recipes</Text>
                    ) : (
                        <ActivityIndicator size="large" color="#0000ff" />
                    )}
                </View>
            )}
        </View>
    )

}

export default SpotlightRecipes;