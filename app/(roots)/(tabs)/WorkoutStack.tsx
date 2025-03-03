import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from './WorkoutScreen';
import ExerciseScreen from './ExerciseScreen';

export type WorkoutStackParamList = {
    WorkoutScreen: undefined;
    ExerciseScreen: { exercise: {
        id: number;
        category: string;
        title: string;
        intensity: string;
        gif_url: string;
        instructions: { step: number; text: string }[];
    }};
};

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

export default function WorkoutStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
            <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
        </Stack.Navigator>
    );
}
