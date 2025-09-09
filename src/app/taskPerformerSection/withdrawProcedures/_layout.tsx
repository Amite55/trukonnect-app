import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="withdrawProcedure" />
      <Stack.Screen name="purchaseTask" />
      <Stack.Screen name="youtubeVideo" />
    </Stack>
  );
};

export default _layout;
