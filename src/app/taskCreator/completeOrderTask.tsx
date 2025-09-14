import {
  IconCalendar,
  IconInstagram,
  IconMultipleUser,
  IconPoint,
  IconTotalToken,
} from "@/assets/icons";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const CompleteOrderTask = () => {
  const detailsBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleDetailsModalOpen = useCallback(async () => {
    detailsBottomSheetModalRef.current?.present();
  }, []);
  const handleDetailsModalClose = useCallback(() => {
    detailsBottomSheetModalRef.current?.dismiss();
  }, []);
  return (
    <>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`gap-3 py-4`}
        style={tw`bg-bgBaseColor flex-1 px-4`}
        ListHeaderComponent={() => {
          return (
            <BackTitleButton
              titleTextStyle={tw`font-GucinaSemiBold`}
              title="Completed orders"
            />
          );
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              delayPressOut={0}
              onPress={handleDetailsModalOpen}
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
                24
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* ======================= details bottom set    ======================= */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={detailsBottomSheetModalRef}
          snapPoints={["70%", "70%"]}
          containerStyle={tw`bg-gray-500 bg-opacity-20`}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-black`}>
            <View
              style={tw`rounded-3xl bg-black px-4 py-6 flex-grow justify-between`}
            >
              <View>
                <View style={tw`flex-row  gap-2`}>
                  <CreatorCounterCard
                    onPress={() => {
                      router.push("/taskCreator/completeOrderTask");
                    }}
                    icon={IconMultipleUser}
                    title="Total Performers"
                    counter={150}
                    disabled
                  />
                  <CreatorCounterCard
                    onPress={() => {
                      router.push("/taskCreator/completeOrderTask");
                    }}
                    icon={IconTotalToken}
                    title="Total Tokens Distributed"
                    counter={300}
                    disabled
                  />
                </View>

                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500 mt-4 mb-2`}
                >
                  Like this post
                </Text>
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
              </View>
              <PrimaryButton
                onPress={() => handleDetailsModalClose()}
                buttonContainerStyle={tw`mb-2`}
                buttonText="Close"
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default CompleteOrderTask;
