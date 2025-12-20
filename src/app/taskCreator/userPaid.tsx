import { IconMultipleUser, IconTotalToken } from "@/assets/icons";
import { ImgTrukonnectDashboardICon } from "@/assets/image";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import { useLazyGetUsersPaidQuery } from "@/src/redux/api/brandSlices";
import { Image } from "expo-image";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const UserPaid = () => {
  const [paidUserData, setPaidUserData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  // =-================ api end point ==================
  const [userPaid, { data, isLoading, isFetching }] =
    useLazyGetUsersPaidQuery();

  const fetchUserPaid = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await userPaid({
          page: pageNum,
          per_page: 10,
          _timestamp: Date.now(),
        });

        const newData = res?.data?.data?.taskPerformer?.data || [];
        const totalPages = res?.data?.data?.taskPerformer?.last_page || 1;
        if (isRefresh) {
          // Refresh: replace all data
          setPaidUserData(newData);
          setPage(1);
        } else if (pageNum === 1) {
          // Initial load or pull to refresh
          setPaidUserData(newData);
        } else {
          // Load more: append data
          setPaidUserData((prev) => [...prev, ...newData]);
        }
        setHasMore(pageNum < totalPages);
      } catch (error: any) {
        console.log(error, "Notification data can't get --------->");
      }
    },
    [userPaid]
  );

  // ============ initial render the data =====================
  useEffect(() => {
    fetchUserPaid(1);
  }, [userPaid]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserPaid(1, true);
    setRefreshing(false);
  }, [fetchUserPaid]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchUserPaid(nextPage);
    }
  }, [isFetching, hasMore, page, fetchUserPaid]);

  // -------------------- render header item ---------------------
  const renderHeader = () => {
    return (
      <View>
        <View style={tw`flex-row items-center justify-between`}>
          <BackTitleButton
            titleTextStyle={tw`font-GucinaSemiBold`}
            title="Users paid"
          />

          <Image style={tw`w-14 h-12`} source={ImgTrukonnectDashboardICon} />
        </View>
        <Text style={tw`font-HalyardDisplayMedium text-2xl text-white500 my-2`}>
          List of task performers who got paid
        </Text>

        <View style={tw`flex-row gap-2`}>
          <CreatorCounterCard
            counter={data?.data?.totalUser || 0}
            icon={IconMultipleUser}
            title="Total Users Paid"
            disabled
          />
          <CreatorCounterCard
            counter={data?.data?.totalToken || 0}
            icon={IconTotalToken}
            title="Total Tokens Distributed"
            disabled
          />
        </View>

        {/* ===================== table header ===================== */}

        <View style={tw`flex-row items-center justify-between mt-10`}>
          <Text
            style={tw`pl-8 font-HalyardDisplaySemiBold text-base text-white500`}
          >
            Name
          </Text>
          <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
            Task Field
          </Text>
          <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
            Tokens
          </Text>
          <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
            Date
          </Text>
        </View>
      </View>
    );
  };

  // ======================== render list item ========================
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        delayPressIn={0}
        delayPressOut={0}
        style={tw`flex-row items-center justify-between px-3 py-4 bg-transparentBG rounded-2xl `}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <Image
            style={tw`w-8 h-8 rounded-full`}
            source={helpers.getImgFullUrl(item?.users?.avatar)}
          />
          <Text style={tw`font-HalyardDisplayRegular text-base text-white500`}>
            {item?.users?.name}
          </Text>
        </View>
        <Text style={tw`font-HalyardDisplayRegular text-primaryBtn text-xs`}>
          {item?.engagement?.engagement_name}
        </Text>
        <Text style={tw`font-HalyardDisplayRegular text-subtitle text-xs`}>
          {item?.per_perform}
        </Text>
        <Text style={tw`font-HalyardDisplayRegular text-subtitle text-xs`}>
          {helpers.formatDate(item?.created_at)}
        </Text>
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

  return (
    <FlatList
      data={paidUserData}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`gap-3 py-4`}
      style={tw`bg-bgBaseColor flex-1 px-4`}
      ListHeaderComponent={renderHeader}
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

export default UserPaid;
