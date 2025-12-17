import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";

const BrandHomeDashboardSKeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor px-4 pt-3`}
    >
      {/* ================= Header Profile ================= */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <View style={tw`flex-row items-center gap-2`}>
          <Skeleton height={40} width={40} radius="round" colorMode="dark" />
          <Skeleton height={18} width={120} colorMode="dark" />
        </View>
        <Skeleton height={24} width={24} radius="round" colorMode="dark" />
      </View>

      {/* ================= Counter Cards ================= */}
      <View style={tw`gap-3`}>
        <View style={tw`flex-row gap-2`}>
          {[1, 2].map((_, i) => (
            <View
              key={i}
              style={tw`flex-1 p-4 rounded-2xl bg-transparentBG gap-3`}
            >
              <Skeleton
                height={28}
                width={28}
                radius="round"
                colorMode="dark"
              />
              <Skeleton height={14} width="70%" colorMode="dark" />
              <Skeleton height={20} width={40} colorMode="dark" />
            </View>
          ))}
        </View>

        <View style={tw`flex-row gap-2`}>
          {[1, 2].map((_, i) => (
            <View
              key={i}
              style={tw`flex-1 p-4 rounded-2xl bg-transparentBG gap-3`}
            >
              <Skeleton
                height={28}
                width={28}
                radius="round"
                colorMode="dark"
              />
              <Skeleton height={14} width="70%" colorMode="dark" />
            </View>
          ))}
        </View>
      </View>

      {/* ================= Buy Task Button ================= */}
      <View style={tw`my-6`}>
        <Skeleton height={56} radius={16} colorMode="dark" />
      </View>

      {/* ================= Recent Tasks Title ================= */}
      <Skeleton height={22} width={160} colorMode="dark" />

      {/* ================= Recent Tasks List ================= */}
      <View style={tw`gap-2 mt-3`}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <View
            key={index}
            style={tw`flex-row items-center justify-between p-4 bg-transparentBG rounded-2xl`}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Skeleton
                height={24}
                width={24}
                radius="round"
                colorMode="dark"
              />
              <Skeleton height={16} width={140} colorMode="dark" />
            </View>

            <Skeleton height={14} width={50} colorMode="dark" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BrandHomeDashboardSKeleton;
