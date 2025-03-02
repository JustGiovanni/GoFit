import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import workoutData from '../../../exercise_data.json';

// Define type for data
type ExerciseItem = {
    id: number;
    category: string;
    title: string;
    intensity: string;
    gif_url: string;
    instructions: { step: number; text: string }[];
};

// Static placeholder image (same for all items)
const exerciseImage = require('../../../assets/images/exercise1.jpg');

// Get screen width to calculate item width (2 items per row)
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / 2; // 16px padding left/right + 8px gap between columns

// Render each workout item
const renderWorkoutItem = ({ item }: { item: ExerciseItem }) => (
    <TouchableOpacity style={[styles.itemContainer, { width: itemWidth }]}>
        <ImageBackground source={exerciseImage} style={styles.imageBackground}>
            {/* Category Text - Top Left (no background) */}
            <Text style={styles.categoryText}>{item.category || 'Category'}</Text>

            {/* Title at Bottom */}
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.title || 'No Title'}</Text>
            </View>
        </ImageBackground>
    </TouchableOpacity>
);

// Main component
const ExerciseItems = () => (
    <View style={{ flex: 1 }}>
        <FlashList
            data={workoutData}
            numColumns={2}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={180}
            contentContainerStyle={styles.listContainer}
        />
    </View>
);

// Styles
const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    itemContainer: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageBackground: {
        height: 160,
        justifyContent: 'flex-end',
        padding: 8,
    },
    categoryText: {
        position: 'absolute',
        top: 8,
        left: 8,
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white', // Directly over image
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 8,
    },
    titleText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ExerciseItems;
