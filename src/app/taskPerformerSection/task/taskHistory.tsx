import {
  IconCalendar,
  IconCross,
  IconFilter,
  IconInstagram,
  IconPoint,
  IconSearch,
  IconWarring,
} from "@/assets/icons";
import { ImgCompleteTaskSOS, ImgFastSplash } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const TaskHistory = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const detailsBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleFilterModalOpen = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleFilterModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleDetailsModalOpen = useCallback(async () => {
    detailsBottomSheetModalRef.current?.present();
  }, []);

  const handleDetailsModalClose = useCallback(() => {
    detailsBottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-2`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={tw`flex-1 `}
      >
        <BackTitleButton title="History" onPress={() => router.back()} />

        <View style={tw` flex-row items-center gap-3  `}>
          <View
            style={tw`flex-1 h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3`}
          >
            <SvgXml xml={IconSearch} />
            <TextInput
              placeholder="Search by name of task creator"
              placeholderTextColor="#A4A4A4"
              style={tw`w-full text-white500`}
              onChangeText={(value) => setSearchValue(value)}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleFilterModalOpen()}
            style={tw`w-12 h-12  justify-center items-center rounded-xl bg-transparentBG`}
          >
            <SvgXml xml={IconFilter} />
          </TouchableOpacity>
        </View>

        <View style={tw`gap-3 py-6`}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  //   router.push("/taskPerformerSection/task/taskDetails");
                  handleDetailsModalOpen();
                }}
                key={item}
                style={tw`border border-borderColor rounded-xl px-4 shadow-lg shadow-borderColor`}
              >
                <View style={tw`flex-row items-center justify-between py-4`}>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Image
                      style={tw`w-12 h-12 rounded-full `}
                      source={ImgFastSplash}
                    />
                    <Text
                      style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                    >
                      Star Bucks
                    </Text>
                  </View>
                  <Text
                    style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
                  >
                    13 Aug, 2025
                  </Text>
                </View>
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  Instagram Likes
                </Text>

                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center gap-3 py-4`}>
                    <View style={tw`flex-row items-center gap-2`}>
                      <SvgXml xml={IconPoint} />
                      <Text
                        style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                      >
                        500
                      </Text>
                    </View>
                    <SvgXml xml={IconInstagram} />
                  </View>

                  <View
                    style={tw.style(
                      "w-24 h-8 justify-center items-center rounded-full bg-slate-600",
                      item === 2 && "bg-pendingBG",
                      item === 4 && "bg-earnBG",
                      item === 6 && "bg-rejectBG"
                    )}
                  >
                    <Text
                      style={tw.style(
                        "font-HalyardDisplayMedium text-sm",
                        item === 2 && "text-pendingText",
                        item === 4 && "text-earnText",
                        item === 6 && "text-rejectText"
                      )}
                    >
                      {/* {item === 2 && "In Review"}
                      {item === 4 && "Earned"}
                      {item === 6 && "Rejected"} */}
                      In Review
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* =============================== filter modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["30%", "70%"]}
          containerStyle={tw`bg-gray-500 bg-opacity-20`}

          //   onDismiss={() => {
          //     router.back();
          //   }}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-black`}>
            <View style={tw`rounded-3xl bg-black px-4 py-6 gap-2`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-3xl text-white500`}
                >
                  Select
                </Text>
                <TouchableOpacity onPress={() => handleFilterModalClose()}>
                  <SvgXml xml={IconCross} />
                </TouchableOpacity>
              </View>

              {/* =============================== filter modal content =============================== */}

              <TouchableOpacity>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-white500 text-center`}
                >
                  All
                </Text>
              </TouchableOpacity>
              <View style={tw`h-0.5 bg-borderColor mt-2`} />
              <TouchableOpacity>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-white500 text-center`}
                >
                  Earned
                </Text>
              </TouchableOpacity>
              <View style={tw`h-0.5 bg-borderColor mt-2`} />
              <TouchableOpacity>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-white500 text-center`}
                >
                  Rejected
                </Text>
              </TouchableOpacity>
              <View style={tw`h-0.5 bg-borderColor mt-2`} />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      {/* ================================ task item details  modal =============================== */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={detailsBottomSheetModalRef}
          snapPoints={["65%", "80%"]}
          containerStyle={tw`bg-gray-500 bg-opacity-20`}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-black`}>
            <View style={tw`rounded-3xl bg-black px-4 py-6 gap-2`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    style={tw`w-12 h-12 rounded-full `}
                    source={ImgFastSplash}
                  />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                  >
                    Star Bucks
                  </Text>
                </View>
                <TouchableOpacity
                // onPress={() => handleFilterModalClose()}
                >
                  <SvgXml xml={IconCross} />
                </TouchableOpacity>
              </View>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                Instagram Likes
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

              {/* Proof uploader */}
              <View style={tw`mt-4`}>
                <Text
                  style={tw`font-HalyardDisplayRegular text-base text-white500`}
                >
                  Uploaded file
                </Text>
              </View>

              <View style={tw`py-4 flex-row gap-4 px-2`}>
                <Image
                  style={tw`w-20 h-28 rounded-lg`}
                  source={ImgCompleteTaskSOS}
                />
                <Image
                  style={tw`w-20 h-28 rounded-lg`}
                  source={ImgCompleteTaskSOS}
                />
              </View>

              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconWarring} />
                <Text
                  style={tw`font-HalyardDisplayRegular text-base text-white500`}
                >
                  Waiting for confirmation by Review Team
                </Text>
              </View>

              <PrimaryButton
                buttonText="Close"
                buttonContainerStyle={tw`mt-4 mb-1`}
                onPress={() => handleDetailsModalClose()}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};

export default TaskHistory;
