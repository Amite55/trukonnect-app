import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  onPress?: () => void;
  icon: any;
  title: string;
  counter?: number;
  disabled?: boolean;
}

const CreatorCounterCard = ({
  onPress,
  icon,
  title,
  counter,
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      delayPressIn={0}
      delayPressOut={0}
      disabled={disabled}
      onPress={disabled ? () => {} : onPress}
      style={tw`flex-1 h-36  items-center border border-borderColor bg-transparentBG px-4 py-6 rounded-3xl  gap-2`}
    >
      <SvgXml xml={icon || ""} />
      <Text
        numberOfLines={1}
        style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}
      >
        {title}
      </Text>
      <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
        {counter || 0}
      </Text>
    </TouchableOpacity>
  );
};

export default CreatorCounterCard;
