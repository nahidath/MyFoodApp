import Register from "../screens/Register";
import EditProfile from "../screens/EditProfile";
import {HomeStackScreen, NotificationsStackScreen} from "../components/AllStackScreen";

export type HomeStackList = {
    HomePage: undefined;
    Profile: undefined;
    Recipe: {
        id?: string;
        name?: string;
        listOfRecipes?: string[];
        listOfRecipesIDs?: string[];
        indxCurrent?: number ;
        screenFrom?: string;
    }
    SpotlightRecipes: {
        recipesArray: string[];
    }
    // Search: undefined;
    LoginStackScreen: undefined;
    AccountStackScreen: undefined;
    Cuisine: {
        cuisine: string;
    }
    SearchStackScreen: undefined;
    // NotifScreen: undefined;
    NotificationsScreen: undefined;
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
    AccountStackScreen: undefined;
    HomeStackScreen: undefined;
}

export type AccountStackList = {
    AccountPage: undefined;
    Profile: undefined;
    // FavoritesRecipesUser: undefined;
    LoginStackScreen: undefined;
    HomeStackScreen: undefined;
    FavoriteStackScreen: undefined;
    NotificationSettings : undefined;
    DisplaySettings: undefined;
    LanguageSettings : undefined;
    Faq: undefined;
    Contact: undefined;
    PrivacyPolicy: undefined;
    TermsOfUse: undefined;
    ProfileStackScreen: undefined;

}

export type FavoritesStackList = {
    Favs: undefined;
    LoginStackScreen: undefined;
    Recipe: {
        id?: string;
        name?: string;
    }
}

export type NotificationsStackList = {
    Notifs : {
        title?: string;
        body?: string;
    }
    LoginStackScreen: undefined;
}

export type SearchStackList = {
    SearchPage: undefined;
    Recipe: {
        id?: string;
        name?: string;
        listOfRecipes?: string[];
        listOfRecipesIDs?: string[];
        indxCurrent?: number ;
        screenFrom?: string;

    }
    Carousel : {
        index: string;
        listOfRecipes: string[];
    }
}

export type ProfileStackList = {
    ProfilePage: undefined;
    EditProfile: undefined;
}

export type AuthStackList = {
    LoginStackScreen: undefined;
}