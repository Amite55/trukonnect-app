import { IconCreator, IconTaskPerformer } from "@/assets/icons";
import { ImgLogo } from "@/assets/image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import RoleCard from "../Components/RoleCard";
import ViewProvider from "../Components/ViewProvider";
import tw from "../lib/tailwind";

const RoleScreen = () => {
  return (
    <ViewProvider
      containerStyle={tw`flex-1 flex-grow items-center justify-between bg-bgBaseColor px-4 pt-12`}
    >
      <Image source={ImgLogo} />
      <View style={tw`gap-4`}>
        <Text
          style={tw`text-white500 font-HalyardDisplayMedium text-center text-3xl`}
        >
          Select your role
        </Text>

        <RoleCard
          onPress={() => {
            AsyncStorage.setItem("role", "taskPerformer");
            router.push({
              pathname: "/auth/login",
              params: { role: "taskPerformer" },
            });
          }}
          icon={IconTaskPerformer}
          title="Task Performer"
          description="Earn tokens by completing simple social tasks like likes, comments & follows."
        />
        <RoleCard
          onPress={() => {
            AsyncStorage.setItem("role", "creator");
            router.push({
              pathname: "/auth/login",
              params: { role: "creator" },
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
