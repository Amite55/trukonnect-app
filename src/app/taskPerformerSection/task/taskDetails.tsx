import {
  IconInstagram,
  IconPlus,
  IconPoint,
  IconWarring,
} from "@/assets/icons";
import {
  ImgCompleteTaskSOS,
  ImgFastSplash,
  ImgSuccessGIF,
} from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const TaskDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <ScrollView style={tw`flex-1`}>
        {/* Back button */}
        <BackTitleButton title="Back" onPress={() => router.back()} />

        {/* Task card */}
        <View style={tw`gap-3 bg-transparentBG p-4 rounded-xl`}>
          {/* Header */}
          <View style={tw`flex-row items-center gap-2`}>
            <Image style={tw`w-12 h-12 rounded-full`} source={ImgFastSplash} />
            <View>
              <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
                Star Bucks
              </Text>
              <Text
                style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
              >
                13 Aug, 2025
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
            Instagram Likes
          </Text>

          {/* Description */}
          <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
            Like the latest Star Bucks ad post on Instagram. Earn 2 tokens
            instantly for showing your support!
            {"\n"}- Tap the link
            {"\n"}- Check the profile picture
            {"\n"}- React on the post
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
                200
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
              <SvgXml xml={IconInstagram} />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                Instagram
              </Text>
            </View>
          </View>

          {/* Perform Task button */}
          <PrimaryButton
            buttonText="Perform Task"
            buttonContainerStyle={tw`bg-secondaryBtn mt-4 mb-1`}
            buttonTextStyle={tw`text-primaryBtn`}
          />
        </View>

        {/* Proof uploader */}
        <View style={tw`mt-4`}>
          <Text style={tw`font-HalyardDisplayRegular text-base text-white500`}>
            Upload proof of completion
          </Text>
        </View>

        <View style={tw`py-4 flex-row gap-4 px-2`}>
          <Image style={tw`w-20 h-28 rounded-lg`} source={ImgCompleteTaskSOS} />

          <TouchableOpacity
            style={tw`w-20 h-28 justify-center items-center bg-secondaryBtn rounded-lg`}
          >
            <View
              style={tw`w-12 h-12  justify-center items-center bg-bgBaseColor rounded-3xl`}
            >
              <SvgXml xml={IconPlus} />
            </View>
          </TouchableOpacity>
        </View>

        {/* ====================== notice ------------------ */}

        <View style={tw`flex-row justify-start gap-2`}>
          <SvgXml xml={IconWarring} />

          <Text
            numberOfLines={6}
            style={tw`flex-1 font-HalyardDisplaySemiBold text-base text-red-600`}
          >
            Note:{" "}
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-white500`}
            >
              Please take screenshots of the completed tasks and upload them
              from Task section. Also add your social media account at profile
              in linked social account.
            </Text>
          </Text>
        </View>

        {/* ------------- submit button ------------- */}
        <PrimaryButton
          buttonText="Submit Proof"
          buttonContainerStyle={tw`bg-primaryBtn my-6`}
          onPress={() => setModalVisible(true)}
        />
      </ScrollView>

      {/* ========================== success modal ================ */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={tw`flex-1 justify-center items-center `}>
          <View
            style={tw`w-[90%] rounded-lg bg-gray-800 flex justify-center items-center px-4 py-4 gap-4`}
          >
            <Image style={tw`w-36 h-36`} source={ImgSuccessGIF} />
            <Text
              style={tw`text-white500 font-HalyardDisplaySemiBold text-2xl text-center`}
            >
              Success
            </Text>
            <Text
              style={tw`text-subtitle font-HalyardDisplayRegular text-base text-center`}
            >
              Your proven file added successfully. Waiting for confirmation by
              review team.
            </Text>

            <PrimaryButton
              buttonContainerStyle={tw`w-full my-2`}
              buttonText="Back to Home"
              onPress={() => {
                setModalVisible(false);
                router.push("/taskPerformerSection/homeTabs/home");
              }}
            />
          </View>
        </View>
      </Modal>
    </ViewProvider>
  );
};

export default TaskDetails;
