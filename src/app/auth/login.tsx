import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import React from "react";
import { Text } from "react-native";

const LoginScreen = () => {
  return (
    <ViewProvider containerStyle={tw`flex-1`}>
      <Text style={tw`text-white500 `}>LoginScreen</Text>
    </ViewProvider>
  );
};

export default LoginScreen;
