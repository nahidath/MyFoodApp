import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    children: React.ReactNode;
    content: string;
}

const Tooltip = ({ children, content }: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    const handlePress = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                {children}
            </TouchableOpacity>
            {isVisible && (
                <>
                <View style={styles.tooltipContainer}>
                    <View style={styles.tooltipContent}>
                        <Text style={styles.tooltipText}>{content}</Text>
                    </View>
                </View>
                <View style={styles.tooltipArrow} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    tooltipContainer: {
        position: 'absolute',
        bottom: '130%',
        left: '10%',
        marginLeft: -60,
        backgroundColor: 'gray',
        borderRadius: 4,
        overflow: 'hidden',
        zIndex: 1,
        width: 150,
    },
    tooltipArrow: {
        position: 'absolute',
        top: -8,
        left: '60%',
        marginLeft: -8,
        width: 0,
        height: 0,
        borderWidth: 8,
        borderTopWidth: 8,
        borderTopColor: 'grey',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        zIndex: 1,
    },
    tooltipContent: {
        padding: 8,
    },
    tooltipText: {
        color: 'white',
    },
});

export default Tooltip;
