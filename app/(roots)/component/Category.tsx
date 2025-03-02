import { View, Text } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import CategoryItems from './CategoryItems';

const Category = () => {
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Categories</Text>
        <AntDesign name="swapright" size={24} color="black" />
      </View>
      <CategoryItems/>
    </View>
  );
};

export default Category;
