import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";

const RefferalsSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor px-4 pt-4`}
    >
      {/* ---------- Back Title ---------- */}
      <Skeleton height={24} width={120} colorMode="dark" />

      {/* ---------- Percentage Cards ---------- */}
      <View style={tw`flex-row gap-2 mt-4`}>
        <View style={tw`flex-1 p-4 rounded-2xl bg-[#C2FFD41A] gap-2`}>
          <Skeleton height={24} width={60} colorMode="dark" />
          <Skeleton height={14} width={120} colorMode="dark" />
        </View>

        <View style={tw`flex-1 p-4 rounded-2xl bg-[#FBBEFE1A] gap-2`}>
          <Skeleton height={24} width={60} colorMode="dark" />
          <Skeleton height={14} width={120} colorMode="dark" />
        </View>
      </View>

      {/* ---------- Description ---------- */}
      <View style={tw`mt-4 gap-2`}>
        <Skeleton height={16} width="90%" colorMode="dark" />
        <Skeleton height={16} width="75%" colorMode="dark" />
      </View>

      {/* ---------- Referral Code Box ---------- */}
      <View style={tw`border border-borderColor p-4 rounded-2xl mt-6`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Skeleton height={16} width={120} colorMode="dark" />
          <Skeleton height={28} width={44} radius={8} colorMode="dark" />
        </View>
      </View>

      {/* ---------- Total Earnings ---------- */}
      <View
        style={tw`flex-row justify-around mt-6 p-4 bg-transparentBG rounded-2xl`}
      >
        <View style={tw`items-center gap-2`}>
          <Skeleton height={20} width={40} colorMode="dark" />
          <Skeleton height={14} width={70} colorMode="dark" />
        </View>

        <View style={tw`items-center gap-2`}>
          <Skeleton height={20} width={80} colorMode="dark" />
          <Skeleton height={14} width={60} colorMode="dark" />
        </View>
      </View>

      {/* ---------- Tabs ---------- */}
      <View style={tw`flex-row gap-2 mt-6`}>
        <Skeleton height={32} width="48%" colorMode="dark" />
        <Skeleton height={32} width="48%" colorMode="dark" />
      </View>

      {/* ---------- Referral List ---------- */}
      <View style={tw`gap-4 py-4`}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <View
            key={index}
            style={tw`flex-row justify-between items-center px-4 py-3`}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Skeleton
                height={32}
                width={32}
                radius="round"
                colorMode="dark"
              />
              <Skeleton height={16} width={120} colorMode="dark" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RefferalsSkeleton;
