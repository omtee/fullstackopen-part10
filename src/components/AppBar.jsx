import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    padding: 5,
    backgroundColor: theme.colors.appBarBG,
    color: theme.colors.appBarText,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>Repositories</Pressable>
    </View>
  );
};

export default AppBar;