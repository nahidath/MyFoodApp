import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeStackList} from "../types";
import Homepage from "../screens/Homepage";
import Profile from "../screens/Profile";
import Recipe from "../screens/Recipe";
import SpotlightRecipes from "../screens/SpotlightRecipes";
import Search from "../screens/Search";

const HomeStack = createNativeStackNavigator<HomeStackList>();
export default function HomeStackScreen () {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="HomePage" component={Homepage} options={{headerShown: false}} />
            <HomeStack.Screen name="Profile" component={Profile} options={{
                headerStyle: {
                    backgroundColor: '#fefefe',
                },
                headerTintColor: '#041721',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <HomeStack.Screen name="Recipe" component={Recipe}  options={{
                headerStyle: {
                    backgroundColor: '#fefefe',
                },
                headerTintColor: '#041721',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <HomeStack.Screen name="SpotlightRecipes" component={SpotlightRecipes} options={{
                headerStyle: {
                    backgroundColor: '#fefefe',
                },
                headerTintColor: '#041721',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: 'Spotlight Recipes',
            }} />
            <HomeStack.Screen name="Search" component={Search} options={{headerShown: false}} />
        </HomeStack.Navigator>
    )
}