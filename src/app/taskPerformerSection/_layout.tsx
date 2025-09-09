import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="homeTabs" />
      <Stack.Screen name="task" />
      <Stack.Screen name="withdrawProcedures" />
    </Stack>
  );
};

export default _layout;
