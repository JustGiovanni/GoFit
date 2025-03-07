import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet
} from 'react-native';

export default function TimerScreen() {
    const [roundDuration, setRoundDuration] = useState(10);
    const [restDuration, setRestDuration] = useState(3);
    const [numberOfRounds, setNumberOfRounds] = useState(2);
    const [currentRound, setCurrentRound] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(roundDuration);
    const [isResting, setIsResting] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);

    // Reset time based on phase and user settings
    useEffect(() => {
        setTime(isResting ? restDuration : roundDuration);
    }, [roundDuration, restDuration, isResting, resetFlag]);

    // Timer logic
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev === 0) {
                    handlePhaseSwitch();
                    return isResting ? roundDuration : restDuration;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // ✅ Clean up
    }, [isRunning, isResting]);

    const handlePhaseSwitch = () => {
        if (isResting) {
            if (currentRound < numberOfRounds) {
                setCurrentRound((prev) => prev + 1);
                setIsResting(false); // Back to workout phase
            } else {
                setIsRunning(false); // Completed all rounds
            }
        } else {
            setIsResting(true); // Switch to rest phase
        }
    };

    const startTimer = () => setIsRunning(true);
    const pauseTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setCurrentRound(1);
        setIsResting(false);
        setResetFlag((prev) => !prev); // trigger time reset
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Workout Timer Setup</Text>

                {/* Input Fields */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Number of Rounds</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={numberOfRounds.toString()}
                        onChangeText={(text) => setNumberOfRounds(Number(text) || 0)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Workout Duration (seconds)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={roundDuration.toString()}
                        onChangeText={(text) => setRoundDuration(Number(text) || 0)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Rest Duration (seconds)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={restDuration.toString()}
                        onChangeText={(text) => setRestDuration(Number(text) || 0)}
                    />
                </View>

                {/* Current State Display */}
                <Text style={styles.status}>
                    {isRunning
                        ? isResting
                            ? 'Resting'
                            : `Round ${currentRound}`
                        : currentRound === 1 && time === roundDuration
                            ? 'Ready to Start'
                            : currentRound === numberOfRounds && time === 0
                                ? 'Finished'
                                : 'Paused'}
                </Text>

                {/* Timer Display */}
                <Text style={styles.timer}>{time}s</Text>

                {/* Control Buttons */}
                <View style={styles.buttonContainer}>
                    <Button title="Start" onPress={startTimer} disabled={isRunning} />
                    <Button title="Pause" onPress={pauseTimer} disabled={!isRunning} />
                    <Button title="Reset" onPress={resetTimer} />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

// Styling for cleaner look
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
    },
    timer: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#e91e63',
        textAlign: 'center',
        marginVertical: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});
