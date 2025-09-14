import { IconCalendar, IconInstagram, IconPoint } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import { SvgXml } from "react-native-svg";

const OngoingOrderTask = () => {
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
              title="Ongoing orders"
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
              style={tw`flex-row items-center p-4 bg-transparentBG rounded-2xl `}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconInstagram} />
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-white500`}
                >
                  Instagram Follows
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* ======================= details bottom set    ======================= */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={detailsBottomSheetModalRef}
          snapPoints={["60%", "60%"]}
          containerStyle={tw`bg-gray-500 bg-opacity-20`}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-black`}>
            <View
              style={tw`rounded-3xl bg-black px-4 py-6 flex-grow justify-between`}
            >
              <View>
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

                <View style={tw`px-4 mt-2 mb-6`}>
                  <Progress.Bar
                    color="#FD7701"
                    borderRadius={4}
                    borderWidth={0}
                    height={8}
                    progress={0.7}
                    unfilledColor="#333"
                    width={300}
                  />
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

export default OngoingOrderTask;
