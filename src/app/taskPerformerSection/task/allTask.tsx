import { IconSearch } from "@/assets/icons";
import TaskCard from "@/src/Components/TaskCard";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import TaskCardSkeletonList from "@/src/lib/Skeleton/TasksSkeletion";
import tw from "@/src/lib/tailwind";
import { useLazyGetTaskesQuery } from "@/src/redux/api/performarSlices";
import { router } from "expo-router";
import React, { JSX } from "react";
import { FlatList, RefreshControl, Text, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AllTask = () => {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  // console.log(searchValue, "this is search params ==============>");

  // ================= api end point call ======================
  const [takes, result] = useLazyGetTaskesQuery();

  const { data, isLoading: isTaskLoading, isError } = result ?? {};

  const loadMore = async () => {
    try {
      if (isTaskLoading || !hasMore) return;
      const nextPage = page + 1;
      const res = await takes({
        page: nextPage,
        per_page: 10,
        category: "",
        search: "",
        _timestamp: Date.now(),
      }).unwrap();
      const newItems = res?.data?.tasks?.data || res?.data?.data?.tasks?.data;
      if (newItems?.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
        setPage(nextPage);
        const currentPage = res?.data?.tasks?.current_page;
        const totalPages = res?.data?.tasks?.last_page;
        setHasMore(currentPage < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error, "next page no render -===========>");
    }
  };

  // ================== initial and search effect =============
  React.useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await takes({
            per_page: 10,
            page: 1,
            category: "",
            search: "",
            _timestamp: Date.now(),
          }).unwrap();
          if (isMounted) {
            const fetchedItems =
              response?.data?.tasks?.data ||
              response?.data?.data?.tasks?.data ||
              [];
            setItems(fetchedItems);
            setPage(1);

            // Reset hasMore based on new search
            const totalPages = response?.data?.tasks?.last_page || 1;
            setHasMore(1 < totalPages);
          }
        } catch (error) {
          console.error("Fetch data error:", error);
        }
      };

      fetchData();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // ================== refresh function ======================
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);
    try {
      const response = await takes({
        per_page: 10,
        page: 1,
        category: "",
        _timestamp: Date.now(),
      }).unwrap();

      const refreshedItems =
        response?.data?.tasks?.data || response?.data?.data?.tasks?.data || [];
      setItems(refreshedItems);

      const totalPages = response?.data?.tasks?.last_page || 1;
      setHasMore(1 < totalPages);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // ================== Render Empty List =====================
  const EmptyListMessage = (): JSX.Element => {
    if (isTaskLoading && !isRefreshing) {
      return <TaskCardSkeletonList dummyArray={2} />;
    }

    return (
      <View style={tw`flex-1 items-center justify-center py-10`}>
        <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
          No Task Found
        </Text>
      </View>
    );
  };
  // ============= header render ================
  const RenderHeader = () => {
    return (
      <View>
        <BackTitleButton title="Back" onPress={() => router.back()} />

        <View
          style={tw` h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3`}
        >
          <SvgXml xml={IconSearch} />
          <TextInput
            placeholder="Search by name of task creator"
            placeholderTextColor="#A4A4A4"
            style={tw`w-full text-white500 flex-1`}
            // onChangeText={(value) => setSearch(value)}
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
      </View>
    );
  };

  // ================== Render Footer =========================
  const RenderFooter = () => {
    if (!hasMore && items.length > 0) {
      return (
        <View style={tw`py-4 items-center`}>
          <Text style={tw`text-gray-400`}>No more tasks</Text>
        </View>
      );
    }

    if (isTaskLoading && items.length > 0) {
      return <TaskCardSkeletonList dummyArray={2} />;
    }

    return null;
  };
  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#0000ff"]}
            tintColor="#0000ff"
          />
        }
        // data={taksResult?.data?.tasks?.data}
        data={items}
        keyExtractor={(item: any, index: number) =>
          item?.id ? item.id.toString() : `task-${index}`
        }
        contentContainerStyle={tw`gap-3 py-4`}
        ListHeaderComponent={RenderHeader}
        renderItem={({ item }: any) => (
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
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={RenderFooter}
        ListEmptyComponent={EmptyListMessage}
      />
    </ViewProvider>
  );
};

export default AllTask;
