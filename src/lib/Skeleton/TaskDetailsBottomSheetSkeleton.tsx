import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

const TaskDetailsBottomSheetSkeleton = () => {
  return (
    <View style={tw`rounded-3xl bg-black px-4 py-6 flex-grow justify-between`}>
      {/* ================= Top Content ================= */}
      <View>
        {/* -------- Header (avatar + name) -------- */}
        <View style={tw`flex-row items-center gap-2 pb-4`}>
          <Skeleton height={48} width={48} radius="round" colorMode="dark" />
          <View style={tw`gap-2`}>
            <Skeleton height={18} width={120} colorMode="dark" />
            <Skeleton height={12} width={80} colorMode="dark" />
          </View>
        </View>

        {/* -------- Description -------- */}
        <View style={tw`gap-2 mt-2`}>
          <Skeleton height={14} width="100%" colorMode="dark" />
          <Skeleton height={14} width="95%" colorMode="dark" />
          <Skeleton height={14} width="85%" colorMode="dark" />
          <Skeleton height={14} width="70%" colorMode="dark" />
        </View>

        {/* -------- Total Tokens -------- */}
        <View style={tw`flex-row items-center justify-between mt-4`}>
          <Skeleton height={14} width={90} colorMode="dark" />
          <Skeleton height={16} width={60} colorMode="dark" />
        </View>

        {/* -------- Task From -------- */}
        <View style={tw`flex-row items-center justify-between mt-3`}>
          <Skeleton height={14} width={80} colorMode="dark" />
          <Skeleton height={16} width={90} colorMode="dark" />
        </View>

        {/* -------- Completed Date -------- */}
        <View style={tw`flex-row items-center justify-between mt-3`}>
          <Skeleton height={14} width={110} colorMode="dark" />
          <Skeleton height={16} width={100} colorMode="dark" />
        </View>

        {/* -------- Progress Header -------- */}
        <View style={tw`flex-row items-center justify-between px-2 mt-4`}>
          <Skeleton height={16} width={140} colorMode="dark" />
          <Skeleton height={16} width={60} colorMode="dark" />
        </View>

        {/* -------- Total Cost -------- */}
        <View style={tw`flex-row items-center justify-between pt-3`}>
          <Skeleton height={14} width={90} colorMode="dark" />
          <Skeleton height={16} width={80} colorMode="dark" />
        </View>

        {/* -------- Progress Bar -------- */}
        <View style={tw`px-4 mt-4 mb-6`}>
          <Skeleton height={8} width="100%" radius={4} colorMode="dark" />
        </View>
      </View>

      {/* ================= Bottom Button ================= */}
      <View style={tw`pb-2`}>
        <Skeleton height={48} radius={16} colorMode="dark" />
      </View>
    </View>
  );
};

export default TaskDetailsBottomSheetSkeleton;
