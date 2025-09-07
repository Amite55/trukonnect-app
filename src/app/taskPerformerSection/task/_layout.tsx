import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="allTask" />
      <Stack.Screen name="taskDetails" />
    </Stack>
  );
};

export default _layout;
