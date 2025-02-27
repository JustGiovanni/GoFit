import { View, Text } from 'react-native';
import Welcome from '../component/Welcome';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutOTD from '../component/WorkoutOTD';

export default function WorkoutScreen() {
  return (
    <SafeAreaView className="mx-[1%]">
         < Welcome/>
         <WorkoutOTD/>
    </SafeAreaView>
   
    
  );
}
