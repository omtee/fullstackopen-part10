import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 5,
    padding: 5,
    backgroundColor: theme.colors.appBarBG,
  },
  link: {
    padding: 5,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.link}>
          <Link to="/">
            <Text color='appBar'>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.link}>
          <Link to="/signin">
            <Text color='appBar'>Sign in</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;