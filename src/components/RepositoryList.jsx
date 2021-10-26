import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce/lib';

const styles = StyleSheet.create({
  searchBar: {
    padding: 0,
  },
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

const SearchBar =({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <Searchbar
      style={styles.searchBar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
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

const queryVariables = (selectedSort, searchKeyword) => {
  const order = () => {
    switch (selectedSort) {
      case "latest":
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
      case "highest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      case "lowest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        return {};
    }
  };
  return { ...order(), searchKeyword };
};

const RepositoryList = () => {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ searchKeyword ] = useDebounce(searchQuery, 500);
  const [ selectedSort, setSort ] = useState("latest");
  const variables = queryVariables(selectedSort, searchKeyword);
  const { repositories } = useRepositories(variables);

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SortPicker selectedSort={selectedSort} setSort={setSort} />
      <RepositoryListContainer repositories={repositories} />
    </>
  );
};

export default RepositoryList;