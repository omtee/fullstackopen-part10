import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  sortPicker: {
    padding: 20,
    borderWidth: 0,
    backgroundColor: theme.colors.mainBG,
  },
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  let history = useHistory();
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const handlePress = (id) => {
    history.push(`/view/${id}`);
  };

  const ItemSeparator = () => <View style={styles.separator} />;
  const renderItem = ({ item }) => (
    <Pressable onPress={() => handlePress(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const SortPicker = ({ selectedSort, setSort }) => (
  <Picker style={styles.sortPicker} selectedValue={selectedSort} onValueChange={(itemValue) => setSort(itemValue)}>
    <Picker.Item label="Latest repositories" value="latest" />
    <Picker.Item label="Highest rated repositories" value="highest" />
    <Picker.Item label="Lowest rated repositories" value="lowest" />
  </Picker>
);

const queryVariables = (selectedSort) => {
  let variables = {};
  switch (selectedSort) {
    case "latest":
      variables = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
      break;
    case "highest":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
    case "lowest":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    default:
      break;
  }
  return variables;
};

const RepositoryList = () => {
  const [ selectedSort, setSort ] = useState("latest");
  const variables = queryVariables(selectedSort);
  const { repositories } = useRepositories(variables);

  return (
    <>
      <SortPicker selectedSort={selectedSort} setSort={setSort} />
      <RepositoryListContainer repositories={repositories} />
    </>
  );
};

export default RepositoryList;