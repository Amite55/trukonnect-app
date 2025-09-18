import { IconRightArrowMenu } from "@/assets/icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  onPress: () => void;
  title: string;
  icon: any;
  titleStyle?: any;
  containerStyle?: any;
}

const MenuCard = ({
  title,
  icon,
  onPress,
  titleStyle = "",
  containerStyle = "",
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      delayPressIn={0}
      delayPressOut={0}
      onPress={onPress}
      style={[
        tw`flex-row items-center justify-between p-4 bg-inputBgColor rounded-2xl `,
        containerStyle,
      ]}
    >
      <View style={tw`flex-row items-center gap-2`}>
        <SvgXml xml={icon} />
        <Text
          style={[
            tw` font-HalyardDisplaySemiBold text-base text-subtitle`,
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </View>

      <SvgXml xml={IconRightArrowMenu} />
    </TouchableOpacity>
  );
};

export default MenuCard;
