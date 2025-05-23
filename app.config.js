import "dotenv/config";

export default {
  
  expo: {
    scheme: "SmartBussing",
    name: "SmartBussing",
    slug: "SmartBussing",
    extra: {
      MAPBOX_DOWNLOAD_TOKEN: process.env.MAPBOX_DOWNLOAD_TOKEN,
    },
    android :  {
      package: "com.anonymous.smartbussingmobile"
    },
    
      ios: {
        bundleIdentifier: "com.anonymous.smartbussingmobile"
      }
    ,
    plugins: [
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN,
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Show current location on map.",
        },
      ],
      [
        "expo-font"
      ]
    ],
  },
};
