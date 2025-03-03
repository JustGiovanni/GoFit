import { View, ScrollView } from 'react-native';
import React from 'react';
import Welcome from '../component/Welcome';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutOTD from '../component/WorkoutOTD';
import Separator from '../component/Separator';
import Category from '../component/Category';
import Exercise from '../component/Exercise';

export default function WorkoutScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ paddingHorizontal: '1%' }}>
          <Welcome />
          <WorkoutOTD />
          <Separator />
          <Category />
          <Separator />
          <Exercise />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
