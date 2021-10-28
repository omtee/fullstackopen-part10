import React from 'react';
import { useParams } from 'react-router-dom';
import { StyleSheet, View, FlatList } from 'react-native';
import { format } from 'date-fns';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

import Text from './Text';
import theme from '../theme';

const ratingSize = 50;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.reposityItemBG,
    padding: 10,
  },
  reviewContainer: {
    flex: 1,
  },
  authorContainer: {
    paddingVertical: 5,
  },
  textContainer: {
    paddingVertical: 5,
  },
  rating: {
    width: ratingSize,
    height: ratingSize,
    borderRadius: ratingSize / 2,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showLink={true} />;
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text fontWeight='bold' color='primary' style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <View style={styles.authorContainer}>
          <Text fontWeight='bold'>{review.user.username}</Text>
          <Text color='textSecondary'>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>{review.text}</Text>
        </View> 
      </View>
    </View>
  );
};

const RepositoryItemView = () => {
  let { id } = useParams();
  const variables = { id, first: 2 };
  const { repository, loading, fetchMore } = useRepository(variables);

  if (loading) {
    return (
      <View><Text>Loading...</Text></View>
    );
  }

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    console.log('You have reached the end of the review list');
    fetchMore();
  };

  const ItemSeparator = () => <View style={styles.separator} />;
  const renderItem = ({ item }) => <ReviewItem review={item} />;

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          {ItemSeparator()}
        </View>
        )
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

export default RepositoryItemView;