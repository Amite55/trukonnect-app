import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";

const TaskDetailsSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-4 bg-base_color`}
      contentContainerStyle={tw`pb-10`}
    >
      {/* Back button */}
      <View style={tw`mt-4 mb-4`}>
        <Skeleton height={20} width={80} colorMode="dark" />
      </View>

      {/* -------- Task Card Skeleton -------- */}
      <View style={tw`gap-3 bg-transparentBG p-4 rounded-xl`}>
        {/* Header */}
        <View style={tw`flex-row items-center gap-3`}>
          <Skeleton height={48} width={48} radius={"round"} colorMode="dark" />

          <View style={tw`gap-2`}>
            <Skeleton height={16} width={150} colorMode="dark" />
            <Skeleton height={12} width={90} colorMode="dark" />
          </View>
        </View>

        {/* Title */}
        <Skeleton height={16} width={"70%"} colorMode="dark" />

        {/* Description (3 lines) */}
        <Skeleton height={14} width={"95%"} colorMode="dark" />
        <Skeleton height={14} width={"90%"} colorMode="dark" />
        <Skeleton height={14} width={"85%"} colorMode="dark" />

        {/* Tokens row */}
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <Skeleton height={14} width={100} colorMode="dark" />
          <Skeleton height={18} width={60} colorMode="dark" />
        </View>

        {/* Task from */}
        <View style={tw`flex-row justify-between items-center`}>
          <Skeleton height={14} width={100} colorMode="dark" />
          <Skeleton height={18} width={80} colorMode="dark" />
        </View>

        {/* Perform button */}
        <Skeleton height={44} width={"100%"} radius={12} colorMode="dark" />
      </View>

      {/* -------- Upload Proof Section -------- */}
      <View style={tw`mt-6`}>
        <Skeleton height={16} width={180} colorMode="dark" />
      </View>

      <View style={tw`flex-row items-center gap-4 mt-4`}>
        <Skeleton height={112} width={80} radius={12} colorMode="dark" />
        <Skeleton height={112} width={80} radius={12} colorMode="dark" />
      </View>

      {/* -------- Notice Section -------- */}
      <View style={tw`flex-row gap-3 mt-6`}>
        <Skeleton height={20} width={20} radius={"round"} colorMode="dark" />
        <View style={tw`flex-1 gap-2`}>
          <Skeleton height={14} width={"90%"} colorMode="dark" />
          <Skeleton height={14} width={"85%"} colorMode="dark" />
          <Skeleton height={14} width={"70%"} colorMode="dark" />
        </View>
      </View>

      {/* Submit button */}
      <View style={tw`mt-6`}>
        <Skeleton height={48} width={"100%"} radius={12} colorMode="dark" />
      </View>
    </ScrollView>
  );
};

export default TaskDetailsSkeleton;
