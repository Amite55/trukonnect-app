import React from "react";
import { View } from "react-native";
import tw from "../lib/tailwind";

interface Props {
  children: React.ReactNode;
  containerStyle?: any;
}

const ViewProvider = ({ children, containerStyle = {} }: Props) => {
  return <View style={[tw`bg-bgBaseColor`, containerStyle]}>{children}</View>;
};

export default ViewProvider;
