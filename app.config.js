import 'dotenv/config';


export default {
  expo: {
    name: 'SmartBussingMobile',
    slug: 'SmartBussingMobile',
    android: {
      package: 'com.anonymous.SmartBussingMobile',
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    ios: {
      bundleIdentifier: 'com.anonymous.SmartBussingMobile',
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
};
