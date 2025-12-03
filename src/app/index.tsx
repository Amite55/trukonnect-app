import { ImgLogo } from "@/assets/image";
import tw from "@/src/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useRole } from "../hooks/useRole";
import { useSingUpMutation } from "../redux/api/authSlices";
import { useGetMyProfileQuery } from "../redux/api/profileSlices";

export default function Index() {
  const role = useRole();
  // --------------------- api end point ---------------------
  const {
    data: userProfileInfo,
    isError,
    isLoading,
    error,
  } = useGetMyProfileQuery({});
  const [singOut] = useSingUpMutation();

  // ==================   handle sing out ==================
  const handleSingOut = async () => {
    try {
      const res = await singOut({});
      if (res) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        router.replace("/onboardingScreen");
      }
    } catch (error: any) {
      console.log("Error in sing out:", error);
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Logout failed" },
      });
    }
  };

  const decideNavigation = async () => {
    if (isLoading) return;
    try {
      if (isError) {
        console.log("Token invalid or profile fetch failed:", error);
        handleSingOut();
        return;
      }
      if (userProfileInfo?.status === true) {
        const token = await AsyncStorage.getItem("token");
        if (!role) {
          return handleSingOut();
        }
        if (token) {
          if (role === "brand") {
            router.replace("/taskCreator/creatorHomTabs/dashboard");
          } else if (role === "performer") {
            router.replace("/taskPerformerSection/homeTabs/home");
          }
        }
      } else {
        handleSingOut();
      }
    } catch (error) {
      console.log("Error in main layout:", error);
    }
  };

  // =============================== font loader ===============================

  const loadFont = async () => {
    await Font.loadAsync({
      // =========================== font gucina ===========================
      GucinaBold: require("@/assets/fonts/Gucina-Bold.otf"),
      GucinaMedium: require("@/assets/fonts/Gucina-Medium.otf"),
      GucinaRegular: require("@/assets/fonts/Gucina-Regular.otf"),
      GucinaSemiBold: require("@/assets/fonts/Gucina-SemiBold.otf"),

      //  ============================== font halyard  ==============================
      HalyardDisplayBold: require("@/assets/fonts/fonnts.com-Halyard_Display_Bold.otf"),
      HalyardDisplayLight: require("@/assets/fonts/fonnts.com-Halyard_Display_Light.otf"),
      HalyardDisplayMedium: require("@/assets/fonts/fonnts.com-Halyard_Display_Medium.otf"),
      HalyardDisplayRegular: require("@/assets/fonts/fonnts.com-Halyard_Display_Regular.otf"),
      HalyardDisplaySemiBold: require("@/assets/fonts/fonnts.com-Halyard_Display_SemiBold.otf"),
      HalyardMicroBookRegular: require("@/assets/fonts/fonnts.com-Halyard_Micro_Book_Regular.otf"),
      HalyardTextBold: require("@/assets/fonts/fonnts.com-Halyard_Text_Bold.otf"),
      HalyardTextLight: require("@/assets/fonts/fonnts.com-Halyard_Text_Light.otf"),
      HalyardTextMedium: require("@/assets/fonts/fonnts.com-Halyard_Text_Medium.otf"),
      HalyardTextRegular: require("@/assets/fonts/fonnts.com-Halyard_Text_Regular.otf"),
    });
  };

  useEffect(() => {
    loadFont();
    const timer = setTimeout(() => {
      decideNavigation();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading, isError, userProfileInfo]);

  return (
    <View
      style={[tw`bg-[#00060C] flex-1 flex-grow items-center justify-between  `]}
    >
      <View />

      <View style={tw`justify-center items-center`}>
        <Image style={tw`w-36 h-24`} contentFit="contain" source={ImgLogo} />

        <Animated.View
          entering={FadeInUp.duration(800).delay(1000)}
          style={tw`items-center mt-2  px-4`}
        >
          <Text
            style={tw`font-GucinaRegular text-xl text-white px-4 text-center`}
          >
            Trukonnect
          </Text>
          <Text
            style={tw`font-HalyardDisplayRegular text-sm text-primaryBtn text-center`}
          >
            True Fans, real rewards
          </Text>
          {isLoading && (
            <ActivityIndicator size="small" color="#FFFFFF" style={tw`mt-2`} />
          )}
        </Animated.View>
      </View>

      <Text
        style={tw`font-HalyardDisplayRegular text-base text-primaryBtn text-center pb-4`}
      >
        @Trukonnect.club
      </Text>
    </View>
  );
}
