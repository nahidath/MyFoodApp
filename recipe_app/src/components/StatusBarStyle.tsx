import * as React from 'react';
import { StatusBar, StatusBarProps} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const FocusAwareStatusBar = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<StatusBar> & Readonly<StatusBarProps>) => {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar;