// @ts-ignore

import { StyleSheet, Text, View } from 'react-native';
import React, {FC} from 'react';

const Homepage: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to MyRecipeApp</Text>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Homepage;