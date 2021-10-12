import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useHistory } from 'react-router-dom';

import theme from '../theme';
import Text from './Text';
import { useApolloClient, useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';


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
  let history = useHistory();
  const { data } = useQuery(AUTHORIZED_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const currentUser = data?.authorizedUser;

  const logOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.link}>
          <Link to="/">
            <Text color='appBar'>Repositories</Text>
          </Link>
        </Pressable>
        {currentUser
        ?
        <Pressable style={styles.link} onPress={logOut}>
          <Text color='appBar'>Sign out</Text>
        </Pressable>
        :
        <Pressable style={styles.link}>
          <Link to="/signin">
            <Text color='appBar'>Sign in</Text>
          </Link>
        </Pressable>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;