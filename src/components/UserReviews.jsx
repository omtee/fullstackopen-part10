import React from 'react';
import { StyleSheet, FlatList, View, Pressable, Alert } from 'react-native';
import { useHistory } from 'react-router';

import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useDeleteReview from '../hooks/useDeleteReview';
import FlatlistItemSeparator from './FlatlistItemSeparator';
import ReviewItem from './ReviewItem';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: theme.colors.reposityItemBG,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    flexGrow: 0.35,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  primaryBG: {
    backgroundColor: theme.colors.primary,
  },
  errorBG: {
    backgroundColor: theme.colors.error,
  },
});

const UserReviewItem = ({ review, handleViewButton, handleDeleteButton }) => {
  return (
    <View style={styles.baseContainer}>
      <ReviewItem review={review} />
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.primaryBG]} onPress={() => handleViewButton(review.repository?.id)} testID="viewButton">
          <Text color='tag' fontWeight='bold'>View repository</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.errorBG]} onPress={() => handleDeleteButton(review.id)} testID="deleteButton">
          <Text color='tag' fontWeight='bold'>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const variables = { includeReviews: true, first: 6 };
  const { authorizedUser, loading, fetchMore, refetch } = useAuthorizedUser(variables);
  const [removeReview] = useDeleteReview();
  let history = useHistory();

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  const reviewNodes = authorizedUser
    ? authorizedUser.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => fetchMore();
  const handleViewButton = (repositoryID) => history.push(`/view/${repositoryID}`);
  const handleDeleteButton = (reviewID) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "DELETE",
          onPress: async () => {
            await removeReview(reviewID);
            await refetch();
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => <UserReviewItem review={item} handleViewButton={handleViewButton} handleDeleteButton={handleDeleteButton} />;

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={() => <FlatlistItemSeparator />}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  );
};

export default UserReviews;