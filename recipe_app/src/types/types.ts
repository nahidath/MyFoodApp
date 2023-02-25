import Register from "../screens/Register";
import EditProfile from "../screens/EditProfile";

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
    Search: undefined;
    LoginStackScreen: undefined;
    ProfileStackScreen: undefined;
    Cuisine: {
        cuisine: string;
    }
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
}

export type ProfileStackList = {
    Profile: undefined;
    EditProfile: undefined;
    FavoritesRecipesUser: undefined;
    LoginStackScreen: undefined;
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