import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
const icons: Record<string, (props: { color: string }) => JSX.Element> = {
    WorkoutScreen: (props) => <FontAwesome5 name="dumbbell" size={26} {...props} />,
    TimerScreen: (props) => <Ionicons name="timer-outline" size={26} {...props} />,
    CalculationScreen: (props) => <FontAwesome name="calculator" size={26} {...props} />,
  };

  const primaryColor = '#0891b2';
  const greyColor = '#737373';

  return (
    <View style={styles.tabbar} pointerEvents="box-none">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          console.log(`Navigating to: ${route.name}`); // 🔍 Debugging Log
          navigation.navigate(route.name);
        };

        return (
          <Pressable
            key={route.name}
            style={({ pressed }) => [
              styles.tabbarItem,
              { opacity: pressed ? 0.5 : 1 } // Adds press feedback
            ]}
            onPress={onPress}
          >
            {icons[route.name] && icons[route.name]({ color: isFocused ? primaryColor : greyColor })}
            <Text style={{ color: isFocused ? primaryColor : greyColor, fontSize: 11 }}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBar;
