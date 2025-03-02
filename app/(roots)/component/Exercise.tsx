import { View, Text } from 'react-native';
import React from 'react';
import ExerciseItems from './ExerciseItems';

const Exercise = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Exercises</Text>
      <ExerciseItems />
    </View>
  );
};

export default Exercise;
