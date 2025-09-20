import { IconHi, IconNotification } from "@/assets/icons";
import { ImgThirdSplash } from "@/assets/image";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  onPress: () => void;
}

const HomeProfileBar = ({ onPress }) => {
  return (
    <View style={tw`flex-row justify-between items-center mt-6 mb-4`}>
      <View>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`font-GucinaBold text-xl text-white500 `}>
            Hi! Daniel
          </Text>
          <SvgXml xml={IconHi} />
        </View>
        <Text style={tw`font-GucinaBold text-xs text-subtitle`}>
          WELCOME to the TRUEKONNECT CLUB
        </Text>
      </View>

      <View
        style={tw`flex-row bg-transparentBG  h-12 gap-2 w-24 rounded-3xl justify-center items-center`}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/notification");
          }}
        >
          <SvgXml xml={IconNotification} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Image style={tw`w-10 h-10 rounded-full`} source={ImgThirdSplash} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeProfileBar;
