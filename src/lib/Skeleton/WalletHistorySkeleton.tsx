import tw from "@/src/lib/tailwind";
import { MotiView } from "moti";
import { View } from "react-native";

interface IProps {
  dummyArray?: number;
}

const WalletHistorySkeleton = ({ dummyArray = 5 }: IProps) => {
  return (
    <View style={tw`mt-4`}>
      {Array.from({ length: dummyArray }).map((_, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 800,
            loop: true,
          }}
          style={tw`flex-row items-center justify-between border border-borderColor p-4 rounded-2xl mb-3`}
        >
          {/* Left Side */}
          <View style={tw`flex-row items-center gap-2`}>
            {/* Currency Icon Skeleton */}
            <View style={tw`w-6 h-6 rounded-full bg-[#2A2A2A]`} />

            {/* Amount Skeleton */}
            <View style={tw`w-20 h-4 rounded-lg bg-[#2A2A2A]`} />
          </View>

          {/* Date Skeleton */}
          <View style={tw`w-16 h-3 rounded-lg bg-[#2A2A2A]`} />
        </MotiView>
      ))}
    </View>
  );
};

export default WalletHistorySkeleton;
