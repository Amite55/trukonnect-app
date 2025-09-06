import TitleSubTitle from "@/src/Components/TitleSubTitle";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

const VerifyOTPScreen = () => {
  return (
    <ViewProvider containerStyle={{ flex: 1 }}>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <TitleSubTitle
          title="Verify OTP"
          subTitle="We Have sent a 6-Digit code to your contact number"
        />

        <View style={tw`w-full`}>
          <Text style={tw`mb-1`}>Password</Text>
          <View style={tw`flex-row gap-5`}>
            <OtpInput
              numberOfDigits={6}
              focusColor={PrimaryColor}
              autoFocus={false}
              hideStick={true}
              placeholder="0"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onFilled={async (text) => {
                //   handleOtpFilled(text);
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`rounded-md mb-2`,
                pinCodeContainerStyle: tw`h-12 w-[46px] justify-center items-center bg-inputBgColor rounded-lg `,
                pinCodeTextStyle: tw`text-white text-2xl font-HalyardDisplaySemiBold `,
                placeholderTextStyle: tw`text-[#6D6D6D] text-2xl font-HalyardDisplaySemiBold `,
              }}
            />
          </View>

          <View style={tw`flex-row justify-between items-center mt-5`}>
            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              Didn’t receive a code?{" "}
            </Text>
            <TouchableOpacity
              //    onPress={() => handleResendOtp()}
              style={tw``}
            >
              <Text
                style={tw`text-primaryBtn font-HalyardDisplaySemiBold text-[12px]`}
              >
                Send Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ViewProvider>
  );
};

export default VerifyOTPScreen;
