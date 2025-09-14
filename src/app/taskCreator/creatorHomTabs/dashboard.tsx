import {
  IconCompleteTask,
  IconHelpAndSupport,
  IconInstagram,
  IconOngoing,
  IconUserPaid,
} from "@/assets/icons";
import CreatorCounterCard from "@/src/Components/CreatorCounterCard";
import HomeProfileBar from "@/src/Components/HomeProfileBar";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Dashboard = () => {
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
        />
        {/* ======================= task info ======================= */}
        <View style={tw`gap-3`}>
          <View style={tw` flex-row  gap-2`}>
            <CreatorCounterCard
              onPress={() => {
                router.push("/taskCreator/completeOrderTask");
              }}
              icon={IconCompleteTask}
              title=" Completed Orders"
              counter={243}
            />
            <CreatorCounterCard
              onPress={() => {
                router.push("/taskCreator/ongoingOrderTask");
              }}
              icon={IconOngoing}
              title="Ongoing Orders"
              counter={243}
            />
          </View>

          <View style={tw`flex-row  gap-2`}>
            <CreatorCounterCard
              onPress={() => {
                router.push("/taskCreator/userPaid");
              }}
              icon={IconUserPaid}
              title=" Users Paid"
              counter={24}
            />
            <CreatorCounterCard
              onPress={() => {
                router.push("/boutProfiles/support");
              }}
              icon={IconHelpAndSupport}
              title="  Help & Support"
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <View
                key={index}
                style={tw`flex-row items-center justify-between p-4 bg-transparentBG rounded-2xl `}
              >
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconInstagram} />
                  <Text
                    style={tw`font-HalyardDisplayRegular text-xl text-white500`}
                  >
                    Instagram Follows
                  </Text>
                </View>
                <Text
                  style={tw`font-HalyardDisplayRegular text-primaryBtn text-xs`}
                >
                  24 /<Text style={tw`text-subtitle`}>60</Text>
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default Dashboard;
