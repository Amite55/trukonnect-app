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
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import {
  useLazyGetPerformTaskQuery,
  useLazySingleTaskDetailsQuery,
} from "@/src/redux/api/performarSlices";
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
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const TaskHistory = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredData, setFilteredData] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [taskHistoryData, setTaskHistoryData] = useState();
  const [taskDetails, setTaskDetails] = useState();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const detailsBottomSheetModalRef = useRef<BottomSheetModal>(null);

  console.log(taskDetails, "this is task details =========>");

  // =================== api end point ==================
  const [tasksHistory, { isLoading, isFetching }] =
    useLazyGetPerformTaskQuery();

  const [taskHistoryDataDetails, { isLoading: isDetailsLoading }] =
    useLazySingleTaskDetailsQuery();

  // ================== details task data =================
  const hanleTaskDetails = async (id: any) => {
    try {
      const response = await taskHistoryDataDetails({ id }).unwrap();
      if (response) {
        setTaskDetails(response);
      }
    } catch (error) {
      console.log(error, "details not showing --------------->");
    }
  };

  const fetchData = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await tasksHistory({
          page: pageNum,
          per_page: 10,
          search: searchValue,
          status: filteredData,
          _timestamp: Date.now(),
        }).unwrap();
        // console.log(res?.data, "this is res------------>");
        const newData = res?.data?.data || [];
        const totalPages = res?.data?.last_page || 1;

        if (isRefresh) {
          // Refresh: replace all data
          setTaskHistoryData(newData);
          setPage(1);
        } else if (pageNum === 1) {
          // Initial load or pull to refresh
          setTaskHistoryData(newData);
        } else {
          // Load more: append data
          setTaskHistoryData((prev) => [...prev, ...newData]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error) {
        console.log(error, "error in task history api call");
      }
    },
    [filteredData, searchValue, tasksHistory]
  );

  // ============= initial render =====================
  useEffect(() => {
    fetchData(1);
  }, [fetchData, searchValue, filteredData]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData(1, true);
    setRefreshing(false);
  }, [fetchData]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchData(nextPage);
    }
  }, [isFetching, hasMore, page, fetchData]);

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

  // -=============== Render footer ======================
  const renderFooter = useCallback(() => {
    if (!isFetching || page === 1) return null;

    return (
      <View style={tw`py-4 items-center`}>
        <ActivityIndicator size="small" color="#ffffff" />
      </View>
    );
  }, [isFetching, page]);

  // Render empty component
  const renderEmptyComponent = useCallback(
    () => (
      <View style={tw`py-8 items-center`}>
        <Text style={tw`text-white500 font-HalyardDisplayRegular text-base`}>
          {isLoading ? "Loading..." : "No tasks available"}
        </Text>
      </View>
    ),
    [isLoading]
  );

  // Render loading indicator for initial load
  if (isLoading && page === 1) {
    return (
      <ViewProvider
        containerStyle={tw`flex-1 bg-bgBaseColor justify-center items-center`}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </ViewProvider>
    );
  }

  // Render each task item
  const renderTaskItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          hanleTaskDetails(item?.id);
          handleDetailsModalOpen();
        }}
        style={tw`border border-borderColor rounded-xl px-4 shadow-lg shadow-borderColor mb-3`}
      >
        <View style={tw`flex-row items-center justify-between py-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`w-12 h-12 rounded-full`}
              source={helpers.getImgFullUrl(item?.creator?.avatar)}
            />
            <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
              {item?.creator?.name}
            </Text>
          </View>
          <Text
            style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
          >
            {helpers.timeAgo(item?.created_at)}
          </Text>
        </View>
        <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
          {item?.engagement?.engagement_name}
        </Text>

        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-3 py-4`}>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconPoint} />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                {item?.task?.per_perform}
              </Text>
            </View>
            <Image
              style={tw`w-6 h-6 rounded-full`}
              contentFit="cover"
              source={helpers.getImgFullUrl(item?.task?.social?.icon_url)}
            />
          </View>

          <View
            style={tw.style(
              "w-24 h-8 justify-center items-center rounded-full bg-slate-600",
              item?.status === "Pending" && "bg-pendingBG",
              item?.status === "Completed" && "bg-earnBG",
              item?.status === "Rejected" && "bg-rejectBG",
              item?.status === "Admin_review" && "bg-pendingBG"
            )}
          >
            <Text
              style={tw.style(
                "font-HalyardDisplayMedium text-sm",
                item?.status === "Pending" && "text-pendingText",
                item?.status === "Completed" && "text-earnText",
                item?.status === "Rejected" && "text-rejectText",
                item?.status === "Admin_review" && "text-pendingText"
              )}
            >
              {item?.status === "Admin_review" ? "Admin Review" : item?.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // ===================== filter data ===========
  const FilterData = ["All", "Completed", "Rejected", "Pending"];

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-2`}>
      <View style={tw`flex-1`}>
        <BackTitleButton title="History" onPress={() => router.back()} />

        <View style={tw`flex-row items-center gap-3 mt-4 mb-4`}>
          <View
            style={tw`flex-1 h-12 flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3`}
          >
            <SvgXml xml={IconSearch} />
            <TextInput
              placeholder="Search by name of task creator"
              placeholderTextColor="#A4A4A4"
              style={tw`flex-1 text-white500`}
              onChangeText={(value) => setSearchValue(value)}
              value={searchValue}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleFilterModalOpen()}
            style={tw`w-12 h-12 justify-center items-center rounded-xl bg-transparentBG`}
          >
            <SvgXml xml={IconFilter} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={taskHistoryData}
          renderItem={renderTaskItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyComponent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>

      {/* =============================== filter modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["50%", "70%"]}
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
          <BottomSheetScrollView contentContainerStyle={tw`flex-1 bg-black`}>
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
              <View style={tw`pt-3`}>
                {FilterData.map((item, index) => (
                  <View key={index} style={tw``}>
                    <TouchableOpacity
                      onPress={() => {
                        setFilteredData(item);
                        handleFilterModalClose();
                      }}
                    >
                      <Text
                        style={tw`font-HalyardDisplayRegular text-xl text-white500 text-center py-2`}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                    <View style={tw`h-0.5 bg-borderColor mt-2`} />
                  </View>
                ))}
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      {/* ================================ task item details modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={detailsBottomSheetModalRef}
          snapPoints={["65%", "80%"]}
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
          <BottomSheetScrollView contentContainerStyle={tw`flex-1 bg-black`}>
            <View style={tw`rounded-3xl bg-black px-4 py-6 gap-2`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    style={tw`w-12 h-12 rounded-full`}
                    source={ImgFastSplash}
                  />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                  >
                    Star Bucks
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleDetailsModalClose();
                  }}
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
