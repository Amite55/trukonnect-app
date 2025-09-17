import {
  IconAccountSwitch,
  IconCreator,
  IconKey,
  IconLeaderboard,
  IconPrivacyPolicy,
  IconReferral,
  IconSocialIcon,
  IconSupport,
  IconTaskPerformer,
  IconTermsAndConditions,
} from "@/assets/icons";
import { ImgFastSplash } from "@/assets/image";
import MenuCard from "@/src/Components/MenuCard";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
const Profile = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleAccountSwitchModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleAccountSwitchModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);
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
        <View style={tw`py-4 gap-4`}>
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
        </View>
      </ScrollView>

      {/* =============================== edit modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={editBottomSheetModalRef}
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
                  <Pressable
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
                  </Pressable>

                  <Pressable
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
                  </Pressable>
                </View>
              </View>

              <View style={tw`gap-3`}>
                <PrimaryButton
                  onPress={() => handleAccountSwitchModalClose()}
                  buttonContainerStyle={tw`mb-1`}
                  buttonText="Switch"
                />
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};
export default Profile;
