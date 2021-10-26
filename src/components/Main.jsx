import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';

import theme from '../theme';

import AppBar from './AppBar';
import RepositoryItemView from './RepositoryItemView';
import RepositoryList from './RepositoryList';
import Review from './Review';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBG,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
      <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/review" exact>
          <Review />
        </Route>
        <Route path="/view/:id">
          <RepositoryItemView />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;