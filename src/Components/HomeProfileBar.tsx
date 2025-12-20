import { IconHi, IconNotification } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { helpers } from "../lib/helper";
import tw from "../lib/tailwind";

interface IProps {
  onPress: () => void;
  name?: any;
  image?: string;
  notificationPress?: () => void;
}

const HomeProfileBar = ({
  onPress,
  name,
  image,
  notificationPress,
}: IProps) => {
  return (
    <View style={tw`flex-row justify-between items-center mt-6 mb-4`}>
      <View>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`font-GucinaBold text-xl text-white500 `}>
            Hi! {name?.length > 8 ? name?.slice(0, 8) + "..." : name}
          </Text>
          <SvgXml xml={IconHi} />
        </View>
        <Text style={tw`font-GucinaBold text-xs text-subtitle capitalize`}>
          Welcome to the Trukonnect club
        </Text>
      </View>

      <View
        style={tw`flex-row bg-transparentBG  h-14 gap-3 w-28 rounded-full justify-center items-center`}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={notificationPress}>
          <SvgXml xml={IconNotification} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Image
            contentFit="cover"
            style={tw`w-10 h-10 rounded-full`}
            source={helpers.getImgFullUrl(image || "")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeProfileBar;
