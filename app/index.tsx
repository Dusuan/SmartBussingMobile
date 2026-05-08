import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/AppText";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import Entypo from "react-native-vector-icons/Entypo";
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })

  .then(() => {
    // Request config successfully set!
  });

  mobileAds().initialize();

  

export default function Index() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.contentContainer}>
        {/* Top Half: Logo */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="bus" size={70} color="#5B9EA0" />
          </View>
          <Text style={styles.headerTitle}>SMART{'\n'}BUSSING</Text>
        </View>

        {/* Middle Section: Action Buttons */}
        <View style={styles.middleSection}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.navigate("/login" as any)}
         */}

          <Button className="mb-8" mode="elevated">
            <Link href="/(likedRoute)"> Vista de rutas Favoritas </Link>
          </Button>
        </View>
        <View
          className="mb-8"
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 90,
          }}
        >
          <Button
            className="mb-8"
            mode="elevated"
            buttonColor="#1d3a2d"
            textColor="#f5f5f5"
            style={{
              marginRight: 25,
              borderRadius: 15,
              paddingVertical: 8,
              paddingHorizontal: 5,
            }}
          >
            <Link href="/login">Login</Link>
          </Button>
<Button
            className="mb-8"
            mode="elevated"
            buttonColor="#1d3a2d"
            textColor="#f5f5f5"
            style={{
              marginRight: 25,
              borderRadius: 15,
              paddingVertical: 8,
              paddingHorizontal: 5,
            }}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.navigate("/register" as any)}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.devButton]}
            onPress={() => router.navigate("/(dashboard)" as any)}
          >
            <Text style={styles.buttonText}>Dev (Dashboard)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section: City/Bus Illustration */}
      <View style={styles.bottomSection}>
        <Image
          source={require("../assets/images/fondosplash.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEFEFF", 
  },
  contentContainer: {
    flex: 1,
    zIndex: 10,
    paddingBottom: 320, 
  },
  topSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    color: '#5B9EA0',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
  middleSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#5B9EA0',
    width: '80%',
    height: 52,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  devButton: {
    backgroundColor: '#4A4A4A',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  illustration: {
    width: width,
    height: 300, 
  }
});
