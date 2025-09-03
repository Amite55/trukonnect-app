import React from "react";
import { View } from "react-native";
import tw from "../lib/tailwind";

const ViewProvider = ({ children, containerStyle = {} }) => {
  return <View style={[tw`bg-bgBaseColor`, containerStyle]}>{children}</View>;
};

export default ViewProvider;
