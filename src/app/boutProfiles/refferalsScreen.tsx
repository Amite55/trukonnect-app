import { IconCurrencyPrimaryColor } from "@/assets/icons";
import {
  ImgFastSplash,
  ImgFourthSplash,
  ImgSecondSplash,
  ImgThirdSplash,
} from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const RefferalsScreen = () => {
  const [activeTab, setActiveTab] = useState("user");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("https://trukonnect.com/ref/TRU-DD7S");
    router.push({
      pathname: "/Toaster",
      params: {
        res: "Copied to clipboard",
      },
    });
  };

  const referralUserData = [
    {
      id: 1,
      name: "John Doe",
      image: ImgFastSplash,
      status: "Pending",
    },
    {
      id: 6,
      name: "John ",
      image: ImgFastSplash,
      status: "Paid",
    },
    {
      id: 2,
      name: " Doe",
      image: ImgSecondSplash,
      status: "Paid",
    },
    {
      id: 3,
      name: "John Doe",
      image: ImgFourthSplash,
      status: "Pending",
    },
    {
      id: 4,
      name: "John Doe",
      image: ImgThirdSplash,
      status: "Paid",
    },
    {
      id: 5,
      name: "John Doe",
      image: ImgFastSplash,
      status: "Paid",
    },
  ];
  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-4`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="Back" />
        <View style={tw`flex-row justify-between items-center gap-2`}>
          <View
            style={tw`flex-1 justify-center items-center bg-[#C2FFD41A] p-4 rounded-2xl`}
          >
            <Text style={tw`font-HalyardDisplaySemiBold text-2xl text-earnBG`}>
              5%
            </Text>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
            >
              of friend’s first cash out
            </Text>
          </View>

          <View
            style={tw` flex-1 justify-center items-center bg-[#FBBEFE1A] p-4 rounded-2xl`}
          >
            <Text
              style={tw`font-HalyardDisplaySemiBold text-2xl text-rejectBG`}
            >
              10%
            </Text>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
            >
              of friend’s first cash out
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={2}
          style={tw`font-HalyardDisplayMedium text-xl text-subtitle mt-4`}
        >
          Earn 5% of your friend’s first cash out or 10% of brand’s first
          deposit.
        </Text>
        {/* ------------ referral code  ------------------ */}

        <View style={tw`border border-borderColor p-4 rounded-2xl mt-6`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Text
                style={tw`font-HalyardDisplayMedium text-base text-white500`}
              >
                Code:
              </Text>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                TRU - DD7S
              </Text>
            </View>

            <View style={tw` flex-row items-center gap-2`}>
              <PrimaryButton
                buttonText="Copy"
                buttonTextStyle={tw`text-sm font-HalyardDisplayMedium`}
                buttonContainerStyle={tw`w-11 h-8  rounded-lg mb-0`}
                onPress={copyToClipboard}
              />
              <PrimaryButton
                buttonText="Share"
                buttonTextStyle={tw`text-sm font-HalyardDisplayMedium`}
                buttonContainerStyle={tw`w-11 h-8 rounded-lg mb-0`}
              />
            </View>
          </View>

          <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
            https://trukonnect.com/ref/TRU-DD7S
          </Text>
        </View>

        {/* ============== total earning ================ */}
        <View
          style={tw`flex-row justify-between items-center mt-6 p-4 bg-transparentBG rounded-2xl`}
        >
          <View style={tw`gap-1 items-center`}>
            <Text
              style={tw`font-HalyardDisplaySemiBold text-xl text-primaryBtn`}
            >
              8
            </Text>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
            >
              Referrals
            </Text>
          </View>
          <View style={tw`gap-1 items-center`}>
            <Text
              style={tw`font-HalyardDisplaySemiBold text-xl text-primaryBtn`}
            >
              3
            </Text>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
            >
              Pending
            </Text>
          </View>
          <View style={tw`gap-1 items-center`}>
            <View style={tw`flex-row items-center gap-1`}>
              <SvgXml xml={IconCurrencyPrimaryColor} />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-primaryBtn`}
              >
                3,000
              </Text>
            </View>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
            >
              Earned
            </Text>
          </View>
        </View>

        {/* ======================= referral list ====================== */}

        <View style={tw`flex-row justify-between items-center gap-2 mt-6`}>
          {/* User Tab */}
          <TouchableOpacity
            style={tw`flex-1`}
            onPress={() => setActiveTab("user")}
          >
            <Text
              style={tw`font-HalyardDisplayMedium text-xl py-2 text-center ${
                activeTab === "user"
                  ? "border-b border-primaryBtn text-primaryBtn"
                  : " text-subtitle"
              }`}
            >
              User
            </Text>
          </TouchableOpacity>

          {/* Creators Tab */}
          <TouchableOpacity
            style={tw`flex-1`}
            onPress={() => setActiveTab("creators")}
          >
            <Text
              style={tw` font-HalyardDisplayMedium text-xl py-2 text-center ${
                activeTab === "creators"
                  ? "border-b border-primaryBtn text-primaryBtn"
                  : "text-subtitle"
              }`}
            >
              Creators
            </Text>
          </TouchableOpacity>
        </View>

        {/* ---------------------- referral list --------------------- */}

        <View style={tw`gap-3 py-4`}>
          {referralUserData.map((item, index) => {
            return (
              <View
                key={index}
                style={tw`flex-row justify-between items-center px-4 py-3`}
              >
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    style={tw`w-8 h-8 rounded-full`}
                    source={item?.image}
                  />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-base text-white500`}
                  >
                    {item?.name}
                  </Text>
                </View>
                <Text
                  style={tw`font-HalyardDisplayRegular text-base ${
                    item.status === "Pending"
                      ? "text-primaryBtn"
                      : "text-subtitle"
                  } `}
                >
                  {item.status}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default RefferalsScreen;
