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
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const YoutubeVideo = () => {
  const { convertToken } = useLocalSearchParams();
  const [showModal, setShowModal] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [hasWatched30Seconds, setHasWatched30Seconds] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const intervalRef = useRef(null);
  const playerRef = useRef(null);

  // =================== api end point =====================
  const [tokenConvert, { isLoading: isConverting }] = useTokenConvertMutation();
  const { data: promoData, isLoading: isPromoLoading } =
    useGetAllPromoLinksQuery({});

  // ===========`========== video player handel ===========
  const player = useVideoPlayer(
    process.env.EXPO_PUBLIC_VIDEO_URL + "/" + promoData?.data[0]?.link,
    (player) => {
      player.loop = false;
      player.play();
      // ============== set custom loading to video player =================
      player.addListener("playingChange", (isPlaying) => {
        setIsPlaying(isPlaying);
        if (isPlaying) {
          setIsLoading(false);
          // Start tracking time when video starts playing
          startTimeTracking();
        } else {
          // Pause tracking when video is paused
          stopTimeTracking();
        }
      });
      // ====================== after the loading and set play video =================
      player.addListener("statusChange", (status) => {
        if (status === "readyToPlay") {
          setIsLoading(false);
          player.play();
        }
      });

      // Handle video end ============>
      player.addListener("playToEnd", () => {
        stopTimeTracking();
        // If video ends, activate button
        setHasWatched30Seconds(true);
      });

      player.addListener("progressUpdate", (progress) => {
        console.log(
          progress,
          progress,
          " player progress update state--------------->"
        );
        const timeInSeconds = progress.positionMillis / 1000;
        setCurrentTime(timeInSeconds);
        // Check if 30 seconds have been watched
        if (timeInSeconds >= 30 && !hasWatched30Seconds) {
          setHasWatched30Seconds(true);
          console.log("30 seconds watched!");
          // You can trigger your button activation here
        }
      });
    }
  );

  // Time tracking function
  const startTimeTracking = () => {
    console.log("Starting time tracking");
    stopTimeTracking(); // Clear any existing interval

    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1;
        console.log(`Time: ${newTime}s`);

        // Check if 30 seconds reached
        if (newTime >= 30 && !hasWatched30Seconds) {
          console.log("✅ 30 seconds watched!");
          setHasWatched30Seconds(true);
          // Optional: stop tracking after 30s
          stopTimeTracking();
        }

        return newTime;
      });
    }, 1000); // Update every second
  };

  const stopTimeTracking = () => {
    if (intervalRef.current) {
      console.log("Stopping time tracking");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (player && promoData) {
      setIsLoading(true);
      // Reset tracking when video changes
      setHasWatched30Seconds(false);
      setCurrentTime(0);
      stopTimeTracking();
    }

    // Cleanup on unmount
    return () => {
      stopTimeTracking();
    };
  }, [promoData]);

  // Reset when video URL changes
  useEffect(() => {
    if (promoData?.data[0]?.link) {
      console.log("Video URL changed, resetting timer");
      setCurrentTime(0);
      setHasWatched30Seconds(false);
      setIsLoading(true);
      stopTimeTracking();
    }
  }, [promoData?.data[0]?.link]);

  useEffect(() => {
    if (player && promoData) {
      setIsLoading(true);
      // Reset tracking when video changes
      setHasWatched30Seconds(false);
      setCurrentTime(0);
    }
  }, [promoData]);

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
          {isPromoLoading || isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <VideoView
              style={tw`w-[80%] h-40 justify-center items-center`}
              player={player}
              allowsFullscreen
              contentFit="contain"
              ref={playerRef}
            />
          )}

          {!isLoading && (
            <View style={tw`mt-2 w-[80%]`}>
              <Text style={tw`text-white text-xs text-center`}>
                Watched: {Math.min(currentTime, 30)}s / 30s
                {hasWatched30Seconds ? " ✅ Ready!" : ""}
              </Text>
            </View>
          )}
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
