import { IconAvailable, IconPoint, IconWithdrawBlanc } from "@/assets/icons";
import { ImgTrukonnectDashboardICon } from "@/assets/image";
import ViewProvider from "@/src/Components/ViewProvider";
import WithdrawalHistoryCard from "@/src/Components/WithdrawalHistoryCard";
import { helpers } from "@/src/lib/helper";
import WalletHistorySkeleton from "@/src/lib/Skeleton/WalletHistorySkeleton";
import tw from "@/src/lib/tailwind";
import { useGetDashboardHistoryQuery } from "@/src/redux/api/withdrawalSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Dashboard = () => {
  // ===================== api end point =================
  const { data: getDashboardData, isLoading: isDashboardLoading } =
    useGetDashboardHistoryQuery({ page: 1, per_page: 10 });

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Image style={tw`w-14 h-14 `} source={ImgTrukonnectDashboardICon} />

          <Text style={tw`font-GucinaBold text-2xl text-white500 `}>
            {helpers.fastName(getDashboardData?.data?.name)}’s Dashboard
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
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
              >
                {getDashboardData?.data?.total_earn_token}
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
                {/* <SvgXml xml={IconCurrency} /> */}
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                >
                  {getDashboardData?.data?.currency_code}{" "}
                  {getDashboardData?.data?.total_withdraw}
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
                {/* <SvgXml xml={IconCurrency} /> */}
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                >
                  {getDashboardData?.data?.currency_code}{" "}
                  {getDashboardData?.data?.available_balance}
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
          {isDashboardLoading ? (
            <WalletHistorySkeleton dummyArray={6} />
          ) : getDashboardData?.data?.withdrawal_history?.data?.length > 0 ? (
            getDashboardData?.data?.withdrawal_history?.data.map(
              (item: any) => (
                <WithdrawalHistoryCard
                  key={item?.id}
                  amount={item?.amount}
                  date={item?.created_at}
                  currency_code={item?.user?.country?.currency_code}
                />
              )
            )
          ) : (
            <View style={tw`flex-row items-center justify-center py-4`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
              >
                No withdrawal history found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default Dashboard;
