import { IconInstagram, IconPoint, IconSearch } from "@/assets/icons";
import { ImgFastSplash } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
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

const Task = () => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-GucinaBold text-2xl text-white500`}>
            Ongoing Task
          </Text>
          <PrimaryButton
            buttonText="History"
            buttonContainerStyle={tw`w-20 h-10`}
            buttonTextStyle={tw`text-base`}
            onPress={() =>
              router.push("/taskPerformerSection/task/taskHistory")
            }
          />
        </View>

        <View
          style={tw` h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3`}
        >
          <SvgXml xml={IconSearch} />
          <TextInput
            placeholder="Search by name of task creator"
            placeholderTextColor="#A4A4A4"
            style={tw`w-full text-white500`}
            onChangeText={(value) => setSearchValue(value)}
          />
        </View>

        <View style={tw`gap-3 py-6`}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                router.push("/taskPerformerSection/task/taskDetails")
              }
              key={item}
              style={tw`border border-borderColor rounded-xl px-4 shadow-lg shadow-borderColor`}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    style={tw`w-12 h-12 rounded-full `}
                    source={ImgFastSplash}
                  />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                  >
                    Star Bucks
                  </Text>
                </View>
                <Text
                  style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
                >
                  13 Aug, 2025
                </Text>
              </View>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                Instagram Likes
              </Text>

              <View style={tw`flex-row items-center gap-3 py-4`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconPoint} />
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
                  >
                    500
                  </Text>
                </View>
                <SvgXml xml={IconInstagram} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default Task;
