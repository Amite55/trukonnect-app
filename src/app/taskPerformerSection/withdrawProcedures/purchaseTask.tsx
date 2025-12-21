import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useSwitchRoleMutation } from "@/src/redux/api/profileSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const PurchaseTask = () => {
  // ============== api end point =============
  const [roleSwitch, { isLoading: isRoleSwitchLoading }] =
    useSwitchRoleMutation();
  // ========================= handle role change =========================
  const handleRoleChange = async () => {
    try {
      const res = await roleSwitch({}).unwrap();
      if (res) {
        await AsyncStorage.setItem("role", "brand");
        await AsyncStorage.setItem("token", res?.data?.token);
        router.replace("/taskCreator/creatorHomTabs/dashboard");
      }
    } catch (error: any) {
      console.log(error, "Role Change not success, --------------->");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Something went wrong" },
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
          <BackTitleButton title="Back" onPress={() => router.back()} />
          <Text style={tw`font-HalyardDisplayMedium text-2xl text-white500`}>
            Purchase at least one task for withdrawal
          </Text>
          <Text
            numberOfLines={3}
            style={tw`font-HalyardDisplayRegular text-xl text-subtitle mt-3`}
          >
            To make your first withdrawal, you must purchase at least one task
            in Brand Mode on Trukonnect.
          </Text>
        </View>

        <PrimaryButton
          loading={isRoleSwitchLoading}
          onPress={() => handleRoleChange()}
          buttonText="Switch to brand mode"
          buttonContainerStyle={tw`w-full h-12 mb-4`}
        />
      </ScrollView>
    </ViewProvider>
  );
};

export default PurchaseTask;
