import { ImgBgImage } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import tw from "@/src/lib/tailwind";
import { ImageBackground } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const Task = () => {
  return (
    <View style={tw`flex-1`}>
      <ImageBackground source={ImgBgImage} style={tw`flex-1 px-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-white500 font-HalyardDisplaySemiBold text-2xl`}>
            Task
          </Text>
          <PrimaryButton
            buttonContainerStyle={tw`w-24 h-12`}
            buttonText="History"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Task;
