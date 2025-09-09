import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const PurchaseTask = () => {
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
            Purchase at least one task for withdrawl
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
          //   onPress={() => router.push("/taskPerformerSection/homeTabs/task")}
          buttonText="Switch to brand mode"
          buttonContainerStyle={tw`w-full h-12 mb-4`}
        />
      </ScrollView>
    </ViewProvider>
  );
};

export default PurchaseTask;
