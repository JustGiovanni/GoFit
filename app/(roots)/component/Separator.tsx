import { View, StyleSheet } from 'react-native';
import React from 'react';

const Separator = () => {
  return (
    <View style={styles.separator} />
  );
};

const styles = StyleSheet.create({
  separator: {
    width: 40, // Equivalent to w-10
    height: 3, // Thin horizontal line (can increase to make thicker)
    backgroundColor: '#a3a3a3', // Equivalent to border-gray-400
    alignSelf: 'center', // Equivalent to mx-auto
    marginVertical: 14, // Equivalent to my-7 (7 * 2 = 14)
  },
});

export default Separator;
