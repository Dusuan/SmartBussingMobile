import React, { useCallback } from 'react';
import { View, StyleSheet, Image, Linking, GestureResponderEvent } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '@/components/AppText';

export interface StopPopupProps {
  stopName: string;
  description?: string;
  imageUrl?: string;
  routes?: string[];
  coordinates: [number, number]; // [lng, lat]
  googleMapsUrl?: string; // Optional direct search URL
  hideImage?: boolean; // If true, do not render the image block at all
  onClose: () => void;
}

const DEFAULT_IMAGE = require('../../assets/images/Microbus.jpg'); // Fallback mock image

export function StopPopup({ stopName, description, imageUrl, routes = [], coordinates, googleMapsUrl, hideImage, onClose }: StopPopupProps) {
  
  const handleOpenGoogleMaps = useCallback(() => {
    // If specific URL is provided, use it. Otherwise show exact location by coordinates
    const url = googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${coordinates[1]},${coordinates[0]}`;
    Linking.openURL(url).catch(err => console.error('Error opening maps', err));
  }, [googleMapsUrl, coordinates]);

  const handleCloseTap = useCallback((e: GestureResponderEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleMapsTap = useCallback((e: GestureResponderEvent) => {
    e.stopPropagation();
    handleOpenGoogleMaps();
  }, [handleOpenGoogleMaps]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentRow}>
        {/* Close button on the left */}
        <View style={styles.closeContainer}>
          <View
            style={styles.closeTouchable}
            onTouchEnd={handleCloseTap}
          >
            <MaterialCommunityIcons name="close" size={20} color="#A4FFD7" />
          </View>
        </View>

        {!hideImage && (
          <View style={styles.imageContainer}>
            <Image
              source={imageUrl ? { uri: imageUrl } : DEFAULT_IMAGE}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={styles.infoContainer}>
          <AppText style={styles.title} numberOfLines={1}>{stopName}</AppText>
          
          <AppText style={styles.description} numberOfLines={2}>
            {description || 'Parada de autobús local.'}
          </AppText>

          <View style={styles.routesContainer}>
            {routes.map(r => (
              <View key={r} style={styles.routeBadge}>
                <AppText style={styles.routeText}>{r}</AppText>
              </View>
            ))}
          </View>
        </View>
        
        {/* Arrow button on the right — flipped direction */}
        <View style={styles.actionContainer}>
          <View
            style={styles.mapsButton}
            onTouchEnd={handleMapsTap}
          >
            <MaterialCommunityIcons name="arrow-top-right-thick" size={24} color="#1D3A2D" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 320,
    backgroundColor: '#1D3A2D',
    borderRadius: 16,
    overflow: 'hidden',
    borderColor: '#A4FFD7',
    borderWidth: 1,
    // Add margin bottom to place the popup above the marker instead of centered on it
    marginBottom: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeContainer: {
    justifyContent: 'center',
    marginRight: 8,
  },
  closeTouchable: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(164, 255, 215, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    color: '#B0D8C9',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 6,
  },
  routesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  routeBadge: {
    backgroundColor: '#A4FFD7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  routeText: {
    color: '#1D3A2D',
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionContainer: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  mapsButton: {
    backgroundColor: '#A4FFD7',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
