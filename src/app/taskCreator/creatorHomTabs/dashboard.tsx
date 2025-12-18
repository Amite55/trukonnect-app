import {
  IconCalendar,
  IconCompleteTask,
  IconCurrencyPrimaryColor,
  IconHelpAndSupport,
  IconOngoing,
  IconPoint,
  IconUserPaid,
} from "@/assets/icons";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import HomeProfileBar from "@/src/Components/HomeProfileBar";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { useProfile } from "@/src/hooks/useProfile";
import { helpers } from "@/src/lib/helper";
import BrandHomeDashboardSKeleton from "@/src/lib/Skeleton/BrandHomeDashboardSKeleton";
import TaskDetailsBottomSheetSkeleton from "@/src/lib/Skeleton/TaskDetailsBottomSheetSkeleton";
import tw from "@/src/lib/tailwind";
import {
  useGetBrandHomePageQuery,
  useLazyGetMyTaskDetailsQuery,
} from "@/src/redux/api/brandSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import { SvgXml } from "react-native-svg";
const Dashboard = () => {
  const ResentTaskBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { data: profileData } = useProfile();

  // ---------------- api end point ----------------
  const { data: brandHomeData, isLoading: isBandHomeDataLoading } =
    useGetBrandHomePageQuery({});
  const [
    getRecentTaskDetails,
    { data: recentTaskDetails, isLoading: isRecentTaskDetailsLoading },
  ] = useLazyGetMyTaskDetailsQuery();

  const quantity = Number(recentTaskDetails?.data?.quantity) || 0;
  const performed = Number(recentTaskDetails?.data?.performed) || 0;
  const progress = performed > 0 ? quantity / performed : 0;

  // --------------- handle details modal ---------------
  const handleDetails = async (id: any) => {
    try {
      const response = await getRecentTaskDetails(id).unwrap();
      if (response) {
        handleResentTaskModalOpen();
      }
    } catch (error: any) {
      console.log(error, "Details not show -->");
    }
  };

  const handleResentTaskModalOpen = useCallback(async () => {
    ResentTaskBottomSheetModalRef.current?.present();
  }, []);
  const handleResentTaskModalClose = useCallback(() => {
    ResentTaskBottomSheetModalRef.current?.dismiss();
  }, []);

  // ================= loading skeleton ====================
  if (isBandHomeDataLoading) {
    return <BrandHomeDashboardSKeleton />;
  }

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------------- header profile section ----------------- */}
        <HomeProfileBar
          onPress={() => {
            router.push("/taskCreator/creatorHomTabs/profile");
          }}
          name={profileData?.data?.user?.name}
          image={profileData?.data?.user?.avatar}
        />
        {/* ======================= task info ======================= */}
        <View style={tw`gap-3`}>
          <View style={tw` flex-row  gap-2`}>
            <CreatorCounterCard
              onPress={() => {
                router.push({
                  pathname: "/taskCreator/completeOrderTask",
                  params: { type: "Completed" },
                });
              }}
              icon={IconCompleteTask}
              title=" Completed Orders"
              counter={brandHomeData?.data?.complete || 0}
            />
            <CreatorCounterCard
              onPress={() => {
                router.push({
                  pathname: "/taskCreator/completeOrderTask",
                  params: { type: "Pending" },
                });
              }}
              icon={IconOngoing}
              title="Ongoing Orders"
              counter={brandHomeData?.data?.ongoing}
            />
          </View>

          <View style={tw`flex-row  gap-2`}>
            <CreatorCounterCard
              onPress={() => {
                router.push("/taskCreator/userPaid");
              }}
              icon={IconUserPaid}
              title=" Users Paid"
              counter={brandHomeData?.data?.total_users_paid || 0}
            />
            <CreatorCounterCard
              onPress={() => {
                router.push("/boutProfiles/support");
              }}
              icon={IconHelpAndSupport}
              title=" Help & Support"
            />
          </View>
        </View>

        <PrimaryButton
          buttonText="Buy a Task"
          buttonContainerStyle={tw`bg-inputBgColor my-6`}
          buttonTextStyle={tw`font-HalyardDisplaySemiBold text-xl text-primaryBtn `}
          onPress={() => {
            router.push("/taskCreator/creatorHomTabs/buyTasks");
          }}
        />

        {/* =================== Recent Tasks =================== */}
        <Text style={tw`font-HalyardDisplayMedium text-2xl text-white500 my-2`}>
          Recent Tasks
        </Text>
        <View style={tw`gap-2`}>
          {brandHomeData?.data?.recent_tasks.map((item: any) => {
            return (
              <TouchableOpacity
                // onPress={handleResentTaskModalOpen}
                onPress={() => handleDetails(item?.id)}
                key={item?.id}
                activeOpacity={0.7}
                style={tw`flex-row items-center justify-between p-4 bg-transparentBG rounded-2xl `}
              >
                <View style={tw`flex-row items-center gap-2`}>
                  {/* <SvgXml xml={IconInstagram} /> */}
                  <Image
                    source={helpers.getImgFullUrl(item?.social?.icon_url)}
                    style={tw`w-6 h-6 rounded-full`}
                    contentFit="cover"
                  />
                  <Text
                    style={tw`font-HalyardDisplayRegular text-xl text-white500`}
                  >
                    {item?.social?.name}
                  </Text>
                </View>
                <Text
                  style={tw`font-HalyardDisplayRegular text-primaryBtn text-xs`}
                >
                  {item?.performed} /
                  <Text style={tw`text-subtitle`}>{item?.quantity}</Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {/* -------------------- Recent Tasks End --------------------  */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ResentTaskBottomSheetModalRef}
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
            {isRecentTaskDetailsLoading ? (
              <TaskDetailsBottomSheetSkeleton />
            ) : (
              <View
                style={tw`rounded-3xl bg-black px-4 py-6 flex-grow justify-between`}
              >
                <View>
                  <View style={tw`flex-row items-center gap-2 pb-4`}>
                    <Image
                      style={tw`w-12 h-12 rounded-full `}
                      source={helpers.getImgFullUrl(
                        profileData?.data?.user?.avatar
                      )}
                      contentFit="cover"
                    />
                    <View>
                      <Text
                        style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                      >
                        {profileData?.data?.user?.name}
                      </Text>
                      <Text
                        style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
                      >
                        {helpers.timeAgo(recentTaskDetails?.data?.created_at)}
                      </Text>
                    </View>
                  </View>
                  {/* Description */}
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
                  >
                    {recentTaskDetails?.data?.engagement?.description}
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
                        {recentTaskDetails?.data?.total_token}
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
                        source={helpers.getImgFullUrl(
                          recentTaskDetails?.data?.social?.icon_url
                        )}
                        style={tw`w-6 h-6 rounded-full`}
                        contentFit="cover"
                      />
                      <Text
                        style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                      >
                        {recentTaskDetails?.data?.social?.name}
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
                        {helpers.formatDate(
                          recentTaskDetails?.data?.created_at
                        )}
                      </Text>
                    </View>
                  </View>

                  {/* =========================== Progress of task  =========================== */}
                  <View style={tw`flex-row items-center justify-between `}>
                    <Text
                      style={tw`font-HalyardDisplaySemiBold text-base text-white500 `}
                    >
                      Progress of task
                    </Text>
                    <Text
                      style={tw`font-HalyardDisplayRegular text-base text-primaryBtn`}
                    >
                      {recentTaskDetails?.data?.performed}/
                      <Text style={tw`text-white500`}>
                        {recentTaskDetails?.data?.quantity}
                      </Text>
                    </Text>
                  </View>
                  {/* Total Cost */}
                  <View style={tw`flex-row items-center justify-between pt-2`}>
                    <Text
                      style={tw`font-HalyardDisplayRegular text-base text-white500`}
                    >
                      Total Cost
                    </Text>
                    <View style={tw`flex-row items-center gap-2`}>
                      <SvgXml xml={IconCurrencyPrimaryColor} />
                      <Text
                        style={tw`font-HalyardDisplaySemiBold text-base text-primaryBtn`}
                      >
                        {Number(recentTaskDetails?.data?.total_price).toFixed(
                          2
                        )}
                      </Text>
                    </View>
                  </View>

                  <View style={tw`px-4 mt-4 mb-6`}>
                    <Progress.Bar
                      color="#FD7701"
                      borderRadius={4}
                      borderWidth={0}
                      height={8}
                      progress={progress || 0}
                      unfilledColor="#333"
                      width={300}
                    />
                  </View>
                </View>
                <View style={tw`pb-2`}>
                  <PrimaryButton
                    onPress={() => handleResentTaskModalClose()}
                    buttonContainerStyle={tw`mb-0`}
                    buttonText="Close"
                  />
                </View>
              </View>
            )}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};

export default Dashboard;
