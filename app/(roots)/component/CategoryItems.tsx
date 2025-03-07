import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';


const beginner = require('../../../assets/images/beginner.jpg');
const balance = require('../../../assets/images/balance.jpg');
const gentle = require('../../../assets/images/gentle.jpg');
const intense = require('../../../assets/images/intense.jpg');
const moderate = require('../../../assets/images/moderate.jpg');
const strength = require('../../../assets/images/strength.jpg');
const toning = require('../../../assets/images/toning.jpg');

type WorkoutItem = {
    id: number;
    imageSource: any;
    numberofExercises: number;
    title: string;
};

const workoutData: WorkoutItem[] = [
    { id: 1, imageSource: balance, numberofExercises: 9, title: 'Balance' },
    { id: 2, imageSource: beginner, numberofExercises: 7, title: 'Beginner' },
    { id: 3, imageSource: gentle, numberofExercises: 5, title: 'Gentle' },
    { id: 4, imageSource: intense, numberofExercises: 8, title: 'Intense' },
    { id: 5, imageSource: moderate, numberofExercises: 23, title: 'Moderate' },
    { id: 6, imageSource: strength, numberofExercises: 11, title: 'Strength' },
    { id: 7, imageSource: toning, numberofExercises: 10, title: 'Toning' },
];

const CategoryItems = () => {
    const router = useRouter();

    const handleExercisePress = (category: string) => {
        router.push({
            pathname: '../(tabs)/CategoryExerciseScreen',
            params: { category },
        });
    };

    const renderWorkoutItem = ({ item }: { item: WorkoutItem }) => (
        <TouchableOpacity onPress={() => handleExercisePress(item.title)}>
            <ImageBackground
                source={item.imageSource}
                style={{
                    height: 144,
                    width: 160,
                    borderRadius: 16,
                    overflow: 'hidden',
                    marginHorizontal: 8,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        padding: 12,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <FontAwesome5 name="dumbbell" size={18} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}>
                            {item.numberofExercises} Exercises
                        </Text>
                    </View>

                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 18,
                            letterSpacing: 1,
                        }}
                    >
                        {item.title}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={workoutData}
                renderItem={renderWorkoutItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default CategoryItems;
