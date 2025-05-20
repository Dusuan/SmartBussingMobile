import "../global.css";
import { Stack } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import Text from '../components/AppText';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MyFont: require("../assets/fonts/Manrope-regular.otf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const theme = {
    ...DefaultTheme,
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        fontFamily: "MyFont",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "MyFont",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "MyFont",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "MyFont",
        fontWeight: "normal",
      },
    },
  };
  return (
    <PaperProvider theme={theme}>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen
          name="(routeView)/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(likedRoute)/index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(profile)/index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(dashboard)/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(com_microbuses)/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(profile)/configuracion"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(com_rutas)/index"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </PaperProvider>
  );
}
