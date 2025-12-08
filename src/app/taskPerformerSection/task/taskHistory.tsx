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
import tw from "@/src/lib/tailwind";
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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const TaskHistory = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const detailsBottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Simulate API call for pagination
  const fetchData = async (pageNum = 1, isRefresh = false) => {
    if (loading || (!hasMore && pageNum > 1)) return;

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      if (isRefresh) {
        // Reset to initial data on refresh
        setData([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        setPage(1);
        setHasMore(true);
      } else if (pageNum > 1) {
        // Load more data
        const newData = Array.from(
          { length: 5 },
          (_, i) => data.length + i + 1
        );
        setData((prev) => [...prev, ...newData]);

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
  }, []);

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

  // Render each task item
  const renderTaskItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleDetailsModalOpen()}
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

      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3 py-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconPoint} />
            <Text
              style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
            >
              500
            </Text>
          </View>
          <SvgXml xml={IconInstagram} />
        </View>

        <View
          style={tw.style(
            "w-24 h-8 justify-center items-center rounded-full bg-slate-600",
            item === 2 && "bg-pendingBG",
            item === 4 && "bg-earnBG",
            item === 6 && "bg-rejectBG"
          )}
        >
          <Text
            style={tw.style(
              "font-HalyardDisplayMedium text-sm",
              item === 2 && "text-pendingText",
              item === 4 && "text-earnText",
              item === 6 && "text-rejectText"
            )}
          >
            In Review
          </Text>
        </View>
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

  // Render list empty component
  const renderEmptyComponent = () => (
    <View style={tw`py-8 items-center`}>
      <Text style={tw`text-white500 font-HalyardDisplayRegular text-base`}>
        No tasks found
      </Text>
    </View>
  );

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
          data={data}
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
        />
      </View>

      {/* =============================== filter modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["30%", "70%"]}
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

              <TouchableOpacity>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-white500 text-center`}
                >
                  All
                </Text>
              </TouchableOpacity>
              <View style={tw`h-0.5 bg-borderColor mt-2`} />
              <TouchableOpacity>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-white500 text-center`}
                >
                  Earned
                </Text>
              </TouchableOpacity>
              <View style={tw`h-0.5 bg-borderColor mt-2`} />
              <TouchableOpacity>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xl text-white500 text-center`}
                >
                  Rejected
                </Text>
              </TouchableOpacity>
              <View style={tw`h-0.5 bg-borderColor mt-2`} />
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
                <TouchableOpacity>
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
