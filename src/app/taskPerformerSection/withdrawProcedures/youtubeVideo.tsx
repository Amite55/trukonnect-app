import { IconWarring } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useGetAllPromoLinksQuery,
  useTokenConvertMutation,
} from "@/src/redux/api/withdrawalSlices";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useRef } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const YoutubeVideo = () => {
  const { convertToken } = useLocalSearchParams();
  const [showModal, setShowModal] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [hasWatched30Seconds, setHasWatched30Seconds] = React.useState(false);
  const playerRef = useRef(null);

  // =================== api end point =====================
  const [tokenConvert, { isLoading: isConverting }] = useTokenConvertMutation();
  const { data: promoData, isLoading: isPromoLoading } =
    useGetAllPromoLinksQuery({});

  const videoSource =
    "https://www.youtube.com/watch?v=WNeLUngb-Xg&list=RDI84mK6_iBVY&index=25";

  // ===========`========== video player handel ===========
  const player = useVideoPlayer(videoSource || "", (player) => {
    // player.loop = true;
    player.play();
    // playerRef.current = player;
  });

  // ============= token convert handel =========
  const handleConvert = async () => {
    try {
      const res = await tokenConvert({
        token: convertToken,
        _method: "PUT",
      }).unwrap();
      if (res.status) {
        setShowModal(true);
      }
    } catch (error: any) {
      console.log(error, "not converted try again.");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || "Not converted try again." },
      });
    }
  };

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
            ref={playerRef}
          />
        </View>

        <Text style={tw`font-HalyardDisplayRegular text-base text-white500`}>
          Please watch this short video to unlock your coin conversion.The
          convert button will be enable after watching at least 30 seconds.
        </Text>

        {hasWatched30Seconds ? (
          <PrimaryButton
            loading={isConverting}
            onPress={() => handleConvert()}
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
            buttonTextStyle={tw`text-gray-500`}
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
