import {
  IconAccountSwitch,
  IconCreator,
  IconKey,
  IconLeaderboard,
  IconLogout,
  IconPrivacyPolicy,
  IconReferral,
  IconSocialIcon,
  IconSupport,
  IconTaskPerformer,
  IconTermsAndConditions,
} from "@/assets/icons";
import { ImgFastSplash } from "@/assets/image";
import MenuCard from "@/src/Components/MenuCard";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useSingUpMutation } from "@/src/redux/api/authSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
const Profile = () => {
  const accountSwitchBottomSheetModalRef = useRef<BottomSheetModal>(null);
  // ============== api end point ==============
  const [singOut, { isLoading: isSingOutLoading }] = useSingUpMutation();

  const handleAccountSwitchModalOpen = useCallback(async () => {
    accountSwitchBottomSheetModalRef.current?.present();
  }, []);
  const handleAccountSwitchModalClose = useCallback(() => {
    accountSwitchBottomSheetModalRef.current?.dismiss();
  }, []);

  // ==================   handle sing out ==================
  const handleSingOut = async () => {
    try {
      const res = await singOut({});
      if (res) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        router.replace("/onboardingScreen");
      }
    } catch (error: any) {
      console.log("Error in sing out:", error);
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Logout failed" },
      });
    }
  };
  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="My Profile" onPress={() => router.back()} />

        <TouchableOpacity
          onPress={() => router.push("/boutProfiles/editProfile")}
          style={tw`flex-row items-center gap-4 bg-inputBgColor p-4 rounded-2xl`}
        >
          <Image style={tw`w-14 h-14 rounded-full `} source={ImgFastSplash} />
          <View style={tw`gap-2`}>
            <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
              Daniel
            </Text>
            <Text style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}>
              daniel245@gmail.com
            </Text>
          </View>
        </TouchableOpacity>

        {/* -------------------- profile menu section ---------------- */}
        <View style={tw`py-6 gap-4`}>
          <MenuCard
            title=" Change Password"
            icon={IconKey}
            onPress={() => {
              router.push("/auth/changePassword");
            }}
          />
          <MenuCard
            title="Switch account type"
            icon={IconAccountSwitch}
            onPress={() => {
              handleAccountSwitchModalOpen();
            }}
          />
          <MenuCard
            title="Link social accounts"
            icon={IconSocialIcon}
            onPress={() => {
              router.push("/boutProfiles/socialLinks");
            }}
          />
          <MenuCard
            title="Leaderboard"
            icon={IconLeaderboard}
            onPress={() => {
              router.push("/boutProfiles/leaderboard");
            }}
          />
          <MenuCard
            title="Referral"
            icon={IconReferral}
            onPress={() => {
              router.push("/boutProfiles/refferalsScreen");
            }}
          />
          <MenuCard
            title="Privacy Policy"
            icon={IconPrivacyPolicy}
            onPress={() => {
              router.push("/boutProfiles/PrivacyPolicy");
            }}
          />
          <MenuCard
            title="Terms & Conditions"
            icon={IconTermsAndConditions}
            onPress={() => {
              router.push("/boutProfiles/termsAndConditions");
            }}
          />
          <MenuCard
            title="Support"
            icon={IconSupport}
            onPress={() => {
              router.push("/boutProfiles/support");
            }}
          />
          <MenuCard
            title="Logout"
            titleStyle={tw`text-red-500`}
            containerStyle={tw`border  border-red-400 `}
            icon={IconLogout}
            onPress={() => {
              handleSingOut();
            }}
          />
        </View>
      </ScrollView>

      {/* =============================== edit modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={accountSwitchBottomSheetModalRef}
          snapPoints={["98%"]}
          containerStyle={tw`bg-gray-500 bg-opacity-20`}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          )}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-black`}>
            <View
              style={tw`rounded-3xl bg-black px-4 py-6 flex-grow justify-between`}
            >
              <View>
                <BackTitleButton
                  title="Back"
                  onPress={() => handleAccountSwitchModalClose()}
                />

                <Text
                  style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}
                >
                  Account Switch
                </Text>

                <View style={tw`gap-3 py-4`}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    delayPressIn={0}
                    delayPressOut={0}
                    onPress={() =>
                      router.replace("/taskPerformerSection/homeTabs/home")
                    }
                    style={[
                      tw`flex-row items-center justify-between p-4 border border-borderColor rounded-2xl shadow-md`,
                    ]}
                  >
                    <View style={tw`gap-1`}>
                      <Text
                        style={tw`font-HalyardDisplaySemiBold text-lg text-white500`}
                      >
                        Task Performer Mode
                      </Text>
                      <Text
                        style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}
                      >
                        Complete tasks & earn money.
                      </Text>
                    </View>
                    <SvgXml xml={IconTaskPerformer} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    delayPressIn={0}
                    delayPressOut={0}
                    onPress={() =>
                      router.push("/taskCreator/creatorHomTabs/dashboard")
                    }
                    style={[
                      tw`flex-row items-center justify-between p-4 border border-borderColor rounded-2xl shadow-md`,
                    ]}
                  >
                    <View style={tw`gap-1`}>
                      <Text
                        style={tw`font-HalyardDisplaySemiBold text-lg text-white500`}
                      >
                        Brand Mode
                      </Text>
                      <Text
                        style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}
                      >
                        Post tasks, set budget & view analytics.
                      </Text>
                    </View>
                    <SvgXml xml={IconCreator} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={tw`gap-3`}>
                {/* <PrimaryButton
                  onPress={() => handleAccountSwitchModalClose()}
                  buttonContainerStyle={tw`mb-1`}
                  buttonText="Switch"
                /> */}
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};
export default Profile;
