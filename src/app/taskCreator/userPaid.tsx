import { IconMultipleUser, IconTotalToken } from "@/assets/icons";
import { ImgFourthSplash, ImgTrukonnectDashboardICon } from "@/assets/image";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const UserPaid = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`gap-3 py-4`}
      style={tw`bg-bgBaseColor flex-1 px-4`}
      ListHeaderComponent={() => {
        return (
          <View>
            <View style={tw`flex-row items-center justify-between`}>
              <BackTitleButton
                titleTextStyle={tw`font-GucinaSemiBold`}
                title="Users paid"
              />

              <Image
                style={tw`w-14 h-12`}
                source={ImgTrukonnectDashboardICon}
              />
            </View>
            <Text
              style={tw`font-HalyardDisplayMedium text-2xl text-white500 my-2`}
            >
              List of task performers who got paid
            </Text>

            <View style={tw`flex-row gap-2`}>
              <CreatorCounterCard
                counter={420}
                icon={IconMultipleUser}
                title="Total Users Paid"
                disabled
              />
              <CreatorCounterCard
                counter={6520}
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
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                Task Field
              </Text>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                Tokens
              </Text>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                Date
              </Text>
            </View>
          </View>
        );
      }}
      renderItem={({ item }) => {
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
                source={ImgFourthSplash}
              />
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                Mbappé
              </Text>
            </View>
            <Text
              style={tw`font-HalyardDisplayRegular text-primaryBtn text-xs`}
            >
              Facebook
            </Text>
            <Text style={tw`font-HalyardDisplayRegular text-subtitle text-xs`}>
              24
            </Text>
            <Text style={tw`font-HalyardDisplayRegular text-subtitle text-xs`}>
              12/01/23
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default UserPaid;
