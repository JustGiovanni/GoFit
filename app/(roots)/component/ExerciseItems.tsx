import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import workoutData from '../../../exercise_data.json';
import { WorkoutStackParamList } from '../(tabs)/WorkoutStack'; // Import the stack types

type ExerciseItem = {
    id: number;
    category: string;
    title: string;
    intensity: string;
    gif_url: string;
    instructions: { step: number; text: string }[];
};

const exerciseImage = require('../../../assets/images/exercise1.jpg');
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / 2;

const ExerciseItems = () => {
    const navigation = useNavigation<NativeStackNavigationProp<WorkoutStackParamList>>();

    const renderWorkoutItem = ({ item }: { item: ExerciseItem }) => (
        <TouchableOpacity
            style={[styles.itemContainer, { width: itemWidth }]}
            onPress={() => navigation.navigate('ExerciseScreen', { exercise: item })}
        >
            <ImageBackground source={exerciseImage} style={styles.imageBackground}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
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
};

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
        color: 'white',
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