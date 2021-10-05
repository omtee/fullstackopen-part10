import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { nFormatter } from '../utils';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.reposityItemBG,
  },
  topContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  tag: {
    marginTop: 10,
    padding: 6,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  detailContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
  }
});

const RepositoryItemDetail = ({ number, text }) => (
  <View style={styles.detailContainer}>
    <Text fontWeight='bold'>{nFormatter(number, 1)}</Text>
    <Text color='textSecondary'>{text}</Text>
  </View>
);

const RepositoryItem = ({ item }) => (
  <View style={styles.mainContainer}>
    <View style={styles.topContainer}>
      <Image style={styles.avatar} source={item.ownerAvatarUrl} />
      <View style={styles.infoContainer}>
        <Text fontSize='heading' fontWeight='bold'>{item.fullName}</Text>
        <Text fontSize='subheading' color='textSecondary' style={{ flex: 1, flexShrink: 1 }}>{item.description}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.tag}><Text color='tag'>{item.language}</Text></View>
          <View style={{ flexGrow: 1 }}></View>
        </View>
      </View>
    </View>
    <View style={styles.bottomContainer}>
      <RepositoryItemDetail number={item.stargazersCount} text='Stars' />
      <RepositoryItemDetail number={item.forksCount} text='Forks' />
      <RepositoryItemDetail number={item.reviewCount} text='Reviews' />
      <RepositoryItemDetail number={item.ratingAverage} text='Rating' />
    </View>
  </View>
);

export default RepositoryItem;