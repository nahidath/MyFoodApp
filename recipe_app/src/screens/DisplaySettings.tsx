import {View, Text, Switch} from "react-native";
import styles from "../stylesheets/DS_stylesheet";
import general from "../stylesheets/General_stylesheet";
import React, {useEffect, useState} from "react";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import {useDispatch, useSelector} from "react-redux";
import {themeChange} from "../redux-store/actions";
import {themeReducer} from "../redux-store/reducers";


const DisplaySettings = () => {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    // const theme = useSelector((state: { themeReducer: { theme: any; }; }) => state.themeReducer.theme);
    const dispatch = useDispatch();
    // const [mode, setMode] = useState(theme);
    // console.log(mode);

    // const handleThemeChange = () => {
    //     if (mode === 'light') {
    //         dispatch(themeChange('dark'));
    //     } else {
    //         dispatch(themeChange('light'));
    //     }
    //
    // }

    const toggleSwitchDarkMode = () => {
        setIsEnabled(previousState => !previousState);
        if(isEnabled){
            dispatch(themeChange('light'));
        }else{
            dispatch(themeChange('dark'));
        }
        // handleThemeChange();
    }

    console.log(isEnabled);

    // useEffect(() => {
    //     setMode(theme);
    // }, [theme]);

    return (
        // <View style={mode == 'light' ? [styles.container, general.container] : [styles.container_dark, general.container_dark] }>
        //     {mode == 'light' ? <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FAF9F6" /> : <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1E1E1E" />}
        //     <View style={styles.switchContainer}>
        //         <View style={mode == 'light' ? [styles.pusherContainer, general.shadow]: [styles.pusherContainerDark, general.shadowDark]}>
        //             <Text style={mode == 'light' ? styles.textTitle: styles.textTitleDark }>Switch to Dark Mode</Text>
        //             <Switch
        //                 trackColor={{false: '#767577', true: '#b1dad6'}}
        //                 thumbColor={isEnabled ? '#008375' : '#f4f3f4'}
        //                 ios_backgroundColor="#3e3e3e"
        //                 onValueChange={toggleSwitchDarkMode}
        //                 value={isEnabled}
        //             />
        //         </View>
        //     </View>
        // </View>
        <View style={[styles.container, general.container] }>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
            <View style={styles.switchContainer}>
                <View style={[styles.pusherContainer, general.shadow]}>
                    <Text style={styles.textTitle}>Switch to Dark Mode</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#b1dad6'}}
                        thumbColor={isEnabled ? '#008375' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchDarkMode}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
    );
};
export default DisplaySettings;