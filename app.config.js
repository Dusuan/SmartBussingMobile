import "dotenv/config";

export default {
  expo: {
    scheme: "SmartBussing",
    name: "SmartBussing",
    slug: "smart-bussing-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: ["smartbussingmobile"],
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    owner: "smart-bussing",
    ios: {
      bundleIdentifier: "com.anonymous.smartbussingmobile",

      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: "com.anonymous.smartbussingmobile",

      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apikey: "env.GOOGLE_MAPS_API_KEY",
        },
      },
      package: "com.anonymous.SmartBussingMobile",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      MAPBOX_DOWNLOAD_TOKEN: process.env.MAPBOX_DOWNLOAD_TOKEN,
      eas: {
        projectId: "04c352a6-b378-4fdb-9b9b-64d0c38b698b",
      },
    },

    plugins: [
      [
        "@rnmapbox/maps",
        {
          RNMAPBOX_MAPS_DOWNLOAD_TOKEN: process.env.MAPBOX_DOWNLOAD_TOKEN,
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Show current location on map.",
        },
      ],
      ["expo-font"],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: "ca-app-pub-6372485658515796~9768969991"
        }
      ]
    ],
  },
};
