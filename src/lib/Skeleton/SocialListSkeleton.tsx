import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

interface Props {
  count?: number;
}

const SocialListSkeleton = ({ count = 6 }: Props) => {
  return (
    <View style={tw`gap-2`}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={tw`flex-row justify-between items-center bg-transparentBG rounded-xl py-4 px-2`}
        >
          {/* ---------- Left (icon + text) ---------- */}
          <View style={tw`flex-row items-center gap-2`}>
            {/* icon */}
            <Skeleton height={24} width={24} radius="round" colorMode="dark" />

            {/* text */}
            <Skeleton height={14} width={120} colorMode="dark" />
          </View>

          {/* ---------- Right (checkbox) ---------- */}
          <Skeleton height={20} width={20} radius="round" colorMode="dark" />
        </View>
      ))}
    </View>
  );
};

export default SocialListSkeleton;
