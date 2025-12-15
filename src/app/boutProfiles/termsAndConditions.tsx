import { IconTermsAndConditionsScreen } from "@/assets/icons";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import { useGetTermsAndConditionsQuery } from "@/src/redux/api/settingsSlices";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SvgXml } from "react-native-svg";
const TermsAndConditions = () => {
  const width = useWindowDimensions();
  // ================== api end point ==================
  const { data, isLoading, isError } = useGetTermsAndConditionsQuery({});

  // ============== is loading ================
  if (isLoading) {
    return (
      <ViewProvider
        containerStyle={tw`flex-1 justify-center items-center bg-bgBaseColor px-4 pt-8`}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </ViewProvider>
    );
  }
  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="Back" onPress={() => router.back()} />
        <View style={tw`flex-row items-center gap-4 pb-4`}>
          <SvgXml xml={IconTermsAndConditionsScreen} />
          <View style={tw`gap-2`}>
            <Text
              style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}
            >
              Terms & Conditions
            </Text>
            <Text style={tw`font-HalyardDisplayRegular text-xs text-subtitle`}>
              Updated {helpers.formatDate(data.data[0].updated_at)}
            </Text>
          </View>
        </View>
        <RenderHtml
          contentWidth={width}
          source={{ html: data.data[0].terms_conditions }}
          baseStyle={{
            color: "#ffffff",
            // fontSize: 14,
          }}
        />
      </ScrollView>
    </ViewProvider>
  );
};

export default TermsAndConditions;
