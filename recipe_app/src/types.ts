export type HomeStackList = {
    HomePage: undefined;
    Profile: undefined;
    Recipe: {
        id: string;
        name: string;
    }
    SpotlightRecipes: {
        recipes: string[];
    }
}