import InfoRow from "@/src/Components/InfoRow";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useBrandPaymentMutation } from "@/src/redux/api/paymentSlices";
import { useGetMyProfileQuery } from "@/src/redux/api/profileSlices";
import { router, useLocalSearchParams } from "expo-router";

import { View } from "moti";
import React from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CreatorCheckout = () => {
  const { taskDetails } = useLocalSearchParams();
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [networkCode, setNetworkCode] = React.useState("");
  const [customerNumber, setCustomerNumber] = React.useState("");
  const parseTaskData = JSON.parse(taskDetails as any);

  //   ============== api end point =================
  const { data: profileData, isLoading: isProfileLoading } =
    useGetMyProfileQuery({});
  const [bandPayment, { isLoading: isBandPaymentLoading }] =
    useBrandPaymentMutation();

  //   ================ handle payment =================
  const handlePayment = async () => {
    try {
      const data = {
        task_id: parseTaskData?.task?.id,
        customer_number: customerNumber,
        network_code: networkCode,
      };
      const res = await bandPayment(data).unwrap();
      if (res) {
        router.push({
          pathname: "/taskCreator/creatorPaymentSystem/paymentSuccessScreen",
          params: { successDataJson: JSON.stringify(res) },
        });
      }
    } catch (error: any) {
      console.log(error, "Your payment not success !");
      router.push({
        pathname: "/Toaster",
        params: {
          res: error?.message || "Your payment not success !",
        },
      });
    }
  };

  React.useEffect(() => {
    if (profileData) {
      setCustomerNumber(profileData?.data?.user?.phone);
    }
  }, [profileData]);

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  React.useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  //   ================= loading state    =================
  if (isProfileLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-bgBaseColor`}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android keyboard behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={tw`flex-1 bg-bgBaseColor px-5`}
          contentContainerStyle={tw`flex-grow justify-between`}
        >
          <View>
            <BackTitleButton title="Checkout" onPress={() => router.back()} />

            {/* ===== Info Card ===== */}
            <View style={tw`bg-white rounded-xl p-4 mt-6`}>
              <InfoRow
                label="Social"
                value={`${parseTaskData?.social?.name}`}
              />
              <InfoRow
                label="Engagement"
                value={`${parseTaskData?.engagement?.engagement_name}`}
              />
              <InfoRow
                label="Total"
                value={`${parseTaskData?.task?.total_price}`}
              />
            </View>

            <View style={tw` gap-3 pt-10`}>
              <TextInput
                onChangeText={(v) => {
                  setCustomerNumber(v);
                }}
                value={customerNumber}
                // defaultValue={"1212121"}
                placeholder="Enter your phone number"
                placeholderTextColor="#A4A4A4"
                keyboardType="phone-pad"
                style={tw`flex-1 text-white500 text-base border border-borderColor rounded-xl py-3 px-4 `}
              />

              <View style={tw`bg-inputBgColor h-14 rounded-lg  mt-3`}>
                <Dropdown
                  // disable={selectedId ? false : true}
                  style={tw.style(`h-14 rounded-lg px-4 bg-inputBgColor `)}
                  placeholderStyle={tw`text-sm text-subtitle`}
                  selectedTextStyle={tw`text-base text-white500`}
                  containerStyle={tw`bg-black rounded-lg`}
                  itemTextStyle={tw`text-white`}
                  activeColor="rgba(255,255,255,0.1)"
                  placeholder="Select the engagement type"
                  data={dropdownValue}
                  dropdownPosition="bottom"
                  maxHeight={300}
                  labelField="networkCode"
                  valueField="id"
                  value={networkCode}
                  onChange={(item) => {
                    setNetworkCode(item?.networkCode);
                  }}
                  renderItem={(item) => {
                    return (
                      <View style={tw`p-2 `}>
                        <Text style={tw`text-white text-base `}>
                          {item?.networkCode}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>

          <View>
            <PrimaryButton
              loading={isBandPaymentLoading}
              onPress={handlePayment}
              buttonText="Checkout"
              buttonContainerStyle={tw`mt-6 mb-4`}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreatorCheckout;

const dropdownValue = [
  {
    id: 1,
    networkCode: "MTN",
  },
  //   {
  //     id: 2,
  //     networkCode: "Engagement 2",
  //   },
  //   {
  //     id: 3,
  //     networkCode: "Engagement 3",
  //   },
];
