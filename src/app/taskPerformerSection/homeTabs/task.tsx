import { IconInstagram, IconPoint, IconSearch } from "@/assets/icons";
import { ImgFastSplash } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { useLazyGetOngoingTaskQuery } from "@/src/redux/api/performarSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Task = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [taskData, setTaskData] = useState([1, 2, 3, 4, 5]);

  // ================ api end point call ======================
  const [ongoingTasks, result] = useLazyGetOngoingTaskQuery();

  // Simulate API call for pagination
  const fetchData = async (pageNum = 1, isRefresh = false) => {
    if (loading || (!hasMore && pageNum > 1)) return;

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      if (isRefresh) {
        // Reset to initial data on refresh
        setTaskData([1, 2, 3, 4, 5]);
        setPage(1);
        setHasMore(true);
      } else if (pageNum > 1) {
        // Load more data
        const newData = Array.from(
          { length: 5 },
          (_, i) => taskData.length + i + 1
        );
        setTaskData((prev) => [...prev, ...newData]);

        // Simulate no more data after page 3
        if (pageNum >= 3) {
          setHasMore(false);
        }
      }

      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(1, true);
  };

  useEffect(() => {
    fetchData(1);

    const loadOngoingTask = async () => {
      try {
        const res = await ongoingTasks({});
        console.log(res, "this is ongoing task response ----------->");
      } catch (error) {
        console.log(error, "something wrong ------------->");
      }
    };

    loadOngoingTask();
  }, []);

  // Render each task item
  const renderTaskItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => router.push("/taskPerformerSection/task/taskDetails")}
      style={tw`border border-borderColor rounded-xl px-4 shadow-lg shadow-borderColor mb-3`}
    >
      <View style={tw`flex-row items-center justify-between py-4`}>
        <View style={tw`flex-row items-center gap-2`}>
          <Image style={tw`w-12 h-12 rounded-full`} source={ImgFastSplash} />
          <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
            Star Bucks
          </Text>
        </View>
        <Text style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}>
          13 Aug, 2025
        </Text>
      </View>
      <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
        Instagram Likes
      </Text>

      <View style={tw`flex-row items-center gap-3 py-4`}>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconPoint} />
          <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
            500
          </Text>
        </View>
        <SvgXml xml={IconInstagram} />
      </View>
    </TouchableOpacity>
  );

  // Render loading footer
  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={tw`py-4 items-center`}>
        <ActivityIndicator size="small" color="#ffffff" />
      </View>
    );
  };

  // Render empty component
  const renderEmptyComponent = () => (
    <View style={tw`py-8 items-center`}>
      <Text style={tw`text-white500 font-HalyardDisplayRegular text-base`}>
        No tasks available
      </Text>
    </View>
  );

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

        <View
          style={tw`h-12 flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3 mb-6`}
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

        <FlatList
          data={taskData}
          renderItem={renderTaskItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyComponent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={handleRefresh}
          //     colors={["#ffffff"]}
          //     tintColor="#ffffff"
          //   />
          // }
        />
      </View>
    </ViewProvider>
  );
};

export default Task;
