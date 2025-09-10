import {
  IconCross,
  IconFacebook,
  IconInstagram,
  IconTiktok,
  IconTwitter,
  IconYoutube,
} from "@/assets/icons";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const SocialLinks = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleDetailsModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleDetailsModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);

  const socialLinkData = [
    {
      id: 1,
      name: "Instagram",
      icon: IconInstagram,
      link: "https://www.instagram.com/",
      status: "Verified",
    },
    {
      id: 2,
      name: "Facebook",
      icon: IconFacebook,
      link: "https://www.instagram.com/",
      status: "Pending review",
    },
    {
      id: 3,
      name: "Youtube",
      icon: IconYoutube,
      link: "https://www.instagram.com/",
      status: "Verify",
    },
    {
      id: 4,
      name: "Twitter",
      icon: IconTwitter,
      link: "https://www.instagram.com/",
      status: "Verify",
    },
    {
      id: 5,
      name: "Tiktok",
      icon: IconTiktok,
      link: "https://www.instagram.com/",
      status: "Pending review",
    },
  ];

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-4`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="Back" />
        <View style={tw`gap-2`}>
          {socialLinkData.map((item) => {
            return (
              <TouchableOpacity
                onPress={handleDetailsModalOpen}
                key={item.id}
                style={tw`flex-row items-center justify-between p-4 `}
              >
                <View style={tw`flex-row items-center gap-4`}>
                  <SvgXml width={40} height={40} xml={item.icon} />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                  >
                    {item.name}
                  </Text>
                </View>
                <Text
                  style={[
                    tw`font-HalyardDisplayMedium text-base`,
                    item?.status === "Verified" && tw`text-[#1ED960]`,
                    item?.status === "Pending review" && tw`text-[#92400E]`,
                    item?.status === "Verify" && tw`text-[#FD7701]`,
                  ]}
                >
                  {item?.status}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* =============================== edit modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={editBottomSheetModalRef}
          snapPoints={["98%"]}
          containerStyle={tw`bg-gray-500 bg-opacity-20`}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-black`}>
            <View
              style={tw`rounded-3xl bg-black px-4 py-6 flex-grow justify-between`}
            >
              <View>
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center gap-4`}>
                    <SvgXml width={40} height={40} xml={IconInstagram} />
                    <Text
                      style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                    >
                      Instagram
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDetailsModalClose()}>
                    <SvgXml xml={IconCross} />
                  </TouchableOpacity>
                </View>

                {/* =============================== name input =============================== */}

                <View style={tw``}>
                  <Text
                    style={tw`relative font-HalyardDisplaySemiBold text-xl text-white500`}
                  >
                    Username
                  </Text>
                  <Text
                    style={tw`absolute left-0 top-0 font-HalyardDisplaySemiBold text-xl text-red-500`}
                  >
                    *
                  </Text>
                </View>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};

export default SocialLinks;
