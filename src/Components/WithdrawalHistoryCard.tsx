import React from "react";
import { Text, View } from "react-native";
import { helpers } from "../lib/helper";
import tw from "../lib/tailwind";

interface Props {
  amount: number;
  date: string;
  currency_code: string;
}

const WithdrawalHistoryCard = ({ amount, date, currency_code }: Props) => {
  return (
    <View
      style={tw`flex-row items-center justify-between border border-borderColor p-4 rounded-2xlS`}
    >
      <View style={tw`flex-row items-center gap-2`}>
        {/* <SvgXml xml={IconCurrency} /> */}
        <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
          {currency_code} {""}
          {amount}
        </Text>
      </View>
      <Text style={tw`font-HalyardDisplayRegular text-xs text-subtitle`}>
        {helpers.formatDate(date)}
      </Text>
    </View>
  );
};

export default WithdrawalHistoryCard;
