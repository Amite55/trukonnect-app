import { IconCreator, IconTaskPerformer } from "@/assets/icons";
import { ImgLogo } from "@/assets/image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import RoleCard from "../Components/RoleCard";
import ViewProvider from "../Components/ViewProvider";
import tw from "../lib/tailwind";

const RoleScreen = () => {
  return (
    <ViewProvider
      containerStyle={tw`flex-1 flex-grow items-center justify-between bg-bgBaseColor px-4 pt-12`}
    >
      <Image contentFit="contain" style={tw`w-40 h-32`} source={ImgLogo} />
      <View style={tw`gap-4`}>
        <Text
          style={tw`text-white500 font-HalyardDisplayMedium text-center text-3xl`}
        >
          Select your role
        </Text>

        <RoleCard
          onPress={() => {
            AsyncStorage.setItem("role", "performer");
            router.push({
              pathname: "/auth/login",
            });
          }}
          icon={IconTaskPerformer}
          title="Task Performer"
          description="Earn tokens by completing simple social tasks like likes, comments & follows."
        />
        <RoleCard
          onPress={() => {
            AsyncStorage.setItem("role", "brand");
            router.push({
              pathname: "/auth/login",
            });
          }}
          icon={IconCreator}
          title="Creator"
          description="Boost your social media presence by paying users to engage with your posts."
        />
      </View>

      <View />
    </ViewProvider>
  );
};

export default RoleScreen;
