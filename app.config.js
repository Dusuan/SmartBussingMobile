import "dotenv/config";

export default {
  expo: {
    scheme: "SmartBussing",
    name: "SmartBussing",
    slug: "SmartBussing",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: ["smartbussingmobile"],
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "com.anonymous.smartbussingmobile",

      supportsTablet: true,
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
    ],
  },
};
