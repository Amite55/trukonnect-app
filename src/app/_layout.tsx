import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <Provider store={store}>
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
                  animation: "fade",
                  animationDuration: 200,
                }}
              />
            </Stack>
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
