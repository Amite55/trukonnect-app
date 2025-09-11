import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <StatusBar />
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarAnimation: "fade",
              statusBarStyle: "light",
              statusBarHidden: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboardingScreen" />
            <Stack.Screen name="taskPerformerSection" />
            <Stack.Screen
              name="Toaster"
              options={{
                sheetAllowedDetents: "fitToContents",
                presentation: "formSheet",
              }}
            />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
