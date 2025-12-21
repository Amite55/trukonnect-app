import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const YoutubePlayerSkeleton = () => {
  return (
    <View style={tw`w-full rounded-xl overflow-hidden`}>
      {/* Video frame */}
      <Skeleton
        height={200}
        width={width - 32} // px-4 / px-5 থাকলে adjust করো
        colorMode="dark"
      />

      {/* Play button overlay (optional visual polish) */}
      <View style={tw`absolute inset-0 justify-center items-center`}>
        <Skeleton height={56} width={56} radius="round" colorMode="dark" />
      </View>
    </View>
  );
};

export default YoutubePlayerSkeleton;
