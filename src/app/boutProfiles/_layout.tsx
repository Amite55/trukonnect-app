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
    </Stack>
  );
};

export default _layout;
