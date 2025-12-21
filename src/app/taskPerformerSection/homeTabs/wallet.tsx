import { IconCurrency, IconPoint, IconWarring } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { useProfile } from "@/src/hooks/useProfile";
import tw from "@/src/lib/tailwind";
import { useGetWalletInfoQuery } from "@/src/redux/api/withdrawalSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Wallet = () => {
  const [currencyValue, setCurrencyValue] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const profileData = useProfile();
  console.log(
    profileData?.data?.data?.user?.withdrawal_status,
    "this is profile data ------------>"
  );

  // ==================== api end point ====================
  const { data: walletData } = useGetWalletInfoQuery({});

  const handleCurrencyModalOpen = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCurrencyModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android keyboard behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      // onMoveShouldSetResponder={}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-6`}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={tw`flex-1 `}
            contentContainerStyle={[tw``, isKeyboardVisible && tw`pb-20`]}
          >
            <Text style={tw`font-GucinaBold text-2xl text-white500`}>
              My Wallet
            </Text>

            {/* ==================== Available Tokens ==================== */}

            <View style={tw`bg-transparentBG p-5 rounded-2xl gap-4 my-4`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-subtitle`}
                >
                  Available Tokens
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconPoint} />
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                  >
                    {Number(walletData?.data?.[0]?.earn_token).toFixed(1)}
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row items-center justify-between`}>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-subtitle`}
                >
                  Per Token
                </Text>

                <Text
                  style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                >
                  {walletData?.data?.[0]?.country?.currency_code}{" "}
                  {Number(walletData?.data?.[0]?.country?.token_rate).toFixed(
                    3
                  )}
                </Text>
              </View>

              <View style={tw`flex-row items-center justify-between`}>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-subtitle`}
                >
                  Available Balance
                </Text>

                <Text
                  style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                >
                  {walletData?.data?.[0]?.country?.currency_code}{" "}
                  {Number(walletData?.data?.[0]?.balance).toFixed(3)}
                </Text>
              </View>

              <PrimaryButton
                buttonText="Convert Tokens To Cash"
                buttonTextStyle={tw`text-primaryBtn`}
                buttonContainerStyle={tw`bg-secondaryBtn mb-1 mt-6`}
                onPress={() => {
                  if (walletData?.data?.[0]?.earn_token < 1) {
                    router.push({
                      pathname: "/Toaster",
                      params: {
                        res: "You don't have enough tokens to withdraw",
                      },
                    });
                  } else {
                    handleCurrencyModalOpen();
                  }
                }}
              />
            </View>

            <Text
              style={tw`font-HalyardDisplayMedium text-2xl text-white500 py-2`}
            >
              Withdrawal Section
            </Text>
            <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
              Enter Amount
            </Text>

            <View
              style={tw` h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3 my-3`}
            >
              <SvgXml xml={IconCurrency} />
              <TextInput
                placeholder="Enter the amount for Withdrawal"
                placeholderTextColor="#A4A4A4"
                style={tw`w-full text-white500`}
                onChangeText={(value) => setCurrencyValue(value as any)}
                keyboardType="numeric"
              />
            </View>
            {/* ====================== notice ------------------ */}
            <View style={tw`flex-row justify-start gap-2 pt-6`}>
              <SvgXml xml={IconWarring} />

              <Text
                // numberOfLines={3}
                style={tw`flex-1 font-HalyardDisplaySemiBold text-base text-red-600`}
              >
                Note:{" "}
                <Text
                  style={tw`font-HalyardDisplayRegular text-base text-white500`}
                >
                  If you want to withdraw your balance, you must have at least
                  100 followers on any of your social media accounts{" "}
                  <Text>
                    *Also purchase at least one task by trukonnect app & add
                    that account at my profile section in link social account.
                  </Text>
                </Text>
              </Text>
            </View>

            {/*  ===================== button   ================ */}
            {currencyValue > 0 ? (
              <PrimaryButton
                buttonText="Next"
                buttonContainerStyle={tw`mt-6 mb-1`}
                onPress={() => {
                  if (
                    profileData?.data?.data?.user?.withdrawal_status === "0"
                  ) {
                    router.push(
                      "/taskPerformerSection/withdrawProcedures/purchaseTask"
                    );
                  } else {
                    router.push({
                      pathname: "/Toaster",
                      params: {
                        res: "this task prepaid for payment ",
                      },
                    });
                  }
                }}
              />
            ) : (
              <PrimaryButton
                disabled
                buttonText="Next"
                buttonContainerStyle={tw`mt-6 mb-1 bg-gray-600`}
              />
            )}
          </ScrollView>
          {/* =========================== modal point convert ========================= */}
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={["95%"]}
              containerStyle={tw` bg-gray-500 bg-opacity-20`}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  appearsOnIndex={0}
                  disappearsOnIndex={-1}
                  pressBehavior="close"
                />
              )}

              //   onDismiss={() => {
              //     router.back();
              //   }}
            >
              <BottomSheetScrollView
                contentContainerStyle={tw`flex-1  bg-black`}
              >
                <View style={tw`rounded-3xl bg-black px-4 py-6 gap-2`}>
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                  >
                    Number of tokens
                  </Text>
                  <View
                    style={tw` h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3 my-3`}
                  >
                    <SvgXml xml={IconPoint} />
                    <TextInput
                      placeholder="Enter number of tokens to Convert"
                      placeholderTextColor="#A4A4A4"
                      style={tw`w-full text-white500`}
                      onChangeText={(value) => setInputValue(value)}
                      keyboardType="numeric"
                    />
                  </View>

                  <PrimaryButton
                    disabled={!inputValue}
                    buttonText="Convert"
                    buttonTextStyle={tw`text-white500`}
                    buttonContainerStyle={tw`bg-primaryBtn mb-1 mt-6`}
                    onPress={() => {
                      handleCurrencyModalClose();
                      router.push({
                        pathname:
                          "/taskPerformerSection/withdrawProcedures/youtubeVideo",
                        params: { convertToken: inputValue },
                      });
                    }}
                  />
                </View>
              </BottomSheetScrollView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </ViewProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Wallet;
