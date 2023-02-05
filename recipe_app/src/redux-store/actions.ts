import {THEME_CHANGE} from "./constants";

export const themeChange = (theme: string) => ({
    type: THEME_CHANGE,
    payload: theme,
});