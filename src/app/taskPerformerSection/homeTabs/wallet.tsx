import { IconCurrency, IconPoint, IconWarring } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Wallet = () => {
  const [currencyValue, setCurrencyValue] = React.useState("");
  const [poinrValue, setPointValue] = React.useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleCurrencyModalOpen = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCurrencyModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-6`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 `}
      >
        <Text style={tw`font-GucinaBold text-2xl text-white500`}>
          My Wallet
        </Text>

        {/* ==================== Available Tokens ==================== */}

        <View style={tw`bg-transparentBG p-5 rounded-2xl gap-4 my-4`}>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`font-HalyardDisplayRegular text-xl text-subtitle`}>
              Available Tokens
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconPoint} />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
              >
                40
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`font-HalyardDisplayRegular text-xl text-subtitle`}>
              Per Token
            </Text>

            <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
              GH₵ 66
            </Text>
          </View>

          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`font-HalyardDisplayRegular text-xl text-subtitle`}>
              Available Balance
            </Text>

            <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
              GH₵ 200
            </Text>
          </View>

          <PrimaryButton
            buttonText="Convert Tokens To Cash"
            buttonTextStyle={tw`text-primaryBtn`}
            buttonContainerStyle={tw`bg-secondaryBtn mb-1 mt-6`}
            onPress={() => {
              handleCurrencyModalOpen();
            }}
          />
        </View>

        <Text style={tw`font-HalyardDisplayMedium text-2xl text-white500 py-2`}>
          My Wallet
        </Text>
        <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
          Enter Amount
        </Text>

        <View
          style={tw` h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3 my-3`}
        >
          <SvgXml xml={IconCurrency} />
          <TextInput
            placeholder="Search by name of task creator"
            placeholderTextColor="#A4A4A4"
            style={tw`w-full text-white500`}
            onChangeText={(value) => setCurrencyValue(value)}
            keyboardType="numeric"
          />
        </View>
        {/* ====================== notice ------------------ */}
        <View style={tw`flex-row justify-start gap-2 pt-6`}>
          <SvgXml xml={IconWarring} />

          <Text
            numberOfLines={3}
            style={tw`flex-1 font-HalyardDisplaySemiBold text-base text-red-600`}
          >
            Note:{" "}
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-white500`}
            >
              Please take screenshots of the completed tasks and upload them
              from Task section. Also add your social media account at profile
              in linked social account.
            </Text>
          </Text>
        </View>

        {/*  ===================== button   ================ */}
        {currencyValue ? (
          <PrimaryButton
            buttonText="Next"
            buttonContainerStyle={tw`mt-6 mb-1`}
            onPress={() =>
              router.push(
                // "/taskPerformerSection/withdrawProcedures/withdrawProcedure"
                "/taskPerformerSection/withdrawProcedures/purchaseTask"
              )
            }
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
          snapPoints={["60%", "70%"]}
          containerStyle={tw` bg-gray-500 bg-opacity-20`}

          //   onDismiss={() => {
          //     router.back();
          //   }}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-black`}>
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
                  placeholder="Search by name of task creator"
                  placeholderTextColor="#A4A4A4"
                  style={tw`w-full text-white500`}
                  onChangeText={(value) => setPointValue(value)}
                  keyboardType="numeric"
                />
              </View>

              <PrimaryButton
                buttonText="Convert"
                buttonTextStyle={tw`text-white500`}
                buttonContainerStyle={tw`bg-primaryBtn mb-1 mt-6`}
                onPress={() => {
                  handleCurrencyModalClose();

                  router.push(
                    "/taskPerformerSection/withdrawProcedures/youtubeVideo"
                  );
                }}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};

export default Wallet;
