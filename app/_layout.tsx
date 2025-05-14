import "../global.css";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
export default function RootLayout() {
  return (
    <PaperProvider>
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
      </Stack>
    </PaperProvider>
  );
}
