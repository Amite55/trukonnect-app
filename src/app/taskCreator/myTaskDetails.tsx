import {
  IconCalender,
  IconMultipleUser,
  IconPoint,
  IconTotalToken,
  IconWarring,
} from "@/assets/icons";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import TaskDetailsSkeleton from "@/src/lib/Skeleton/TaskDetailsSkeleton";
import tw from "@/src/lib/tailwind";
import { useGetMyTaskDetailsQuery } from "@/src/redux/api/brandSlices";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const MyTaskDetails = () => {
  const { id } = useLocalSearchParams();

  // ================ api end point ==================
  const { data: myTaskDetailsData, isLoading: isMyTaskDetailsLoading } =
    useGetMyTaskDetailsQuery(id);

  if (isMyTaskDetailsLoading) {
    return <TaskDetailsSkeleton />;
  }
  // ====================== handle open link ======================
  const handleOpenLink = (link: any) => {
    Linking.openURL(link);
  };

  // ============ onLong press handle =================
  const handleCopyLink = async (link: any) => {
    const success = await Clipboard.setStringAsync(link);
    if (success) {
      router.push({
        pathname: "/Toaster",
        params: {
          res: "Copied to clipboard",
        },
      });
    }
  };

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw` flex-grow justify-between`}
      >
        <View>
          <BackTitleButton
            title={
              myTaskDetailsData?.data?.status === "pending"
                ? "Pending Order"
                : myTaskDetailsData?.data?.status === "completed"
                ? "Completed Order"
                : myTaskDetailsData?.data?.status === "rejected"
                ? "Rejected Order"
                : "My Order Details"
            }
          />

          {myTaskDetailsData?.data?.status === "completed" && (
            <View style={tw`flex-row gap-2`}>
              <CreatorCounterCard
                counter={myTaskDetailsData?.data?.performed || 0}
                icon={IconMultipleUser}
                title="Total Performers"
                disabled
                onPress={() => null}
              />
              <CreatorCounterCard
                counter={myTaskDetailsData?.data?.token_distributed || 0}
                icon={IconTotalToken}
                title="Total Tokens Distributed"
                disabled
                onPress={() => null}
              />
            </View>
          )}

          {/* ====================== task info ======================= */}

          <Text
            style={tw`font-HalyardDisplaySemiBold text-base text-white500 mt-4 mb-2`}
          >
            {myTaskDetailsData?.data?.engagement?.engagement_name}
          </Text>
          {/* Description */}
          <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
            {myTaskDetailsData?.data?.engagement?.description}
          </Text>
          <View>
            {/* -==================== qauantity ===================== */}
            <View style={tw`flex-row items-center justify-between mt-3`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Quantity
              </Text>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                {myTaskDetailsData?.data?.quantity}
              </Text>
            </View>
            {/* -==================== Selected Audience ===================== */}
            <View style={tw`flex-row items-center justify-between mt-3`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Selected Audience
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                {/* <SvgXml xml={IconGhanaFlag} /> */}
                <Image
                  style={tw`w-6 h-6 rounded-full`}
                  contentFit="cover"
                  source={helpers.getImgFullUrl(
                    myTaskDetailsData?.data?.country?.flag
                  )}
                />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  {myTaskDetailsData?.data?.country?.name}
                </Text>
              </View>
            </View>
            {/* -==================== Per user earned Tokens==================== */}
            <View style={tw`flex-row items-center justify-between mt-3`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Per user earned Tokens
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconPoint} />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  {myTaskDetailsData?.data?.per_perform}
                </Text>
              </View>
            </View>
            {/* -====================Platform ==================== */}
            <View style={tw`flex-row items-center justify-between mt-3`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Platform
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                {/* <SvgXml xml={IconInstagram} /> */}
                <Image
                  style={tw`w-6 h-6 rounded-full`}
                  contentFit="cover"
                  source={helpers.getImgFullUrl(
                    myTaskDetailsData?.data?.social?.icon_url
                  )}
                />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  {myTaskDetailsData?.data?.social?.name}
                </Text>
              </View>
            </View>
            {/* -==================== Created Date  ==================== */}
            <View style={tw`flex-row items-center justify-between mt-3`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Created Date
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconCalender} />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  {helpers.formatDate(myTaskDetailsData?.data?.created_at)}
                </Text>
              </View>
            </View>

            {/* -====================Link  ==================== */}
            <View style={tw`flex-row items-center justify-between mt-3`}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Link
              </Text>

              <TouchableOpacity
                onPress={() => handleOpenLink(myTaskDetailsData?.data?.link)}
                onLongPress={() =>
                  handleCopyLink(myTaskDetailsData?.data?.link)
                }
                delayLongPress={400}
                activeOpacity={0.6}
              >
                <Text
                  style={tw`font-HalyardDisplayRegular text-base text-blue-700`}
                >
                  {myTaskDetailsData?.data?.link?.length <= 25
                    ? myTaskDetailsData?.data?.link
                    : myTaskDetailsData?.data?.link?.slice(0, 25) + "..."}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ===================== dynamic ======================= */}

          {myTaskDetailsData?.data?.status === "rejected" && (
            <View>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500 mt-6 mb-2`}
              >
                Message from review team
              </Text>

              <Text
                numberOfLines={2}
                style={tw`border border-borderColor px-4 py-2 rounded-xl text-subtitle`}
              >
                Your required link is not correct. Please check the link &
                create again.
              </Text>
            </View>
          )}
        </View>

        <View style={tw`pb-3`}>
          {myTaskDetailsData?.data?.status === "pending" && (
            <View
              style={tw`flex-row items-center gap-2 border border-borderColor px-4 py-2 rounded-2xl`}
            >
              <SvgXml xml={IconWarring} />
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Waiting for confirmation by Review Team
              </Text>
            </View>
          )}

          {myTaskDetailsData?.data?.status === "rejected" && (
            <PrimaryButton
              buttonContainerStyle={tw`w-full h-12 mb-1`}
              buttonText="Edit the task"
              onPress={() => {
                router.push({
                  pathname: "/taskCreator/editTask",
                  params: { id: myTaskDetailsData?.data?.id },
                });
              }}
            />
          )}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default MyTaskDetails;
