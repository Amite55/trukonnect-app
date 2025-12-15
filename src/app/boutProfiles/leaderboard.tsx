import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import { useLazyGetLeaderBoardQuery } from "@/src/redux/api/leaderBoardSlices";
import { Image } from "expo-image";
import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

const Leaderboard = () => {
  const [page, setPage] = React.useState(1);
  const [leadersData, setLeadersData] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // ==================== const ===============
  const [getLeaderBoard, { data, isLoading, isFetching }] =
    useLazyGetLeaderBoardQuery();

  const loadLeaderboard = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await getLeaderBoard({
          page: pageNum,
          per_page: 10,
          _timestamp: Date.now(),
        }).unwrap();
        const newData = res?.data?.leaderboard?.data || [];
        const totalPages = res?.data?.leaderboard?.last_page || 1;
        if (isRefresh) {
          setLeadersData(newData);
          setPage(1);
        } else if (pageNum === 1) {
          setLeadersData(newData);
          // setPage(1);
        } else {
          setLeadersData((prevData) => [...prevData, ...newData]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error: any) {
        console.log(error, "Error fetching ongoing tasks");
      }
    },
    [getLeaderBoard]
  );

  // ===================== initial render ================
  useEffect(() => {
    loadLeaderboard(1);
  }, [getLeaderBoard]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadLeaderboard(1, true);
    setIsRefreshing(false);
  }, [loadLeaderboard]);

  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
      await loadLeaderboard(page + 1);
    }
  }, [isFetching, hasMore, page, loadLeaderboard]);

  const RenderHeader = () => {
    return (
      <View>
        <BackTitleButton title="Back" />

        <View style={tw`gap-3 bg-transparentBG p-4 rounded-2xl`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}>
              Your Rank
            </Text>
            <Text
              style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}
            >
              #{data?.data?.current_user?.rank}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-HalyardDisplayMedium text-base text-subtitle`}>
              Task Verified
            </Text>
            <Text style={tw`font-HalyardDisplayMedium text-base text-subtitle`}>
              {data?.data?.current_user?.completed_tasks}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-4`}>
      <FlatList
        data={leadersData}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={tw`gap-4 py-4`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshing={isRefreshing}
        ListHeaderComponent={RenderHeader}
        renderItem={({ item = {}, index }: any) => {
          return (
            <View
              style={tw`flex-row justify-between items-center border border-borderColor p-4 rounded-2xl`}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <Text
                  style={[
                    tw`font-HalyardDisplayMedium text-base ${
                      item.rank ? `text-primaryBtn` : `text-subtitle`
                    }`,
                  ]}
                >
                  # {item.rank ? item.rank : index + 1}
                </Text>
                <Image
                  style={tw`w-6 h-6 rounded-full `}
                  source={helpers.getImgFullUrl(item.avatar)}
                />
                <Text
                  style={[tw`font-HalyardDisplayMedium text-base text-white`]}
                >
                  {item?.name} {index + 1 <= 3 && "🥇"}
                </Text>
              </View>
              <Text
                style={[tw`font-HalyardDisplayMedium text-base text-subtitle`]}
              >
                {item?.completed_tasks}
              </Text>
            </View>
          );
        }}
      />
    </ViewProvider>
  );
};

export default Leaderboard;
