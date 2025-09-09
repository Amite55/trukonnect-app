import { IconKey, IconRightArrowMenu } from "@/assets/icons";
import { ImgFastSplash } from "@/assets/image";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ProfileMenu = () => {
  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="My Profile" onPress={() => router.back()} />

        <TouchableOpacity
          style={tw`flex-row items-center gap-4 bg-inputBgColor p-4 rounded-2xl`}
        >
          <Image style={tw`w-14 h-14 rounded-full `} source={ImgFastSplash} />
          <View style={tw`gap-2`}>
            <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
              Daniel
            </Text>
            <Text style={tw`font-HalyardDisplayRegular text-sm text-subtitle`}>
              daniel245@gmail.com
            </Text>
          </View>
        </TouchableOpacity>

        {/* -------------------- profile menu section ---------------- */}
        <View style={tw`py-4 gap-4`}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between p-4 bg-inputBgColor rounded-2xl `}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconKey} />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-subtitle`}
              >
                Change Password
              </Text>
            </View>

            <SvgXml xml={IconRightArrowMenu} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default ProfileMenu;
