import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import './styles.css'
export default function RootLayout() {
  return (
    <PaperProvider children={undefined}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
