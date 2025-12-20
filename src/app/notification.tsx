import { IconDeleteRed } from "@/assets/icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import ViewProvider from "../Components/ViewProvider";
import BackTitleButton from "../lib/BackTitleButton";
import { helpers } from "../lib/helper";
import tw from "../lib/tailwind";
import {
  useDeleteAllNotificationMutation,
  useLazyGetNotificationQuery,
  useMarkAllAsReadMutation,
} from "../redux/api/notificationSlices";

const Notification = () => {
  const [notificationData, setNotificationData] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // ----------------- api end point ------------------
  const [notifications, { isLoading, isFetching }] =
    useLazyGetNotificationQuery();
  const [readNotification, { isLoading: isReadLoading }] =
    useMarkAllAsReadMutation();
  const [deleteNotification, { isLoading: isDeleteLoading }] =
    useDeleteAllNotificationMutation();

  // ============== const read all ==============
  const handleReadAll = async () => {
    try {
      const res = await readNotification({}).unwrap();
      if (res) {
        router.push({
          pathname: `/Toaster`,
          params: { res: res?.message || "Notification marked as read" },
        });
      }
    } catch (error: any) {
      console.log(error, "Please try again j------------------");
      router.push({
        pathname: `/Toaster`,
        params: {
          res: error?.message || "not worked Please try again",
        },
      });
    }
  };
  // ============== const Delete all ==============
  const handleDeleteAll = async () => {
    try {
      const res = await deleteNotification({}).unwrap();
      if (res) {
        router.push({
          pathname: `/Toaster`,
          params: { res: res?.message || "All Notification deleted" },
        });
        fetchNotification(1, true);
      }
    } catch (error: any) {
      console.log(error, "Please try again j------------------");
      router.push({
        pathname: `/Toaster`,
        params: {
          res: error?.message || "not worked Please try again",
        },
      });
    }
  };

  const fetchNotification = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await notifications({
          page: pageNum,
          per_page: 10,
          _timestamp: Date.now(),
        });
        const newData = res?.data?.data?.data || [];
        const totalPages = res?.data?.data?.last_page || 1;
        if (isRefresh) {
          // Refresh: replace all data
          setNotificationData(newData);
          setPage(1);
        } else if (pageNum === 1) {
          // Initial load or pull to refresh
          setNotificationData(newData);
        } else {
          // Load more: append data
          setNotificationData((prev) => [...prev, ...newData]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error: any) {
        console.log(error, "Notification data can't get --------->");
      }
    },
    [notifications]
  );

  // ============ initial render the data =====================
  useEffect(() => {
    fetchNotification(1);
  }, [fetchNotification]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotification(1, true);
    setRefreshing(false);
  }, [fetchNotification]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchNotification(nextPage);
    }
  }, [isFetching, hasMore, page, fetchNotification]);

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
      <View>
        {isFetching ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={tw`text-white500 font-HalyardDisplayRegular text-base`}>
            Not Found
          </Text>
        )}
      </View>
    ),
    [isFetching]
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

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        // activeOpacity={0.7}
        disabled
        style={[
          tw`flex-row items-center justify-between px-4  py-6 bg-inputBgColor rounded-2xl`,
          item?.read ? tw`bg-inputBgColor` : tw`bg-gray-700`,
        ]}
      >
        <View style={tw`flex-row items-center gap-4 flex-1`}>
          <Image
            contentFit="cover"
            style={tw`w-7 h-7 rounded-full`}
            source={helpers.getImgFullUrl(item?.avatar)}
          />
          <Text
            numberOfLines={2}
            style={tw`font-HalyardDisplayRegular text-base text-white flex-shrink flex-wrap`}
          >
            {item?.title}
          </Text>
        </View>
        <Text
          style={[
            tw`font-HalyardDisplayRegular text-xs text-subtitle   `,
            { flexShrink: 0, marginLeft: 8 },
          ]}
        >
          {helpers.timeAgo(item?.created_at)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={notificationData}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor  px-4 gap-3 py-2`}
      style={tw`flex-1 bg-bgBaseColor`}
      ListHeaderComponent={() => {
        return (
          <View>
            <View style={tw`flex-row justify-between items-center`}>
              <BackTitleButton title="Back" onPress={() => router.back()} />
              <TouchableOpacity
                onPress={handleReadAll}
                style={tw`justify-end items-end`}
              >
                <Text
                  style={tw`underline text-green-500 font-HalyardDisplayMedium text-xl items-end`}
                >
                  Read all
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`gap-4`}>
              <TouchableOpacity
                onPress={handleDeleteAll}
                style={tw`flex-row gap-2 justify-end items-end`}
              >
                <Text
                  style={tw`underline text-red-500 font-HalyardDisplayMedium text-xl items-end`}
                >
                  Delete all
                </Text>
                <SvgXml xml={IconDeleteRed} />
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyComponent}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};

export default Notification;
