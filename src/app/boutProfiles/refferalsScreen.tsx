import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { useProfile } from "@/src/hooks/useProfile";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import RefferalsSkeleton from "@/src/lib/Skeleton/RefferalsSkeleton";
import tw from "@/src/lib/tailwind";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const RefferalsScreen = () => {
  const [activeTab, setActiveTab] = useState("performer");
  const [reffaralData, setReffaralData] = useState<any[]>([]);
  const { data: profileData, isLoading } = useProfile();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(profileData?.data?.user?.referral_code);
    router.push({
      pathname: "/Toaster",
      params: {
        res: "Copied to clipboard",
      },
    });
  };

  // ================== referral user data ==================
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoading) return;
        if (activeTab === "performer") {
          setReffaralData(profileData?.data?.performer);
        } else if (activeTab === "creators") {
          setReffaralData(profileData?.data?.creator);
        }
      } catch (error: any) {
        console.log(error, "this state data not updated -------->");
      }
    };
    fetchData();
  }, [activeTab, profileData]);

  // --------------------- isloading ---------------------
  if (isLoading) {
    return <RefferalsSkeleton />;
  }

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
              Brands first Deposit
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
                {profileData?.data?.user?.referral_code}
              </Text>
            </View>

            <View style={tw` flex-row items-center gap-2`}>
              <PrimaryButton
                buttonText="Copy"
                buttonTextStyle={tw`text-sm font-HalyardDisplayMedium`}
                buttonContainerStyle={tw`w-11 h-8  rounded-lg mb-0`}
                onPress={copyToClipboard}
              />
              {/* <PrimaryButton
                buttonText="Share"
                buttonTextStyle={tw`text-sm font-HalyardDisplayMedium`}
                buttonContainerStyle={tw`w-11 h-8 rounded-lg mb-0`}
              /> */}
            </View>
          </View>

          {/* <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
            https://trukonnect.com/ref/TRU-DD7S
          </Text> */}
        </View>

        {/* ============== total earning ================ */}
        <View
          style={tw`flex-row justify-around items-center mt-6 p-4 bg-transparentBG rounded-2xl`}
        >
          <View style={tw`gap-1 items-center`}>
            <Text
              style={tw`font-HalyardDisplaySemiBold text-xl text-primaryBtn`}
            >
              {profileData?.data?.user?.total_ref}
            </Text>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
            >
              Referrals
            </Text>
          </View>

          <View style={tw`gap-1 items-center`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-lg text-primaryBtn`}
              >
                {profileData?.data?.user?.country?.currency_code}{" "}
                {profileData?.data?.user?.ref_income}
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
            onPress={() => setActiveTab("performer")}
          >
            <Text
              style={tw`font-HalyardDisplayMedium text-xl py-2 text-center ${
                activeTab === "performer"
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
          {reffaralData?.length > 0 ? (
            Array.isArray(reffaralData) &&
            reffaralData.map((item: any) => {
              return (
                <View
                  key={item?.id}
                  style={tw`flex-row justify-between items-center px-4 py-3`}
                >
                  <View style={tw`flex-row items-center gap-2`}>
                    <Image
                      style={tw`w-8 h-8 rounded-full`}
                      source={helpers.getImgFullUrl(item?.avatar)}
                    />
                    <Text
                      style={tw`font-HalyardDisplayMedium text-base text-white500`}
                    >
                      {item?.name}
                    </Text>
                  </View>
                  {/* <Text
                  style={tw`font-HalyardDisplayRegular text-base ${
                    item.status === "Pending"
                      ? "text-primaryBtn"
                      : "text-subtitle"
                  } `}
                >
                  {item.status}
                </Text> */}
                </View>
              );
            })
          ) : (
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-subtitle text-center`}
            >
              No Referrals
            </Text>
          )}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default RefferalsScreen;
