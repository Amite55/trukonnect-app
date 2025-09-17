import {
  IconCalendar,
  IconCompleteTask,
  IconCurrencyPrimaryColor,
  IconHelpAndSupport,
  IconInstagram,
  IconOngoing,
  IconPoint,
  IconUserPaid,
} from "@/assets/icons";
import { ImgFastSplash } from "@/assets/image";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import HomeProfileBar from "@/src/Components/HomeProfileBar";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
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
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import { SvgXml } from "react-native-svg";
const Dashboard = () => {
  const ResentTaskBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleResentTaskModalOpen = useCallback(async () => {
    ResentTaskBottomSheetModalRef.current?.present();
  }, []);
  const handleResentTaskModalClose = useCallback(() => {
    ResentTaskBottomSheetModalRef.current?.dismiss();
  }, []);
  return (
    <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------------- header profile section ----------------- */}
        <HomeProfileBar
          onPress={() => {
            router.push("/taskCreator/creatorHomTabs/profile");
          }}
        />
        {/* ======================= task info ======================= */}
        <View style={tw`gap-3`}>
          <View style={tw` flex-row  gap-2`}>
            <CreatorCounterCard
              onPress={() => {
                router.push("/taskCreator/completeOrderTask");
              }}
              icon={IconCompleteTask}
              title=" Completed Orders"
              counter={243}
            />
            <CreatorCounterCard
              onPress={() => {
                router.push("/taskCreator/ongoingOrderTask");
              }}
              icon={IconOngoing}
              title="Ongoing Orders"
              counter={243}
            />
          </View>

          <View style={tw`flex-row  gap-2`}>
            <CreatorCounterCard
              onPress={() => {
                router.push("/taskCreator/userPaid");
              }}
              icon={IconUserPaid}
              title=" Users Paid"
              counter={24}
            />
            <CreatorCounterCard
              onPress={() => {
                router.push("/boutProfiles/support");
              }}
              icon={IconHelpAndSupport}
              title="  Help & Support"
            />
          </View>
        </View>

        <PrimaryButton
          buttonText="Buy a Task"
          buttonContainerStyle={tw`bg-inputBgColor my-6`}
          buttonTextStyle={tw`font-HalyardDisplaySemiBold text-xl text-primaryBtn `}
          onPress={() => {
            router.push("/taskCreator/creatorHomTabs/buyTasks");
          }}
        />

        {/* =================== Recent Tasks =================== */}
        <Text style={tw`font-HalyardDisplayMedium text-2xl text-white500 my-2`}>
          Recent Tasks
        </Text>
        <View style={tw`gap-2`}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <TouchableOpacity
                onPress={handleResentTaskModalOpen}
                key={index}
                style={tw`flex-row items-center justify-between p-4 bg-transparentBG rounded-2xl `}
              >
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconInstagram} />
                  <Text
                    style={tw`font-HalyardDisplayRegular text-xl text-white500`}
                  >
                    Instagram Follows
                  </Text>
                </View>
                <Text
                  style={tw`font-HalyardDisplayRegular text-primaryBtn text-xs`}
                >
                  24 /<Text style={tw`text-subtitle`}>60</Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {/* -------------------- Recent Tasks End --------------------  */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ResentTaskBottomSheetModalRef}
          snapPoints={["60%", "60%"]}
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
                <View style={tw`flex-row items-center gap-2 pb-4`}>
                  <Image
                    style={tw`w-12 h-12 rounded-full `}
                    source={ImgFastSplash}
                  />
                  <View>
                    <Text
                      style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                    >
                      Star Bucks
                    </Text>
                    <Text
                      style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
                    >
                      13 Aug, 2025
                    </Text>
                  </View>
                </View>
                {/* Description */}
                <Text
                  style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
                >
                  Like the latest Star Bucks ad post on Instagram. Earn 2 tokens
                  instantly for showing your support!
                  {"\n"}- Tap the link
                  {"\n"}- Check the profile picture
                  {"\n"}- React on the post
                </Text>

                {/* Tokens */}
                <View style={tw`flex-row items-center justify-between mt-3`}>
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-white500`}
                  >
                    Total tokens
                  </Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconPoint} />
                    <Text
                      style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                    >
                      200
                    </Text>
                  </View>
                </View>

                {/* Task from */}
                <View style={tw`flex-row items-center justify-between`}>
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-white500`}
                  >
                    Task from
                  </Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconInstagram} />
                    <Text
                      style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                    >
                      Instagram
                    </Text>
                  </View>
                </View>

                {/* date line */}
                <View style={tw`flex-row items-center justify-between`}>
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-white500`}
                  >
                    Completed Date
                  </Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconCalendar} />
                    <Text
                      style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                    >
                      13 Aug, 2025
                    </Text>
                  </View>
                </View>

                {/* =========================== Progress of task  =========================== */}

                <View style={tw`flex-row items-center justify-between px-2`}>
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-base text-white500 mt-4 mb-2`}
                  >
                    Progress of task
                  </Text>
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-primaryBtn`}
                  >
                    45/
                    <Text style={tw`text-white500`}>60</Text>
                  </Text>
                </View>
                {/* Total Cost */}
                <View style={tw`flex-row items-center justify-between pt-2`}>
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-white500`}
                  >
                    Total Cost
                  </Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconCurrencyPrimaryColor} />
                    <Text
                      style={tw`font-HalyardDisplaySemiBold text-base text-primaryBtn`}
                    >
                      5896.00
                    </Text>
                  </View>
                </View>

                <View style={tw`px-4 mt-2 mb-6`}>
                  <Progress.Bar
                    color="#FD7701"
                    borderRadius={4}
                    borderWidth={0}
                    height={8}
                    progress={0.7}
                    unfilledColor="#333"
                    width={400}
                  />
                </View>
              </View>
              <PrimaryButton
                onPress={() => handleResentTaskModalClose()}
                buttonContainerStyle={tw`mb-2`}
                buttonText="Close"
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};

export default Dashboard;
