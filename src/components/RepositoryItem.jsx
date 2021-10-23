import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';
import Text from './Text';
import nFormatter from '../utils/nFormatter';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.reposityItemBG,
    padding: 10,
  },
  topContainer: {
    flexDirection: 'row',
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
  },
  gitHubButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const RepositoryItemDetail = ({ number, text }) => (
  <View style={styles.detailContainer}>
    <Text fontWeight='bold' testID={`${text}Count`}>{nFormatter(number, 1)}</Text>
    <Text color='textSecondary'>{text}</Text>
  </View>
);

const RepositoryItem = ({ item, showLink=false }) => {

  const handleOpenInGitHub = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text fontSize='heading' fontWeight='bold' testID="fullName">{item.fullName}</Text>
          <Text fontSize='subheading' color='textSecondary' style={{ flex: 1, flexShrink: 1 }} testID="description">
            {item.description}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.tag}><Text color='tag' testID="language">{item.language}</Text></View>
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
      {showLink
        ?
        <Pressable style={styles.gitHubButton} onPress={() => handleOpenInGitHub(item.url)} testID="gitHubButton">
          <Text color='tag' fontWeight='bold'>Open in GitHub</Text>
        </Pressable>
        : null
      }
    </View>
  );
};

export default RepositoryItem;