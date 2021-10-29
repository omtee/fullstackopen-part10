import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const FlatlistItemSeparator = () => <View style={styles.separator} />;

export default FlatlistItemSeparator;