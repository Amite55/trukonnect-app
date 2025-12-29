import InfoRow from "@/src/Components/InfoRow";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const PaymentSuccessScreen = () => {
  const { successDataJson } = useLocalSearchParams();
  const parseSuccessData = JSON.parse(successDataJson as any);

  return (
    <ScrollView
      style={tw`flex-1 bg-bgBaseColor px-5`}
      contentContainerStyle={tw` flex-grow justify-between`}
    >
      <View>
        <BackTitleButton
          title="Back"
          onPress={() =>
            router.replace("/taskCreator/creatorHomTabs/dashboard")
          }
        />

        {/* ===== Info Card ===== */}
        <View style={tw`bg-white rounded-xl p-4 mt-6`}>
          <InfoRow
            label="Transaction ID"
            value={`${parseSuccessData?.response?.trnxId}`}
          />
        </View>
        <Text
          style={tw`font-HalyardDisplayMedium text-center text-lg text-gray-400 my-2`}
        >
          {parseSuccessData?.message}
        </Text>
      </View>

      <View>
        <PrimaryButton
          onPress={() =>
            router.replace("/taskCreator/creatorHomTabs/dashboard")
          }
          buttonText="Go to Dashboard"
          buttonContainerStyle={tw`mt-6 mb-4`}
        />
      </View>
    </ScrollView>
  );
};

export default PaymentSuccessScreen;
