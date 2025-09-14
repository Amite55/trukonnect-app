import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="creatorHomTabs" />
      <Stack.Screen name="completeOrderTask" />
      <Stack.Screen name="ongoingOrderTask" />
      <Stack.Screen name="myTaskDetails" />
      <Stack.Screen name="editTask" />
    </Stack>
  );
};

export default _layout;
