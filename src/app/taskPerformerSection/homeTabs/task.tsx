import { IconPoint } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import { useLazyGetOngoingTaskQuery } from "@/src/redux/api/performarSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Task = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [taskData, setTaskData] = useState([]);

  // ================ api end point call ======================
  const [ongoingTasks, { isLoading, isFetching }] =
    useLazyGetOngoingTaskQuery();

  // Fetch tasks function
  const fetchTasks = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await ongoingTasks({
          page: pageNum,
          per_page: 10,
          _timestamp: Date.now(),
        });

        const newData = res?.data?.data?.data || [];
        const totalPages = res?.data?.data?.last_page || 1;

        if (isRefresh) {
          // Refresh: replace all data
          setTaskData(newData);
          setPage(1);
        } else if (pageNum === 1) {
          // Initial load or pull to refresh
          setTaskData(newData);
        } else {
          // Load more: append data
          setTaskData((prev) => [...prev, ...newData]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error) {
        console.log(error, "Error fetching ongoing tasks");
      }
    },
    [ongoingTasks]
  );

  // ============ initial render the data =====================
  useEffect(() => {
    fetchTasks(1);
  }, [fetchTasks]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTasks(1, true);
    setRefreshing(false);
  }, [fetchTasks]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchTasks(nextPage);
    }
  }, [isFetching, hasMore, page, fetchTasks]);

  // Render each task item
  const renderTaskItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/taskPerformerSection/task/taskDetails",
            params: {
              id: item?.task?.id,
            },
          })
        }
        style={tw`border border-borderColor rounded-xl px-4 shadow-lg shadow-borderColor mb-3`}
      >
        <View style={tw`flex-row items-center justify-between py-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`w-12 h-12 rounded-full`}
              source={helpers.getImgFullUrl(item?.task?.creator?.avatar)}
            />
            <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
              {item?.task?.creator?.name}
            </Text>
          </View>
          <Text
            style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
          >
            {helpers.timeAgo(item?.task?.created_at)}
          </Text>
        </View>
        <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
          {item?.task?.engagement?.engagement_name}
        </Text>

        <View style={tw`flex-row items-center gap-3 py-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconPoint} />
            <Text
              style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
            >
              500
            </Text>
          </View>
          <Image
            style={tw`w-6 h-6 rounded-full`}
            contentFit="cover"
            source={helpers.getImgFullUrl(item?.task?.social?.icon_url)}
          />
        </View>
      </TouchableOpacity>
    );
  };

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

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`font-GucinaBold text-2xl text-white500`}>
            Ongoing Task
          </Text>
          <PrimaryButton
            buttonText="History"
            buttonContainerStyle={tw`w-20 h-10`}
            buttonTextStyle={tw`text-base`}
            onPress={() =>
              router.push("/taskPerformerSection/task/taskHistory")
            }
          />
        </View>

        <FlatList
          data={taskData}
          renderItem={renderTaskItem}
          keyExtractor={(item, index) => `${item?.id || index}-${index}`}
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
    </ViewProvider>
  );
};

export default Task;
