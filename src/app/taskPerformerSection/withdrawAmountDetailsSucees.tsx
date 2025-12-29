import InfoRow from "@/src/Components/InfoRow";
import PrimaryButton from "@/src/Components/PrimaryButton";
import { useProfile } from "@/src/hooks/useProfile";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { usePerformerPaymentMutation } from "@/src/redux/api/paymentSlices";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const WithdrawAmountDetailsSucees = () => {
  const { amount } = useLocalSearchParams();
  const profileData = useProfile();

  // ==================== api end point ====================
  const [withdrawAmount, { isLoading: isWithdrawLoading }] =
    usePerformerPaymentMutation();

  const handleWithdrawal = async () => {
    try {
      const payload = {
        amount: amount,
        network_code: "MTN",
        // customer_number: profileData?.data?.data?.user?.phone,
        customer_number: "0555804252",
      };
      const res = await withdrawAmount(payload).unwrap();
      console.log(res, "this withdrawal response ---------->");
      if (res) {
        router.push({
          pathname: "/Toaster",
          params: {
            res: "Withdrawal success! please wait for admin approval",
          },
        });

        setTimeout(() => {
          router.replace("/taskPerformerSection/homeTabs/home");
        }, 1500);
      }
    } catch (error: any) {
      console.log(error, "Withdrawal not success!");
      router.push({
        pathname: "/Toaster",
        params: {
          res: error?.message || "Withdrawal not success!",
        },
      });
    }
  };

  return (
    <ScrollView
      style={tw`bg-bgBaseColor flex-1 px-5`}
      contentContainerStyle={tw`justify-between flex-1`}
    >
      <View>
        <BackTitleButton
          title="Confirm Withdraw"
          onPress={() => router.back()}
        />

        {/* ===== Info Card ===== */}
        <View style={tw`bg-white rounded-xl p-4 mt-6`}>
          <InfoRow
            label="User Name"
            value={`${profileData?.data?.data?.user?.name}`}
          />
          <InfoRow
            label="Phone Number"
            value={`${profileData?.data?.data?.user?.phone}`}
          />
          <InfoRow
            label="Withdraw Amount"
            value={`${profileData?.data?.data?.user?.country?.currency_code} ${
              amount || "0.00"
            }`}
          />
        </View>
      </View>

      <View>
        <PrimaryButton
          loading={isWithdrawLoading}
          onPress={handleWithdrawal}
          buttonText="Withdraw"
          buttonContainerStyle={tw`mt-6 mb-4`}
        />
      </View>
    </ScrollView>
  );
};

export default WithdrawAmountDetailsSucees;
