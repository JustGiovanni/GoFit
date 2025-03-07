import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { getDownloadURL, ref } from '@firebase/storage';
import { storage } from '../../../Firebase/config';
import { Audio } from 'expo-av';

// Types
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
    const navigation = useNavigation();

    const [gifUrl, setGifUrl] = useState<string | null>(null);
    const [time, setTime] = useState<number>(60);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const fetchGifUrl = async () => {
            try {
                const storageRef = ref(storage, `All Exercises/${exercise.gif_url}`);
                const url = await getDownloadURL(storageRef);
                setGifUrl(url);
            } catch (error) {
                console.error('Failed to load GIF:', error);
            }
        };
        fetchGifUrl();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const playCountdownSound = async () => {
        if (time <= 3) {
            const { sound } = await Audio.Sound.createAsync(
                require('../../../assets/sounds/beep.mp3')
            );
            setSound(sound);
            await sound.playAsync();
        }
    };

    useEffect(() => {
        if (time <= 3 && countdown !== null) {
            playCountdownSound();
        }
    }, [time]);

    const startTimer = () => {
        if (countdown) return; // Prevent multiple timers

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCountdown(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        setCountdown(interval as unknown as number); // Fix TS type issue
    };

    const resetTimer = () => {
        if (countdown) clearInterval(countdown);
        setCountdown(null);
        setTime(60);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                {gifUrl && (
                    <Image source={{ uri: gifUrl }} style={styles.gif} />
                )}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={32} color="white" />
                </TouchableOpacity>
            </View>

            {/* Workout Title & Details */}
            <Text style={styles.title}>{exercise.title}</Text>
            <View style={styles.tagContainer}>
                <Text style={styles.categoryTag}>{exercise.category}</Text>
                <Text style={styles.intensityTag}>
                    Intensity: <Text style={styles.intensityValue}>{exercise.intensity}</Text>
                </Text>
            </View>

            {/* Instructions */}
            <Text style={styles.instructionsHeader}>Instructions</Text>
            <View style={styles.instructionsContainer}>
                {exercise.instructions.map((instruction) => (
                    <Text key={instruction.step} style={styles.instructionText}>
                        {instruction.step}. {instruction.text}
                    </Text>
                ))}
            </View>

            {/* Timer Controls */}
            <View style={styles.timerContainer}>
                <TouchableOpacity onPress={() => setTime((prev) => Math.max(prev - 5, 0))}>
                    <Feather name="minus-circle" size={40} color="black" />
                </TouchableOpacity>

                <Text style={styles.timerText}>{time}s</Text>

                <TouchableOpacity onPress={() => setTime((prev) => prev + 5)}>
                    <Feather name="plus-circle" size={40} color="black" />
                </TouchableOpacity>
            </View>

            {/* Start / Reset Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.startButton} onPress={startTimer}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    imageContainer: {
        width: '100%',
        height: 300, // Increased slightly
        marginTop: 10, // Move down a bit
        position: 'relative',
    },
    gif: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 5,
        borderRadius: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 12,
        color: '#333',
    },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginTop: 6,
    },
    categoryTag: {
        backgroundColor: '#ffe4e1',
        color: '#ff69b4',
        fontWeight: 'bold',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 16,
        fontSize: 14,
    },
    intensityTag: {
        fontSize: 16,
        color: '#555',
    },
    intensityValue: {
        color: '#64b5f6',
        fontWeight: 'bold',
    },
    instructionsHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 6,
        paddingHorizontal: 16,
    },
    instructionsContainer: {
        paddingHorizontal: 16,
    },
    instructionText: {
        fontSize: 18,
        marginBottom: 6,
        color: '#444',
    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        gap: 50,
    },
    timerText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 16,
        paddingHorizontal: 16,
    },
    startButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 38,
        borderRadius: 30,
    },
    resetButton: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        paddingHorizontal: 38,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ExerciseScreen;
