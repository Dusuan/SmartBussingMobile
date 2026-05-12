import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/AppText';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  SharedValue 
} from 'react-native-reanimated';

interface GetDirectionsButtonProps {
  /** Show the button (true when a destination marker is active) */
  visible: boolean;
  /** True while the backend request is in-flight */
  isLoading: boolean;
  /** Called when the user taps the button */
  onPress: () => void;
  /** Animated top edge position of the BottomSheet */
  animatedPosition: SharedValue<number>;
}

export default function GetDirectionsButton({
  visible,
  isLoading,
  onPress,
  animatedPosition,
}: GetDirectionsButtonProps) {
  
  const animatedStyle = useAnimatedStyle(() => {
    // The button should float about 12px above the bottom sheet top edge
    // We also add an internal translation when it appears/disappears
    const internalTranslateY = withSpring(visible ? 0 : 40, { damping: 15 });
    const opacity = withTiming(visible ? 1 : 0, { duration: 250 });

    return {
      top: animatedPosition.value - 76, // 64 (height) + 12 (margin)
      opacity,
      transform: [{ translateY: internalTranslateY }],
      // Use pointerEvents indirectly via opacity or separate logic, 
      // but reanimated style won't change pointerEvents directly easily.
    };
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        animatedStyle,
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <TouchableOpacity
        id="get-directions-button"
        activeOpacity={0.85}
        onPress={onPress}
        disabled={isLoading}
        style={styles.button}
      >
        {isLoading ? (
          <View style={styles.row}>
            <ActivityIndicator size="small" color="#FFFFFF" style={styles.icon} />
            <Text style={styles.label}>Calculando ruta…</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Ionicons name="navigate" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.label}>Obtener direcciones</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 15,
    // Soft shadow so it lifts above the map
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    backgroundColor: '#5B9EA0',
    borderRadius: 30,
    height: 64, // Explicit height for easier positioning calculation
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
