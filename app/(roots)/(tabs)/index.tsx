import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutScreen from './WorkoutScreen';
import TimerScreen from './TimerScreen';
import CalculationScreen from './CalculationScreen';
import TabBar from '@/components/TabBar';// Importing the custom TabBar from the same directory

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator 
      tabBar={(props) => <TabBar {...props} />} // Custom Tab Bar
      screenOptions={{ headerShown: false }} // Hide top header if needed
    >
      <Tab.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <Tab.Screen name="TimerScreen" component={TimerScreen} />
      <Tab.Screen name="CalculationScreen" component={CalculationScreen} />
    </Tab.Navigator>
  );
}
