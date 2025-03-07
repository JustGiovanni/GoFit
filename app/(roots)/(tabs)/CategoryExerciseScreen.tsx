import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../Firebase/config';
import exerciseData from '../../../exercise_data.json';
import { useRouter } from 'expo-router';


type ExerciseItem = {
    id: number;
    category: string;
    title: string;
    intensity: string;
    gif_url: string;
    instructions: { step: number; text: string }[];
};

const router = useRouter();

export default function CategoryExerciseScreen() {
    const { category } = useLocalSearchParams<{ category: string }>();
    const navigation = useNavigation();

    const [exercises, setExercises] = useState<ExerciseItem[]>([]);
    const [exerciseUrls, setExerciseUrls] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const filteredExercises = exerciseData.filter((ex) => ex.category.includes(category!));
        setExercises(filteredExercises);

        // Fetch all GIF URLs for the filtered exercises
        const fetchAllGifs = async () => {
            const urls: { [key: string]: string } = {};
            for (const exercise of filteredExercises) {
                const storageRef = ref(storage, `${category} Exercises/${exercise.gif_url}`);
                try {
                    urls[exercise.id] = await getDownloadURL(storageRef);
                } catch (error) {
                    console.error(`Failed to load ${exercise.gif_url}:`, error);
                    urls[exercise.id] = ''; // Handle missing images gracefully
                }
            }
            setExerciseUrls(urls);
        };

        fetchAllGifs();
    }, [category]);

    const openExerciseDetail = (exercise: ExerciseItem) => {
        router.push({
            pathname: '/ExerciseScreen',   // make sure your file is named correctly!
            params: {
                exercise: JSON.stringify(exercise)
            }
        });
    };

    const renderItem = ({ item }: { item: ExerciseItem }) => (
        <TouchableOpacity style={styles.exerciseCard} onPress={() => openExerciseDetail(item)}>
            <Image
                source={exerciseUrls[item.id] ? { uri: exerciseUrls[item.id] } : require('../../../assets/images/placeholder.jpg')}
                style={styles.thumbnail}
            />
            <View style={styles.exerciseInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.intensity}>{item.intensity}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Exercises in {category}</Text>
            <FlatList
                data={exercises}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    exerciseCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 12,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 0 },
        elevation: 3,
    },
    thumbnail: {
        width: 100,
        height: 100,
        backgroundColor: '#e0e0e0',
    },
    exerciseInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    intensity: {
        marginTop: 4,
        fontSize: 14,
        color: '#666',
    },
});
