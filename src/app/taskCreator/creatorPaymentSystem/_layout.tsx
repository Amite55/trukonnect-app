import { Stack } from "expo-router";
import React from "react";

const CreatorPaymentSystemLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="creatorCheckout" />
      <Stack.Screen name="paymentSuccessScreen" />
    </Stack>
  );
};

export default CreatorPaymentSystemLayout;
