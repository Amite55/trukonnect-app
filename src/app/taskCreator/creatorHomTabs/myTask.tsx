import { IconCalender } from "@/assets/icons";
import { TaskWorkingData } from "@/src/Data/DataAll";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SvgXml } from "react-native-svg";

const MyTask = () => {
  const calenderBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("Completed");
  const today = new Date().toISOString().split("T")[0];

  const handleCalenderModalOpen = useCallback(async () => {
    calenderBottomSheetModalRef.current?.present();
  }, []);

  // ============== task status ================ //
  const taskStatus = [
    {
      id: 1,
      name: "Completed",
    },
    {
      id: 2,
      name: "Pending Verification",
    },
    {
      id: 3,
      name: "Rejected",
    },
  ];

  return (
    <>
      <FlatList
        data={TaskWorkingData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`gap-3 py-4 pb-6`}
        style={tw`bg-bgBaseColor flex-1 px-4`}
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`font-GucinaBold text-2xl text-white500`}>
                  My Task
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  delayPressIn={0}
                  delayPressOut={0}
                  onPress={handleCalenderModalOpen}
                  style={tw`flex-row items-center bg-borderColor  p-2 rounded-3xl gap-2`}
                >
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-white500`}
                  >
                    {selected ? selected : "Select Date"}
                  </Text>
                  <View style={tw`p-2 items-center rounded-full bg-primaryBtn`}>
                    <SvgXml xml={IconCalender} />
                  </View>
                </TouchableOpacity>
              </View>

              {/* ==================== task status ================ */}

              <View
                style={tw`flex-row justify-between items-center gap-2 mt-4`}
              >
                {taskStatus.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      delayPressIn={0}
                      delayPressOut={0}
                      onPress={() => setStatus(item.name)}
                      style={[
                        tw`flex-row items-center bg-borderColor  py-2 px-4 rounded-3xl gap-2`,
                        status === item.name
                          ? tw`bg-primaryBtn`
                          : `bg-borderColor`,
                      ]}
                    >
                      <Text
                        style={tw`font-HalyardDisplayRegular text-sm text-white500`}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={0}
              delayPressOut={0}
              onPress={() => {
                router.push({
                  pathname: "/taskCreator/myTaskDetails",
                  params: { status: status },
                });
              }}
              style={tw`p-4 bg-transparentBG rounded-2xl gap-2`}
            >
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={item.icon} />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-lg text-white500`}
                  >
                    YouTube Video Views
                  </Text>
                </View>

                <Text
                  style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}
                >
                  {item.date}
                </Text>
              </View>

              <Text
                style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* -------------------  calendar  bottom saheet ---------------- */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={calenderBottomSheetModalRef}
          snapPoints={["55%", "55%"]}
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
              style={tw`rounded-3xl  bg-black px-4 py-6 flex-grow justify-center `}
            >
              <Calendar
                style={tw` p-2 rounded-3xl gap-2 text-subtitle`}
                theme={{
                  calendarBackground: "#000",
                  textSectionTitleColor: "#fff",
                  selectedDayBackgroundColor: "orange",
                  selectedDayTextColor: "#fff",
                  todayTextColor: "orange",
                  dayTextColor: "#fff",
                  textDisabledColor: "#A4A4A4",
                  arrowColor: "orange",
                  monthTextColor: "#fff",
                }}
                onDayPress={(day) => {
                  setSelected(day.dateString);
                  if (day.dateString) {
                    calenderBottomSheetModalRef.current?.dismiss();
                  }
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: "orange",
                  },
                }}
                maxDate={today}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default MyTask;
