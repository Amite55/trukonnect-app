import ViewProvider from "@/src/Components/ViewProvider";
import WithdrawalHistoryCard from "@/src/Components/WithdrawalHistoryCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetDashboardHistoryQuery } from "@/src/redux/api/withdrawalSlices";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const AllWithdrawalHistory = () => {
  const [page, setPage] = useState(1);
  const [withdrawalItem, setWithdrawalItem] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ================= api and point =================
  const [withdrawalHistory, { isLoading, isFetching }] =
    useLazyGetDashboardHistoryQuery();

  // ================
  const loadData = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const response = await withdrawalHistory({
          page: pageNum,
          per_page: 10,
        }).unwrap();
        const newData = response?.data?.withdrawal_history?.data || [];
        const totalPages = response?.data?.withdrawal_history?.last_page || 1;
        if (isRefresh) {
          // Refresh: replace all data
          setWithdrawalItem(newData);
          setPage(1);
        } else if (pageNum === 1) {
          setWithdrawalItem(newData);
        } else {
          setWithdrawalItem((prevData) => [...prevData, ...newData]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error) {
        console.log(error, "data not loaded-------------->");
      }
    },
    [withdrawalHistory]
  );

  // =================== render this page ==============
  useEffect(() => {
    loadData(1);
  }, [loadData]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData(1, true);
    setRefreshing(false);
  }, [loadData]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await loadData(nextPage);
    }
  }, [isFetching, hasMore, page, loadData]);

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
    <FlatList
      data={withdrawalItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`gap-3 py-4`}
      style={tw`bg-bgBaseColor flex-1 px-4`}
      ListHeaderComponent={() => {
        return <BackTitleButton title="Withdrawal History" />;
      }}
      renderItem={({ item }: any) => {
        return (
          <WithdrawalHistoryCard
            amount={item.amount}
            date={item.created_at}
            currency_code={item?.user?.country?.currency_code}
          />
        );
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      refreshing={refreshing}
      ListEmptyComponent={renderEmptyComponent}
      showsVerticalScrollIndicator={false}
      onRefresh={handleRefresh}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

export default AllWithdrawalHistory;
