import { IconPrivacyPolicyScreen } from "@/assets/icons";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const PrivacyPolicy = () => {
  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="Back" onPress={() => router.back()} />
        <View style={tw`flex-row items-center gap-4 pb-4`}>
          <SvgXml xml={IconPrivacyPolicyScreen} />
          <View style={tw`gap-2`}>
            <Text
              style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}
            >
              Privacy Policy
            </Text>
            <Text style={tw`font-HalyardDisplayRegular text-xs text-subtitle`}>
              Updated July 17, 2025
            </Text>
          </View>
        </View>

        <Text style={tw`font-HalyardDisplayMedium text-xl text-white500 my-2`}>
          1. Introduction
        </Text>
        <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
          Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus
          lorem adipiscing. Convallis at mi dictumst nulla amet. Ipsum consequat
          vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
          enim dolor tristique.
        </Text>
        <Text style={tw`font-HalyardDisplayMedium text-xl text-white500 my-2`}>
          2. Information We Collect
        </Text>
        <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
          Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus
          lorem adipiscing. Convallis at mi dictumst nulla amet. Ipsum consequat
          vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
          enim dolor tristique.
        </Text>
        <Text style={tw`font-HalyardDisplayMedium text-xl text-white500 my-2`}>
          3. Data Security
        </Text>
        <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
          Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus
          lorem adipiscing. Convallis at mi dictumst nulla amet. Ipsum consequat
          vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
          enim dolor tristique.
        </Text>
      </ScrollView>
    </ViewProvider>
  );
};

export default PrivacyPolicy;
