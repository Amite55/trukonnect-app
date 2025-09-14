import {
  IconCalender,
  IconGhanaFlag,
  IconInstagram,
  IconMultipleUser,
  IconPoint,
  IconTotalToken,
  IconWarring,
} from "@/assets/icons";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const MyTaskDetails = () => {
  const { status } = useLocalSearchParams();
  return (
    <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw` flex-grow justify-between`}
      >
        <View>
          <BackTitleButton title="Completed orders" />

          {status === "Completed" && (
            <View style={tw`flex-row gap-2`}>
              <CreatorCounterCard
                counter={250}
                icon={IconMultipleUser}
                title="Total Performers"
                disabled
                onPress={() => null}
              />
              <CreatorCounterCard
                counter={243}
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
            Like this post
          </Text>
          {/* Description */}
          <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
            Like the latest Star Bucks ad post on Instagram. Earn 2 tokens
            instantly for showing your support!
            {"\n"}- Tap the link
            {"\n"}- Check the profile picture
            {"\n"}- React on the post
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
                150
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
                <SvgXml xml={IconGhanaFlag} />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  Ghana
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
                  05
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
                <SvgXml xml={IconInstagram} />
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                >
                  Instagram
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
                  13 Aug, 2025
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

              <Text
                style={tw`font-HalyardDisplayRegular text-base text-blue-700`}
              >
                http//:hdurbakjdfb...
              </Text>
            </View>
          </View>

          {/* ===================== dynamic ======================= */}

          {status === "Rejected" && (
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
          {status === "Pending Verification" && (
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

          {status === "Rejected" && (
            <PrimaryButton
              buttonContainerStyle={tw`w-full h-12 mb-1`}
              buttonText="Edit the task"
              onPress={() => {
                router.push("/taskCreator/editTask");
              }}
            />
          )}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default MyTaskDetails;
