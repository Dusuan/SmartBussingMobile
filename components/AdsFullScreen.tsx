import React, { useRef } from "react";
import { View, TouchableOpacity, Animated, Dimensions, Platform, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import { BannerAd, BannerAdSize, TestIds, useForeground } from "react-native-google-mobile-ads";
import Text from "@/components/AppText";
import Anuncio from "@/components/anuncio";

const height = Dimensions.get("window").height;
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6372485658515796~9768969991';

interface AdsFullScreenProps {
  isVisible: boolean;
  slideAnim: Animated.Value;
  hideAds: () => void;
}

export default function AdsFullScreen({ isVisible, slideAnim, hideAds }: AdsFullScreenProps) {
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === 'android' && bannerRef.current?.load();
  });

  if (!isVisible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        zIndex: 50,
        elevation: 20,
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, height + 50],
            }),
          },
        ],
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 50,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0,0,0,0.1)",
        }}
      >
        <Text style={{ color: "#4A4A4A", fontSize: 20, fontWeight: "700" }}>
          📍 Lugares de la semana
        </Text>
        <IconButton
          icon="close"
          size={28}
          iconColor="#4A4A4A"
          onPress={hideAds}
          style={{ margin: 0 }}
        />
      </View>

      {/* Contenido con scroll vertical */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        style={{ flex: 1 }}
      >
        <Anuncio
          nombreEmpresa={"Empresa"}
          descripcion={"Descripcion de empresa"}
          distancia={"Distancia"}
        />
        <Anuncio
          nombreEmpresa={"Empresa 2"}
          descripcion={"Otra descripcion"}
          distancia={"Distancia"}
        />
        <Anuncio
          nombreEmpresa={"Empresa 3"}
          descripcion={"Más lugares"}
          distancia={"Distancia"}
        />
      </ScrollView>

      {/* Footer estilo AdsModal */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' }}>
        <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>¿Quisieras un espacio? </Text>
        <TouchableOpacity>
          <Text style={{ color: '#5B9EA0', fontWeight: 'bold', textDecorationLine: 'underline' }}>
            Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>

      {/* Banner Ad fijo en la parte inferior */}
      <View style={{ paddingBottom: 24 }}>
        <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </View>
    </Animated.View>
  );
}
