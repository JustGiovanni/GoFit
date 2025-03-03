import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from './TimerScreen';
import CalculationScreen from './CalculationScreen';
import TabBar from '@/components/TabBar';
import WorkoutStack from './WorkoutStack';  // Import the WorkoutStack

const Tab = createBottomTabNavigator();

export default function Index() {
    return (
        <Tab.Navigator 
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="WorkoutScreen" component={WorkoutStack} />
            <Tab.Screen name="TimerScreen" component={TimerScreen} />
            <Tab.Screen name="CalculationScreen" component={CalculationScreen} />
        </Tab.Navigator>
    );
}
