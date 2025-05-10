import * as React from 'react';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Projeto" />
        <Stack.Screen name="Ua" />
        <Stack.Screen name="Individuos" />
        <Stack.Screen name="NovoIndividuo" />
        <Stack.Screen name="Camera" />
      </Stack>
  );
}