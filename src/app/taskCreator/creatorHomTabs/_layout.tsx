import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="buyTasks" />
      <Stack.Screen name="myTask" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

export default _layout;
