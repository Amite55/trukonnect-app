import { IconWarring } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const localVideo = require("@/assets/video/videos.mp4");

const YoutubeVideo = () => {
  const [completeVideo, setCompleteVideo] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);

  const player = useVideoPlayer(localVideo);

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton
          title="Watch before you convert"
          onPress={() => router.back()}
        />
        {/* --------------------- ads videos ---------------- */}
        <View style={tw`justify-center items-center w-full py-8`}>
          <VideoView
            style={tw`w-[80%] h-40 justify-center items-center`}
            player={player}
            allowsFullscreen
            contentFit="contain"
            //   source={localVideo}
            //   resizeMode="cover"
          />
        </View>

        <Text style={tw`font-HalyardDisplayRegular text-base text-white500`}>
          Please watch this short video to unlock your coin conversion.The
          convert button will be enable after watching at least 30 seconds.
        </Text>

        {completeVideo ? (
          <PrimaryButton
            onPress={() => setShowModal(true)}
            buttonText="Continue to convert"
            buttonContainerStyle={tw`w-full h-12 bg-primaryBtn mt-10 mb-4`}
          />
        ) : (
          <PrimaryButton
            //   onPress={() =>
            //     router.push("/taskPerformerSection/withdrawProcedures/purchaseTask")
            //   }
            disabled
            buttonText="Continue to convert"
            buttonContainerStyle={tw`w-full h-12 bg-inputBgColor mt-10 mb-4`}
          />
        )}

        <View style={tw`flex-row items-start gap-2 pt-6`}>
          <SvgXml xml={IconWarring} />
          <Text style={tw`font-HalyardDisplayRegular text-base text-white500`}>
            Skipping or closing the video will cancel your conversionprocess.
          </Text>
        </View>
      </ScrollView>

      {/* ========================== success modal ================ */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
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
              buttonText="Back to Wallet"
              onPress={() => {
                setShowModal(false);
                router.push("/taskPerformerSection/homeTabs/wallet");
              }}
            />
          </View>
        </View>
      </Modal>
    </ViewProvider>
  );
};

export default YoutubeVideo;
