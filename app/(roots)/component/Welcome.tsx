import { View, Text } from 'react-native'
import React from 'react'
import {
    useFonts,
    DMSerifDisplay_400Regular,
    DMSerifDisplay_400Regular_Italic,
  } from '@expo-google-fonts/dm-serif-display';
  

const Welcome = () => {
    let [fontsLoaded] = useFonts({
        DMSerifDisplay_400Regular,
        DMSerifDisplay_400Regular_Italic,
      });

  return (
    <View>
      <Text
      style={{
        fontFamily: 'DMSerifDisplay_400Regular',
        fontSize: 32,
        textAlign: "center",
        color: "#92400e",
      }}
      >Welcome</Text>
    </View>
  )
}

export default Welcome