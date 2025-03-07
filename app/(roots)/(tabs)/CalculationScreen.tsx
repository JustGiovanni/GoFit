import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';

export default function CalculationScreen() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState<'cm' | 'in' | 'ft'>('cm');
    const [bmi, setBmi] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    const calculateBMI = () => {
        Keyboard.dismiss();

        if (!weight || !height) {
            Alert.alert('Input Error', 'Please enter both weight and height.');
            return;
        }

        let heightInMeters = 0;  // Safe default

        if (unit === 'cm') {
            heightInMeters = parseFloat(height) / 100;
        } else if (unit === 'in') {
            heightInMeters = parseFloat(height) * 0.0254;
        } else if (unit === 'ft') {
            heightInMeters = parseFloat(height) * 0.3048;
        }

        if (heightInMeters === 0) {
            Alert.alert('Invalid Unit', 'Please select a valid unit.');
            return;
        }

        const weightInKg = parseFloat(weight) * 0.453592;
        const bmiValue = weightInKg / (heightInMeters * heightInMeters);

        setBmi(parseFloat(bmiValue.toFixed(2)));

        if (bmiValue < 18.5) {
            setMessage('Underweight - Consider gaining some weight.');
        } else if (bmiValue < 24.9) {
            setMessage('Congratulations! You are in a healthy weight range.');
        } else if (bmiValue < 29.9) {
            setMessage('Overweight - Consider a healthier diet and more exercise.');
        } else {
            setMessage('Obesity - Please consult with a healthcare provider.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <Text style={styles.header}>BMI Calculator</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Weight (lbs):</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                        placeholder="Enter weight"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Height:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={height}
                        onChangeText={setHeight}
                        placeholder={`Enter height in ${unit}`}
                    />
                </View>

                <View style={styles.unitContainer}>
                    <TouchableOpacity
                        style={[styles.unitButton, unit === 'cm' && styles.unitButtonSelected]}
                        onPress={() => setUnit('cm')}
                    >
                        <Text style={styles.unitText}>cm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.unitButton, unit === 'in' && styles.unitButtonSelected]}
                        onPress={() => setUnit('in')}
                    >
                        <Text style={styles.unitText}>inches</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.unitButton, unit === 'ft' && styles.unitButtonSelected]}
                        onPress={() => setUnit('ft')}
                    >
                        <Text style={styles.unitText}>feet</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
                    <Text style={styles.buttonText}>Calculate BMI</Text>
                </TouchableOpacity>

                {bmi !== null && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>Your BMI: {bmi}</Text>
                        <Text style={styles.messageText}>{message}</Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#555',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    unitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    unitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ddd',
        borderRadius: 20,
    },
    unitButtonSelected: {
        backgroundColor: '#4CAF50',
    },
    unitText: {
        color: '#333',
        fontWeight: 'bold',
    },
    calculateButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resultContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    messageText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
});
