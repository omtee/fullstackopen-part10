import React from 'react';

import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';

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
  ratingContainer: {
    width: ratingSize,
    height: ratingSize,
    borderRadius: ratingSize / 2,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    margin: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ratingContainer}>
        <Text fontWeight='bold' color='primary'>{review.rating}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <View style={styles.authorContainer}>
          <Text fontWeight='bold'>{review.user?.username ?? review.repository?.fullName}</Text>
          <Text color='textSecondary'>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>{review.text}</Text>
        </View> 
      </View>
    </View>
  );
};

export default ReviewItem;