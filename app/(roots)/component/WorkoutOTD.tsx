import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

const odtImage = require('../../../assets/images/workoutotd.jpg');

const WorkoutOTD = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={odtImage} style={styles.image} resizeMode="cover">
          <View style={styles.textContainer}>
            <Text style={styles.text}>Workout Of The Day</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    height: 160, // Equivalent to h-40 (40 * 4)
    width: '90%',
  },
  image: {
    flex: 1, // Ensure ImageBackground takes up the full space
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)', // Optional: Dark overlay for better text visibility
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 24, // Equivalent to text-3xl
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WorkoutOTD;
