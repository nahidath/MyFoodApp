import Register from "../screens/Register";
import EditProfile from "../screens/EditProfile";
import {HomeStackScreen} from "../components/AllStackScreen";

export type HomeStackList = {
    HomePage: undefined;
    Profile: undefined;
    Recipe: {
        id: string;
        name: string;
    }
    SpotlightRecipes: {
        recipesArray: string[];
    }
    // Search: undefined;
    LoginStackScreen: undefined;
    ProfileStackScreen: undefined;
    Cuisine: {
        cuisine: string;
    }
    SearchStackScreen: undefined;
}

export type MoreStackList = {
    MorePage : undefined;
    NotificationSettings : undefined;
    DisplaySettings: undefined;
    LanguageSettings : undefined;
    Faq: undefined;
    Contact: undefined;
    PrivacyPolicy: undefined;
    TermsOfUse: undefined;
}

export type LoginStackList = {
    Login: undefined;
    Register: undefined;
    ResetPassword: undefined;
    ProfileStackScreen: undefined;
    HomeStackScreen: undefined;
}

export type ProfileStackList = {
    ProfilePage: undefined;
    EditProfile: undefined;
    FavoritesRecipesUser: undefined;
    LoginStackScreen: undefined;
    HomeStackScreen: undefined;

}

export type FavoritesStackList = {
    Favs: undefined;
    LoginStackScreen: undefined;
    Recipe: {
        id: string;
        name: string;
    }
}

export type NotificationsStackList = {
    Notifs: undefined;
    LoginStackScreen: undefined;
}

export type SearchStackList = {
    SearchPage: undefined;
    Recipe: {
        id: string;
        name: string;
    }
}