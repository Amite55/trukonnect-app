import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";

interface IProps {
  dummyArray?: number;
}

const TaskCardSkeletonList = ({ dummyArray = 5 }: IProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-8`}
    >
      {Array.from({ length: dummyArray }).map((_, i) => (
        <View key={i} style={tw`gap-3 bg-transparentBG p-4 rounded-xl mb-4`}>
          {/* ---------- Profile Row ---------- */}
          <View style={tw`flex-row items-center gap-3`}>
            {/* Avatar */}
            <Skeleton
              height={48}
              width={48}
              radius={"round"}
              colorMode="dark"
            />

            <View style={tw`gap-2`}>
              {/* Name */}
              <Skeleton height={16} width={140} colorMode="dark" />

              {/* Date */}
              <Skeleton height={12} width={90} colorMode="dark" />
            </View>
          </View>

          {/* ---------- Title ---------- */}
          <Skeleton height={16} width={"70%"} colorMode="dark" />

          {/* ---------- Description ---------- */}
          <Skeleton height={14} width={"95%"} colorMode="dark" />
          <Skeleton height={14} width={"85%"} colorMode="dark" />

          {/* ---------- Bottom Row ---------- */}
          <View style={tw`flex-row items-center justify-between pt-3`}>
            {/* Left side tokens + social */}
            <View style={tw`flex-row items-center gap-3`}>
              {/* Tokens circle */}
              <Skeleton height={16} width={60} colorMode="dark" />

              {/* Social icon */}
              <Skeleton
                height={24}
                width={24}
                radius={"round"}
                colorMode="dark"
              />
            </View>

            {/* Open task button */}
            <Skeleton height={40} width={100} radius={20} colorMode="dark" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default TaskCardSkeletonList;
