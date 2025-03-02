import { View } from 'react-native';
import React from 'react';
import Welcome from '../component/Welcome';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutOTD from '../component/WorkoutOTD';
import Separator from '../component/Separator';
import Category from '../component/Category';
import Exercise from '../component/Exercise';
import { ScrollView } from 'react-native';

export default function WorkoutScreen() {
  return (
    <SafeAreaView className="flex-1">
      {/* Wrap everything inside ScrollView to allow whole page scrolling */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mx-[1%]">
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
