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