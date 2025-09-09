import { IconCurrency } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AllWithdrawalHistory = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`gap-3 py-4`}
      style={tw`bg-bgBaseColor flex-1 px-4`}
      ListHeaderComponent={() => {
        return <BackTitleButton title="Withdrawal History" />;
      }}
      renderItem={({ item }) => {
        return (
          <View
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
            <Text style={tw`font-HalyardDisplayRegular text-xs text-subtitle`}>
              14 Aug, 2025
            </Text>
          </View>
        );
      }}
    />
  );
};

export default AllWithdrawalHistory;
