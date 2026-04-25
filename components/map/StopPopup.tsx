import React from 'react';
import { View, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
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
  
  const handleOpenGoogleMaps = () => {
    // If specific URL is provided, use it. Otherwise fallback to coordinates
    const url = googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;
    Linking.openURL(url).catch(err => console.error('Error opening maps', err));
  };

  return (
    <Card style={styles.cardContainer} mode="elevated">
      <View style={styles.contentRow}>
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
          <View style={styles.headerRow}>
            <AppText style={styles.title} numberOfLines={1}>{stopName}</AppText>
            <IconButton 
              icon="close" 
              size={18} 
              onPress={onClose} 
              style={styles.closeBtn} 
              iconColor="#A4FFD7"
            />
          </View>
          
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
        
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.mapsButton} onPress={handleOpenGoogleMaps}>
            <MaterialCommunityIcons name="arrow-top-left-thick" size={24} color="#1D3A2D" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: -10, // pull close button closer
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  closeBtn: {
    margin: 0,
    padding: 0,
    width: 24,
    height: 24,
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
