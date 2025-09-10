import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="singUp" />
      <Stack.Screen name="changePassword" />
      <Stack.Screen name="createNewPass" />
      <Stack.Screen name="verifyNumber" />
      <Stack.Screen name="verifyOTPScreen" />
    </Stack>
  );
};

export default AuthLayout;
