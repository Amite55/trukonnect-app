import {
  IconCalendar,
  IconMultipleUser,
  IconPoint,
  IconTotalToken,
} from "@/assets/icons";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import TaskDetailsBottomSheetSkeleton from "@/src/lib/Skeleton/TaskDetailsBottomSheetSkeleton";
import TaskCardSkeletonList from "@/src/lib/Skeleton/TasksSkeletion";
import tw from "@/src/lib/tailwind";
import {
  useLazyGetMyTaskDetailsQuery,
  useLazyGetMyTasksQuery,
} from "@/src/redux/api/brandSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const CompleteOrderTask = () => {
  const { type } = useLocalSearchParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [myTaskData, setMyTaskData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const detailsBottomSheetModalRef = useRef<BottomSheetModal>(null);

  // ------------- api end point ---------------     //
  const [getMyTaskData, { isLoading: isGetMyTaskLoading, isFetching }] =
    useLazyGetMyTasksQuery();
  const [
    getRecentTaskDetails,
    { data: taskDetails, isLoading: isTaskDetailsLoading },
  ] = useLazyGetMyTaskDetailsQuery();

  // ========= fetch data with filtering =------------------
  const fetchData = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await getMyTaskData({
          status: type,
          page: pageNum,
          per_page: 10,
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
    [getMyTaskData]
  );

  // ================= initial render this screen ============
  useEffect(() => {
    fetchData(1);
  }, [getMyTaskData]);

  const handleDetailsModalOpen = useCallback(async () => {
    detailsBottomSheetModalRef.current?.present();
  }, []);
  const handleDetailsModalClose = useCallback(() => {
    detailsBottomSheetModalRef.current?.dismiss();
  }, []);

  // ================== handle Details ================
  const handleDetails = async (id: any) => {
    try {
      const response = await getRecentTaskDetails(id).unwrap();
      if (response) {
        handleDetailsModalOpen();
      }
    } catch (error: any) {
      console.log(error, "details not showing ==========>");
    }
  };

  // Handle pull to refresh ++++++++++++++++
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

  // --------------- render item ---------------------
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        delayPressIn={0}
        delayPressOut={0}
        onPress={() => {
          handleDetails(item?.id);
        }}
        style={tw`flex-row items-center justify-between p-4 bg-transparentBG rounded-2xl `}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <Image
            style={tw`w-6 h-6 rounded-full`}
            contentFit="cover"
            source={helpers.getImgFullUrl(item?.social?.icon_url)}
          />
          <Text style={tw`font-HalyardDisplayRegular text-xl text-white500`}>
            {item?.engagement?.engagement_name}
          </Text>
        </View>
        <Text style={tw`font-HalyardDisplayRegular text-primaryBtn text-xs`}>
          {item?.performed} /
          <Text style={tw`text-subtitle`}>{item?.quantity}</Text>
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList
        data={myTaskData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`gap-4 py-4`}
        style={tw`bg-bgBaseColor flex-1 px-4`}
        ListHeaderComponent={() => {
          return (
            <BackTitleButton
              titleTextStyle={tw`font-GucinaSemiBold`}
              title={
                type === "Completed"
                  ? "Completed orders"
                  : type === "Pending"
                  ? "Ongoing orders"
                  : "orders"
              }
            />
          );
        }}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" color="#ffffff" /> : null
        }
      />

      {/* ======================= details bottom set    ======================= */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={detailsBottomSheetModalRef}
          snapPoints={["100%"]}
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
            {isTaskDetailsLoading ? (
              <TaskDetailsBottomSheetSkeleton />
            ) : (
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
                      counter={taskDetails?.data?.performers || 0}
                      disabled
                    />
                    <CreatorCounterCard
                      onPress={() => {
                        router.push("/taskCreator/completeOrderTask");
                      }}
                      icon={IconTotalToken}
                      title="Total Tokens Distributed"
                      counter={taskDetails?.data?.token_distributed || 0}
                      disabled
                    />
                  </View>

                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-base text-white500 mt-4 mb-2`}
                  >
                    {taskDetails?.data?.engagement?.engagement_name}
                  </Text>
                  {/* Description */}
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
                  >
                    {taskDetails?.data?.engagement?.description}
                  </Text>

                  <View style={tw`gap-2`}>
                    {/* Tokens */}
                    <View
                      style={tw`flex-row items-center justify-between mt-3`}
                    >
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
                          {taskDetails?.data?.total_token}
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
                        <Image
                          style={tw`w-6 h-6 rounded-full`}
                          source={helpers.getImgFullUrl(
                            taskDetails?.data?.social?.icon_url
                          )}
                        />
                        <Text
                          style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                        >
                          {taskDetails?.data?.social?.name}
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
                          {helpers.formatDate(taskDetails?.data?.created_at)}
                        </Text>
                      </View>
                    </View>

                    {/* Total Cost */}
                    <View
                      style={tw`flex-row items-center justify-between pt-2`}
                    >
                      <Text
                        style={tw`font-HalyardDisplayRegular text-base text-white500`}
                      >
                        Total Cost
                      </Text>
                      <View style={tw`flex-row items-center gap-2`}>
                        {/* <SvgXml xml={IconCurrencyPrimaryColor} /> */}
                        <Text
                          style={tw`font-HalyardDisplaySemiBold text-sm text-white500`}
                        >
                          {taskDetails?.data?.country?.currency_code}
                        </Text>
                        <Text
                          style={tw`font-HalyardDisplaySemiBold text-base text-primaryBtn`}
                        >
                          {taskDetails?.data?.total_price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <PrimaryButton
                  onPress={() => handleDetailsModalClose()}
                  buttonContainerStyle={tw`mb-2`}
                  buttonText="Close"
                />
              </View>
            )}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default CompleteOrderTask;
