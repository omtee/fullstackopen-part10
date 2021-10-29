import React from 'react';
import { useParams } from 'react-router-dom';
import { View, FlatList } from 'react-native';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import ReviewItem from './ReviewItem';
import FlatlistItemSeparator from './FlatlistItemSeparator';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showLink={true} />;
};

const RepositoryItemView = () => {
  let { id } = useParams();
  const variables = { id, first: 6 };
  const { repository, loading, fetchMore } = useRepository(variables);

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => fetchMore();
  
  const renderItem = ({ item }) => <ReviewItem review={item} />;

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={() => <FlatlistItemSeparator />}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          {<FlatlistItemSeparator />}
        </View>
        )
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  );
};

export default RepositoryItemView;