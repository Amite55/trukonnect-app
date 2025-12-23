import { IconRightArrow } from "@/assets/icons";
import {
  ImgFastSplash,
  ImgFourthSplash,
  ImgSecondSplash,
  ImgThirdSplash,
} from "@/assets/image";
import { BaseColor, PrimaryColor } from "@/utils/utils";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const OnboardingScreen = () => {
  const [index, setIndex] = React.useState(0);

  //  handle fast onboarding ---------------
  const handleDone = () => {
    router.replace("/auth/roleScreen");
  };

  const handleCompleteButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.replace("/auth/roleScreen");
        }}
        style={tw`mr-4 w-14 h-12 items-center justify-center rounded-full bg-primaryBtn`}
      >
        <SvgXml xml={IconRightArrow} />
      </TouchableOpacity>
    );
  };

  const dotComponent = ({ selected }: { selected: boolean }) => {
    const colors = [PrimaryColor, "#FFFFFF"];
    const dotColor = selected ? colors[index] : "#FFF";
    return (
      <View
        style={[
          tw`mx-1`,
          {
            width: selected ? 16 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: dotColor,
          },
        ]}
      />
    );
  };

  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      <Onboarding
        style={tw`bg-bgBaseColor`}
        bottomBarColor="#00060C"
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={handleCompleteButton}
        // NextButtonComponent={doneButton}
        onPageChange={(index: number) => setIndex(index)}
        DotComponent={dotComponent}
        pages={[
          {
            backgroundColor: BaseColor,
            image: (
              <View style={tw`px-6  `}>
                <View style={tw`relative items-center my-16`}>
                  <Image style={tw`w-11/12 h-96`} source={ImgFastSplash} />
                </View>
                <View>
                  <Text
                    style={tw` font-GucinaBold text-2xl text-primaryBtn text-center`}
                  >
                    Earn money
                    <Text style={tw`text-white500`}>
                      {" "}
                      by completing social media task.
                    </Text>
                  </Text>
                </View>
              </View>
            ),
            title: "",
            subtitle: ".",
          },

          {
            backgroundColor: BaseColor,
            image: (
              <View style={tw`px-6  `}>
                <View style={tw`relative items-center my-16`}>
                  <Image style={tw`w-11/12 h-96`} source={ImgSecondSplash} />
                </View>
                <View>
                  <Text
                    style={tw` font-GucinaBold text-2xl text-primaryBtn text-center`}
                  >
                    Complete task
                    <Text style={tw`text-white500`}> anytime, anywhere.</Text>
                  </Text>
                </View>
              </View>
            ),
            title: "",
            subtitle: ".",
          },

          {
            backgroundColor: BaseColor,
            image: (
              <View style={tw`px-6  `}>
                <View style={tw`relative items-center my-16`}>
                  <Image style={tw`w-11/12 h-96`} source={ImgThirdSplash} />
                </View>
                <View>
                  <Text
                    style={tw` font-GucinaBold text-2xl text-primaryBtn text-center`}
                  >
                    Get authentic
                    <Text style={tw`text-white500`}>
                      {" "}
                      social media engagements from real users.
                    </Text>
                  </Text>
                </View>
              </View>
            ),
            title: "",
            subtitle: ".",
          },

          {
            backgroundColor: BaseColor,
            image: (
              <View style={tw`px-6  `}>
                <View style={tw`relative items-center my-16`}>
                  <Image style={tw`w-11/12 h-96`} source={ImgFourthSplash} />
                </View>
                <View>
                  <Text
                    style={tw` font-GucinaBold text-2xl text-white500 text-center`}
                  >
                    Withdraw tokens in your
                    <Text style={tw`text-primaryBtn`}> local currency.</Text>
                  </Text>
                </View>
              </View>
            ),
            title: "",
            subtitle: ".",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
