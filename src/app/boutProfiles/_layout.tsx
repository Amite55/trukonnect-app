import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profileMenus" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="socialLinks" />
      <Stack.Screen name="leaderboard" />
      <Stack.Screen name="refferalsScreen" />
      <Stack.Screen name="PrivacyPolicy" />
      <Stack.Screen name="termsAndConditions" />
      <Stack.Screen name="support" />
    </Stack>
  );
};

export default _layout;
