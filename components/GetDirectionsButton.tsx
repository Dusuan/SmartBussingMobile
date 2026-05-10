/**
 * @file components/GetDirectionsButton.tsx
 * @description Floating "Obtener direcciones" button that appears above the
 * BottomSheet when the user has selected a destination on the map.
 * Animates in/out with a slide-up spring and handles the loading state.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/AppText';

interface GetDirectionsButtonProps {
  /** Show the button (true when a destination marker is active) */
  visible: boolean;
  /** True while the backend request is in-flight */
  isLoading: boolean;
  /** Called when the user taps the button */
  onPress: () => void;
}

const BOTTOM_OFFSET = 108; // Sits just above the BottomSheet collapsed handle

export default function GetDirectionsButton({
  visible,
  isLoading,
  onPress,
}: GetDirectionsButtonProps) {
  const translateY = useRef(new Animated.Value(80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 80,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.wrapper,
        { transform: [{ translateY }], opacity },
      ]}
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
    bottom: BOTTOM_OFFSET,
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
    backgroundColor: '#3D9970',
    borderRadius: 30,
    paddingVertical: 15,
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
