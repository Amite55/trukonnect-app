import { ImgLogo } from "@/assets/image";
import tw from "@/src/lib/tailwind";
import * as Font from "expo-font";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Index() {
  const decideNavigation = async () => {
    try {
      setTimeout(() => {
        // router.replace("/onboardingScreen");
        router.replace("/boutProfiles/profileMenus");
      }, 3000);
    } catch (error) {
      console.log("Error in main layout:", error);
    }
  };

  useEffect(() => {
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
    loadFont();
    decideNavigation();
  }, []);

  return (
    <View
      style={[tw`bg-[#00060C] flex-1 flex-grow items-center justify-between  `]}
    >
      <View />

      <View>
        <Image source={ImgLogo} />

        <Animated.View
          entering={FadeInUp.duration(800).delay(1000)}
          style={tw`items-center mt-2`}
        >
          <Text style={tw`font-GucinaSemiBold text-2xl text-white`}>
            Trukonnect
          </Text>
          <Text style={tw`font-HalyardDisplayRegular text-sm text-primaryBtn`}>
            True Fans, real rewards
          </Text>
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
