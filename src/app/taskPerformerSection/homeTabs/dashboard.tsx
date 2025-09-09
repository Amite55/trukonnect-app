import {
  IconAvailable,
  IconCurrency,
  IconPoint,
  IconWithdrawBlanc,
} from "@/assets/icons";
import { ImgTrukonnectDashboardICon } from "@/assets/image";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Dashboard = () => {
  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Image style={tw`w-14 h-14 `} source={ImgTrukonnectDashboardICon} />

          <Text style={tw`font-GucinaBold text-2xl text-white500 `}>
            Daniel’s Dashboard
          </Text>
        </View>

        <View style={tw`gap-4 my-4`}>
          <View
            style={tw`flex-row items-center justify-between p-4 bg-[#C2FFD41A] rounded-2xl `}
          >
            <View style={tw`gap-2`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
              >
                Total earned tokens
              </Text>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}
              >
                265
              </Text>
            </View>

            <View style={tw`bg-secondaryBtn p-4 rounded-full`}>
              <SvgXml width={26} height={26} xml={IconPoint} />
            </View>
          </View>

          <View
            style={tw`flex-row items-center justify-between p-4 bg-[#FBBEFE1A] rounded-2xl `}
          >
            <View style={tw`gap-2`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
              >
                Total withdrawals
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconCurrency} />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}
                >
                  6531.00
                </Text>
              </View>
            </View>

            <View style={tw`bg-secondaryBtn p-4 rounded-full`}>
              <SvgXml width={26} height={26} xml={IconWithdrawBlanc} />
            </View>
          </View>

          <View
            style={tw`flex-row items-center justify-between p-4 bg-[#B5C2FF1A] rounded-2xl `}
          >
            <View style={tw`gap-2`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
              >
                Available Balance
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconCurrency} />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}
                >
                  900.00
                </Text>
              </View>
            </View>

            <View style={tw`bg-secondaryBtn p-4 rounded-full`}>
              <SvgXml width={26} height={26} xml={IconAvailable} />
            </View>
          </View>
        </View>

        {/* ========================= withdraw history ========================= */}
        <View style={tw`flex-row justify-between items-center mt-4 `}>
          <Text style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}>
            Withdrawal History
          </Text>
          <TouchableOpacity
            onPress={() =>
              router.push("/taskPerformerSection/allWithdrawalHistory")
            }
          >
            <Text
              style={tw`font-HalyardTextMedium text-base text-primaryBtn underline`}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>

        {/* ========================= withdraw card item ========================= */}

        <View style={tw`gap-4 py-6s`}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <View
              key={index}
              style={tw`flex-row items-center justify-between border border-borderColor p-4 rounded-2xlS`}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconCurrency} />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  12450.50
                </Text>
              </View>
              <Text
                style={tw`font-HalyardDisplayRegular text-xs text-subtitle`}
              >
                14 Aug, 2025
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default Dashboard;
