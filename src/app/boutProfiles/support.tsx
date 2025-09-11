import { IconPlus } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Support = () => {
  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw` flex-grow justify-between`}
      >
        <View>
          <BackTitleButton title="Back" onPress={() => router.back()} />
          <Text
            style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-5`}
          >
            Support
          </Text>
          <View
            style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-12 mt-3`}
          >
            <TextInput
              onChangeText={() => {}}
              placeholder="Write your email address"
              placeholderTextColor="#A4A4A4"
              style={tw` text-white500 flex-1 px-4`}
            />
          </View>

          <Text
            style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
          >
            Describe the issue
          </Text>

          <View
            style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-28 mt-3`}
          >
            <TextInput
              multiline={true}
              textAlignVertical="top"
              onChangeText={() => {}}
              placeholder="Briefly describe about your issue"
              placeholderTextColor="#A4A4A4"
              style={tw` text-white500 flex-1  px-4`}
            />
          </View>

          <Text
            style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
          >
            Describe the issue
          </Text>

          <View style={tw`py-6 flex-row gap-4 px-2`}>
            <TouchableOpacity
              style={tw`w-24 h-32 justify-center items-center bg-secondaryBtn rounded-lg `}
            >
              <View
                style={tw`w-12 h-12  justify-center items-center bg-bgBaseColor rounded-3xl`}
              >
                <SvgXml xml={IconPlus} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          buttonText="Send"
          onPress={() => {
            router.push({ pathname: "/Toaster", params: { res: "Sent" } });
          }}
          buttonContainerStyle={tw` mb-4`}
        />
      </ScrollView>
    </ViewProvider>
  );
};

export default Support;
