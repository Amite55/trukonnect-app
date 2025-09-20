import {
  IconFacebookRound,
  IconInstagram,
  IconPoint,
  IconReject,
} from "@/assets/icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackTitleButton from "../lib/BackTitleButton";
import tw from "../lib/tailwind";

const Notification = () => {
  const notificationData = [
    {
      id: 1,
      icon: IconPoint,
      title: "You have earned 2 coins.",
      time: "25/12/2025",
    },
    {
      id: 2,
      icon: IconFacebookRound,
      title: "Facebook account rejected.",
      time: "25/12/2025",
    },
    {
      id: 3,
      icon: IconInstagram,
      title: "Instagram account verified successfully.",
      time: "25/12/2025",
    },
    {
      id: 4,
      icon: IconReject,
      title: "Your performance rejected by reviewer.",
      time: "25/12/2025",
    },
    {
      id: 5,
      icon: IconReject,
      title: "Your performance rejected by reviewer.",
      time: "25/12/2025",
    },
    {
      id: 6,
      icon: IconPoint,
      title: "You have earned 2 coins.",
      time: "25/12/2025",
    },
  ];

  return (
    <FlatList
      data={notificationData}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor flex-1 px-4 gap-3 py-4`}
      style={tw`flex-1`}
      ListHeaderComponent={() => {
        return (
          <View>
            <BackTitleButton title="Back" onPress={() => router.back()} />
            <TouchableOpacity style={tw`justify-end items-end`}>
              <Text
                style={tw`underline text-red-500 font-HalyardDisplayMedium text-xl items-end`}
              >
                Read all
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              item?.title === "Instagram account verified successfully."
                ? router.push("/boutProfiles/socialLinks")
                : router.push("/taskPerformerSection/task/taskHistory");
            }}
            style={tw`flex-row items-center justify-between p-4 h-20 bg-inputBgColor rounded-2xl`}
          >
            <View style={tw`flex-row items-center gap-4`}>
              <SvgXml style={tw`w-7 h-7`} xml={item.icon} />
              <Text style={tw`font-HalyardDisplayRegular text-base text-white`}>
                {item.title}
              </Text>
            </View>
            <Text style={tw`font-HalyardDisplayRegular text-xs text-subtitle`}>
              {item.time}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Notification;
