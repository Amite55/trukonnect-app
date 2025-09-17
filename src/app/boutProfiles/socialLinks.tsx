import {
  IconCross,
  IconInstagram,
  IconPlus,
  IconTickMark,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { SocialLinkData } from "@/src/Data/DataAll";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const SocialLinks = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleDetailsModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleDetailsModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);

  // const socialLinkData = [
  //   {
  //     id: 1,
  //     name: "Instagram",
  //     icon: IconInstagram,
  //     link: "https://www.instagram.com/",
  //     status: "Verified",
  //   },
  //   {
  //     id: 2,
  //     name: "Facebook",
  //     icon: IconFacebook,
  //     link: "https://www.instagram.com/",
  //     status: "Pending review",
  //   },
  //   {
  //     id: 3,
  //     name: "Youtube",
  //     icon: IconYoutube,
  //     link: "https://www.instagram.com/",
  //     status: "Verify",
  //   },
  //   {
  //     id: 4,
  //     name: "Twitter",
  //     icon: IconTwitter,
  //     link: "https://www.instagram.com/",
  //     status: "Verify",
  //   },
  //   {
  //     id: 5,
  //     name: "Tiktok",
  //     icon: IconTiktok,
  //     link: "https://www.instagram.com/",
  //     status: "Pending review",
  //   },
  // ];

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-4`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="Back" />
        <View style={tw`gap-2`}>
          {SocialLinkData.map((item) => {
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
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          )}
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

                <View style={tw`flex-row items-start mt-8`}>
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                  >
                    Username
                  </Text>
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-xl text-red-500 relative -top-1`}
                  >
                    *
                  </Text>
                </View>
                <View
                  style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-12 mt-3`}
                >
                  <TextInput
                    onChangeText={() => {}}
                    placeholder="@username"
                    placeholderTextColor="#A4A4A4"
                    style={tw` text-white500 flex-1 px-4`}
                  />
                </View>

                {/* ===============================Upload picture of your profile *============================= */}
                <View style={tw`flex-row items-start mt-8`}>
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                  >
                    Upload picture of your profile
                  </Text>
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-xl text-red-500 relative -top-1`}
                  >
                    *
                  </Text>
                </View>
                <View style={tw`py-6 flex-row gap-4 px-2`}>
                  <TouchableOpacity
                    style={tw`w-24 h-32 justify-center items-center bg-secondaryBtn rounded-lg `}
                  >
                    <View
                      style={tw`w-12 h-12  justify-center items-center bg-bgBaseColor rounded-3xl`}
                    >
                      <SvgXml xml={IconPlus} />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text
                  style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                >
                  Notes (optional)
                </Text>

                <View
                  style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-28 mt-3`}
                >
                  <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    onChangeText={() => {}}
                    placeholder="Write additional note"
                    placeholderTextColor="#A4A4A4"
                    style={tw` text-white500 flex-1  px-4`}
                  />
                </View>

                <View style={tw`flex-row  items-center mt-8 gap-2`}>
                  <SvgXml xml={IconTickMark} />
                  <Text
                    style={tw`font-HalyardDisplayRegular text-base text-white500`}
                  >
                    Successfully verified by review team
                  </Text>
                </View>
              </View>

              <View>
                <PrimaryButton
                  buttonText="Cancel"
                  buttonContainerStyle={tw`w-full h-12 mb-4 bg-secondaryBtn `}
                  buttonTextStyle={tw`text-red-500`}
                  onPress={() => handleDetailsModalClose()}
                />
                <PrimaryButton
                  buttonText="Save Platform"
                  buttonContainerStyle={tw`w-full h-12 mb-1`}
                  onPress={() => {}}
                />
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ViewProvider>
  );
};

export default SocialLinks;
