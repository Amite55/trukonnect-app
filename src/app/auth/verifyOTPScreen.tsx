import TitleSubTitle from "@/src/Components/TitleSubTitle";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import {
  usePhoneVerifyOTPMutation,
  useResendPhoneOTPMutation,
} from "@/src/redux/api/authSlices";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const VerifyOTPScreen = () => {
  const { phone } = useLocalSearchParams();

  // ============== api end point ==============
  const [otpVerify, { isLoading: isOtpLoading }] = usePhoneVerifyOTPMutation();
  const [resend, { isLoading: isResendLoading }] = useResendPhoneOTPMutation();

  // -------------------------- handle otp --------------------------</
  const handleOtpFilled = async (otp: string) => {
    try {
      const res = await otpVerify({
        phone: phone,
        otp: otp,
      }).unwrap();
      console.log(res, "this is response---------> with otp");
      if (res.status) {
        await AsyncStorage.setItem("token", res?.data?.token);
        if (res.data.user.role === "brand") {
          router.replace("/taskCreator/creatorHomTabs/dashboard");
        } else if (res.data.user.role === "performer") {
          router.replace("/taskPerformerSection/homeTabs/home");
        }
      }
    } catch (error: any) {
      console.log(error, "OTP not verified ");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Something went wrong" },
      });
    }
  };

  // ======================= handle resend =======================
  const handleResendOtp = async () => {
    try {
      const res = await resend({ phone: phone }).unwrap();
      console.log(res, "thi is res>>>>>>>>>>>");
      if (res.status) {
        router.push({
          pathname: `/Toaster`,
          params: { res: "OTP sent successfully!" },
        });
      }
    } catch (error: any) {
      console.log(error, "Resend OTP not success ->>");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Not send again!" },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android keyboard behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                    handleOtpFilled(text);
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
                <Text
                  style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}
                >
                  Didn’t receive a code?
                </Text>
                <TouchableOpacity
                  disabled={isResendLoading}
                  onPress={() => handleResendOtp()}
                  style={tw``}
                >
                  <Text
                    style={tw`text-primaryBtn font-HalyardDisplaySemiBold text-[12px]`}
                  >
                    {isResendLoading ? "Sending..." : "Send Again"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ViewProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTPScreen;
