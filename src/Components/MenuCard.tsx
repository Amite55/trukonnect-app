import { IconRightArrowMenu } from "@/assets/icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  onPress: () => void;
  title: string;
  icon: any;
}

const MenuCard = ({ title, icon, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center justify-between p-4 bg-inputBgColor rounded-2xl `}
    >
      <View style={tw`flex-row items-center gap-2`}>
        <SvgXml xml={icon} />
        <Text style={tw`font-HalyardDisplaySemiBold text-base text-subtitle`}>
          {title}
        </Text>
      </View>

      <SvgXml xml={IconRightArrowMenu} />
    </TouchableOpacity>
  );
};

export default MenuCard;
