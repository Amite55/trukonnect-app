import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  icon?: any;
  title?: string;
  description?: string;
  onPress?: () => void;
}

const RoleCard = ({ icon, title, description, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`justify-center items-center rounded-xl border border-borderColor p-4 gap-2`}
    >
      <SvgXml xml={icon} />
      <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
        {title}
      </Text>
      <Text
        style={tw`font-HalyardTextRegular text-base text-subtitle text-center mt-2`}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
};

export default RoleCard;
