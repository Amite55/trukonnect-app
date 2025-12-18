import { IconCalender } from "@/assets/icons";
import { helpers } from "@/src/lib/helper";
import TaskCardSkeletonList from "@/src/lib/Skeleton/TasksSkeletion";
import tw from "@/src/lib/tailwind";
import { useLazyGetMyTasksQuery } from "@/src/redux/api/brandSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SvgXml } from "react-native-svg";

const MyTask = () => {
  const calenderBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("Completed");
  const today = new Date().toISOString().split("T")[0];
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [myTaskData, setMyTaskData] = useState();
  const [refreshing, setRefreshing] = useState(false);

  // ==================== api endpoint    ===================
  const [getMyTaskData, { isLoading: isGetMyTaskLoading, isFetching }] =
    useLazyGetMyTasksQuery();

  const handleCalenderModalOpen = useCallback(async () => {
    calenderBottomSheetModalRef.current?.present();
  }, []);

  // ========= fetch data with filtering =------------------
  const fetchData = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await getMyTaskData({
          page: pageNum,
          per_page: 10,
          status: status,
          start_date: selected,
          _timestamp: Date.now(),
        }).unwrap();

        const newData = res?.data?.data || [];
        const totalPages = res?.data?.last_page || 1;

        if (isRefresh) {
          setMyTaskData(newData);
          setPage(1);
        } else if (pageNum === 1) {
          setMyTaskData(newData);
          // setPage(1);
        } else {
          setMyTaskData((prevData) => [...prevData, ...newData]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error: any) {
        console.log(error, "not get my task from api ");
      }
    },
    [getMyTaskData, status, selected]
  );

  // ================= initial render this screen ============
  useEffect(() => {
    fetchData(1);
  }, [getMyTaskData, status, selected]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData(1, true);
    setRefreshing(false);
  }, [fetchData]);

  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchData(nextPage);
    }
  }, [isFetching, hasMore, page, fetchData]);

  // ============== task status ================ //
  const taskStatus = [
    {
      id: 1,
      name: "Completed",
    },
    {
      id: 2,
      name: "Pending",
    },
    {
      id: 3,
      name: "Rejected",
    },
  ];

  // ===================== list header render   =================
  const RenderHeader = () => {
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

        <View style={tw`flex-row justify-between items-center gap-2 mt-4`}>
          {taskStatus.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                delayPressIn={0}
                delayPressOut={0}
                onPress={() => setStatus(item.name)}
                style={[
                  tw`flex-row items-center bg-borderColor  py-2 px-8 rounded-3xl gap-2`,
                  status === item.name ? tw`bg-primaryBtn` : `bg-borderColor`,
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
  };

  // =================== render item ==========
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        delayPressIn={0}
        delayPressOut={0}
        onPress={() => {
          router.push({
            pathname: "/taskCreator/myTaskDetails",
            params: { id: item?.id },
          });
        }}
        style={tw`p-4 bg-transparentBG rounded-2xl gap-2`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`w-6 h-6 rounded-full`}
              contentFit="cover"
              source={helpers.getImgFullUrl(item?.social?.icon_url)}
            />
            <Text style={tw`font-HalyardDisplayMedium text-lg text-white500`}>
              {item?.engagement?.engagement_name}
            </Text>
          </View>

          <Text style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}>
            {helpers.formatDate(item?.created_at)}
          </Text>
        </View>

        <Text style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}>
          {item?.description}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render empty component
  const renderEmptyComponent = useCallback(
    () => (
      <View style={tw`py-8 items-center`}>
        <Text style={tw`text-white500 font-HalyardDisplayRegular text-base`}>
          {isGetMyTaskLoading ? "Loading..." : "No tasks available"}
        </Text>
      </View>
    ),
    [isGetMyTaskLoading]
  );

  // Render loading indicator for initial load
  if (isGetMyTaskLoading && page === 1) {
    return <TaskCardSkeletonList dummyArray={5} />;
  }
  return (
    <>
      <FlatList
        data={myTaskData}
        keyExtractor={(item, index) => item?.id.toString()}
        contentContainerStyle={tw`gap-3 py-4 pb-6`}
        style={tw`bg-bgBaseColor flex-1 px-4`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={RenderHeader}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
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
