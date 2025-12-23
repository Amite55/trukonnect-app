import { IconSearch } from "@/assets/icons";
import TaskCard from "@/src/Components/TaskCard";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import TaskCardSkeletonList from "@/src/lib/Skeleton/TasksSkeletion";
import tw from "@/src/lib/tailwind";
import { useLazyGetTaskesQuery } from "@/src/redux/api/performarSlices";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const AllTask = () => {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // ================= api end point call ======================
  const [takes, { data: result, isFetching, isError, isLoading }] =
    useLazyGetTaskesQuery();

  // ==================== main funcution to get data ================
  const fetchData = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await takes({
          page: pageNum,
          per_page: 10,
          category: "",
          search: searchValue,
          _timestamp: Date.now(),
        }).unwrap();
        const newDta = res?.data?.tasks?.data || [];
        const totalPages = res?.data?.tasks?.last_page || 1;
        if (isRefresh) {
          setItems(newDta);
          setPage(1);
        } else if (pageNum === 1) {
          setItems(newDta);
        } else {
          setItems((prev) => [...prev, ...newDta]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error: any) {
        console.log(error, "This Data Not Get............>");
      }
    },
    [takes, searchValue]
  );
  // ================== initial render =================
  useEffect(() => {
    fetchData(1);
  }, [takes, searchValue]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData(1, true);
    setIsRefreshing(false);
  }, [fetchData]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchData(nextPage);
    }
  }, [isFetching, hasMore, page, fetchData]);

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
        {isFetching ? (
          <TaskCardSkeletonList dummyArray={6} />
        ) : (
          <Text style={tw`text-white500 font-HalyardDisplayRegular text-base`}>
            "No tasks available"
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

  // ==================== render item ==================
  const renderItem = ({ item }: any) => {
    return (
      <TaskCard
        key={item?.id}
        profileName={item?.creator?.name}
        userImage={item?.creator?.avatar}
        date={helpers.formatDate(item?.created_at)}
        title={item?.engagement?.engagement_name}
        description={item?.description}
        total_tokens={item?.per_perform}
        task_from={item?.task_from}
        social_image={item?.social?.icon_url}
        onPress={() =>
          router.push({
            pathname: "/taskPerformerSection/task/taskDetails",
            params: { id: item?.id },
          })
        }
      />
    );
  };

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <View>
        <BackTitleButton title="Back" onPress={() => router.back()} />

        <View
          style={tw` h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3`}
        >
          <SvgXml xml={IconSearch} />
          <TextInput
            placeholder="Search by name of task creator"
            placeholderTextColor="#A4A4A4"
            style={tw`flex-1 text-white500 flex-1`}
            value={searchValue}
            onChangeText={(value) => setSearchValue(value)}
          />
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item: any, index: number) =>
          item?.id ? item.id.toString() : `task-${index}`
        }
        contentContainerStyle={tw`gap-3 py-4`}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </ViewProvider>
  );
};

export default AllTask;
