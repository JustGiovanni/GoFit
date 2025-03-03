import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getDownloadURL, ref } from '@firebase/storage';
import { storage } from '../../../Firebase/config';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

type RootStackParamList = {
    ExerciseScreen: { exercise: ExerciseItem };
};

type ExerciseItem = {
    id: number;
    category: string;
    title: string;
    intensity: string;
    gif_url: string;
    instructions: { step: number; text: string }[];
};

const ExerciseScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ExerciseScreen'>>();
    const { exercise } = route.params;

    const [gifUrl, setGifUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [workoutTime, setWorkoutTime] = useState(60); // default 60 seconds
    const [secondsLeft, setSecondsLeft] = useState(workoutTime); 
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        fetchGifUrl();
    }, []);

    useEffect(() => {
        setSecondsLeft(workoutTime); // keep sync if workout time changes
    }, [workoutTime]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        playSound('end');
                        setIsRunning(false);
                        return 0;
                    }
                    if (prev <= 4) {
                        playSound('countdown'); // plays at 3,2,1
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning, secondsLeft]);

    const fetchGifUrl = async () => {
        try {
            const storageRef = ref(storage, `All Exercises/${exercise.gif_url}`);
            const url = await getDownloadURL(storageRef);
            setGifUrl(url);
        } catch (error) {
            console.error('Failed to load image:', error);
        } finally {
            setLoading(false);
        }
    };

    const playSound = async (type: 'countdown' | 'end') => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                type === 'countdown'
                    ? require('../../../assets/sounds/beep.mp3')
                    : require('../../../assets/sounds/ding.mp3')
            );
            await sound.playAsync();
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    };

    const increaseTime = () => setWorkoutTime((prev) => prev + 5);
    const decreaseTime = () => setWorkoutTime((prev) => (prev > 5 ? prev - 5 : 5));
    const resetTime = () => {
        setIsRunning(false);
        setWorkoutTime(60);
        setSecondsLeft(60);
    };
    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
            ) : (
                <Image source={{ uri: gifUrl ?? '' }} style={styles.image} resizeMode="cover" />
            )}

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{exercise.title}</Text>

                <View style={styles.tagsContainer}>
                    <Text style={styles.category}>{exercise.category}</Text>
                    <View style={styles.intensityContainer}>
                        <Text style={styles.intensityLabel}>Intensity:</Text>
                        <Text style={styles.intensityValue}>{exercise.intensity}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Instructions</Text>
                {exercise.instructions.map((instruction) => (
                    <Text key={instruction.step} style={styles.instructionText}>
                        {instruction.step}. {instruction.text}
                    </Text>
                ))}

                <View style={styles.timerContainer}>
                    <TouchableOpacity onPress={decreaseTime} style={styles.timerButton}>
                        <Ionicons name="remove-circle" size={36} color="#FF3B30" />
                    </TouchableOpacity>

                    <Text style={styles.timerText}>{secondsLeft} sec</Text>

                    <TouchableOpacity onPress={increaseTime} style={styles.timerButton}>
                        <Ionicons name="add-circle" size={36} color="#34C759" />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    {!isRunning ? (
                        <TouchableOpacity style={styles.startButton} onPress={startTimer}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
                            <Text style={styles.buttonText}>Pause</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.resetButton} onPress={resetTime}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FC' },
    contentContainer: { paddingBottom: 30 },
    loader: { marginVertical: 50 },
    image: { width: '100%', height: 250 },
    detailsContainer: { padding: 16 },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12, color: '#1A1A1A' },
    tagsContainer: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    category: {
        backgroundColor: '#FF69B4',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        color: '#FFF',
        fontWeight: 'bold',
    },
    intensityContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    intensityLabel: { fontWeight: 'bold', color: '#007AFF' },
    intensityValue: { color: '#ADD8E6', fontWeight: 'bold' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    instructionText: { fontSize: 16, marginBottom: 4, color: '#444' },
    timerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, marginVertical: 16 },
    timerButton: { padding: 4 },
    timerText: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
    startButton: {
        backgroundColor: '#34C759', flex: 1, marginRight: 8, paddingVertical: 12, borderRadius: 8, alignItems: 'center',
    },
    stopButton: {
        backgroundColor: '#FFA500', flex: 1, marginRight: 8, paddingVertical: 12, borderRadius: 8, alignItems: 'center',
    },
    resetButton: {
        backgroundColor: '#FF3B30', flex: 1, marginLeft: 8, paddingVertical: 12, borderRadius: 8, alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ExerciseScreen;
