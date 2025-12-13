import { IconCross, IconPlus, IconTickMark, IconWarring } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import {
  useDeletedSocialAccountMutation,
  useGetAllSocialQuery,
  useSocialVerificationMutation,
} from "@/src/redux/api/profileSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const SocialLinks = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [socialLinkDetails, setSocialLinkDetails] = React.useState<any>("");
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const handleDetailsModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleDetailsModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);

  // =================== api end point ===================
  const { data: getAllSocialData, isLoading: isAllSocialDataLoading } =
    useGetAllSocialQuery({});
  const [removeSocialAccount, { isLoading: isRemoveSocialAccountLoading }] =
    useDeletedSocialAccountMutation();
  const [verifySocialAccount, { isLoading: isVerifySocialAccountLoading }] =
    useSocialVerificationMutation();

  // --------------------- get details of social link ---------------------
  const handleShowDetails = (id: any) => {
    const findSocialDetails = getAllSocialData?.data?.find(
      (item: any) => item?.id === id
    );
    if (findSocialDetails) {
      setSocialLinkDetails(findSocialDetails);
      handleDetailsModalOpen();
    }
  };

  // ===================== remove social link ====================
  const handleRemoveSocialStatus = async (id: any) => {
    try {
      const res = await removeSocialAccount(id).unwrap();
      console.log(res, "thi is id");
      if (res) {
        router.push({
          pathname: `/Toaster`,
          params: { res: res?.message || "Social status removed" },
        });
      }
      setTimeout(() => {
        handleDetailsModalClose();
      }, 1000);
    } catch (error: any) {
      console.log(error, "Social status not removed -------------->");
      router.push({
        pathname: `/Toaster`,
        params: {
          res:
            error?.message ||
            "Your social status not removed please try again ",
        },
      });
    }
  };

  // =========== handle add social verify request =================
  const handleRequestSocialVerify = async () => {
    try {
    } catch (error: any) {
      console.log(error, "Your verify request no submitted");
      router.push({
        pathname: `/Toaster`,
        params: {
          res:
            error?.message ||
            "Your verify request no submitted please try again ",
        },
      });
    }
  };

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android keyboard behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-4`}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <BackTitleButton title="Back" />

            {/* ====================== notice ------------------ */}

            <View style={tw`flex-row justify-start gap-2 pb-6`}>
              <SvgXml xml={IconWarring} />

              <Text
                numberOfLines={7}
                style={tw`flex-1 font-HalyardDisplaySemiBold text-base text-red-600`}
              >
                Note:{" "}
                <Text
                  style={tw`font-HalyardDisplayRegular text-base text-white500`}
                >
                  Linking your social media accounts is required to verify your
                  task submissions and ensure rewards are credited correctly.
                  Any linked account must have at least 100 followers to be
                  approved. If your account has fewer than 100 followers, please
                  purchase followers from TruKonnect before linking.
                </Text>
              </Text>
            </View>
            <View style={tw`gap-2`}>
              {getAllSocialData?.data.map((item: any) => {
                return (
                  <TouchableOpacity
                    // disabled={
                    //   item?.status === "verified" || item?.status === "pending"
                    // }
                    onPress={() => {
                      handleShowDetails(item?.id);
                    }}
                    key={item.id}
                    style={tw`flex-row items-center justify-between p-4 `}
                  >
                    <View style={tw`flex-row items-center gap-4`}>
                      {/* <SvgXml width={40} height={40} xml={item.icon} /> */}
                      <Image
                        style={tw`w-6 h-6 rounded-full`}
                        contentFit="cover"
                        source={helpers.getImgFullUrl(item?.social?.icon_url)}
                      />
                      <Text
                        style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                      >
                        {item?.social?.name}
                      </Text>
                    </View>
                    <Text
                      style={[
                        tw`font-HalyardDisplayMedium text-base`,
                        item?.status === "verified" && tw`text-[#1ED960]`,
                        item?.status === "pending" && tw`text-[#92400E]`,
                        item?.status === "unverified" && tw`text-[#FD7701]`,
                        item?.status === "rejected" && tw`text-[#fd1201]`,
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
              keyboardBehavior="fillParent"
              enableDynamicSizing={false}
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
              <BottomSheetScrollView style={tw`flex-1 bg-black`}>
                <View style={tw`rounded-3xl  px-4 py-6 `}>
                  {
                    <View style={tw`mb-6`}>
                      <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center gap-4`}>
                          <Image
                            style={tw`w-6 h-6 rounded-full`}
                            contentFit="cover"
                            source={helpers.getImgFullUrl(
                              socialLinkDetails?.social?.icon_url
                            )}
                          />
                          <Text
                            style={tw`font-HalyardDisplayMedium text-xl text-white500`}
                          >
                            {socialLinkDetails?.social?.name}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDetailsModalClose()}
                        >
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
                        style={tw`border border-borderColor   bg-inputBgColor rounded-xl  h-12 mt-3`}
                      >
                        {socialLinkDetails?.status === "unverified" ? (
                          <TextInput
                            onChangeText={() => {}}
                            placeholder="@username"
                            placeholderTextColor="#A4A4A4"
                            style={tw` text-white500 flex-1 px-4`}
                          />
                        ) : (
                          <Text style={tw` text-white500 flex-1 px-4 py-2 `}>
                            {socialLinkDetails?.profile_name}
                          </Text>
                        )}
                      </View>

                      {/* ===============================Upload picture of your profile *============================= */}
                      <View style={tw`flex-row items-start mt-8`}>
                        <Text
                          style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                        >
                          {socialLinkDetails?.status === "unverified"
                            ? " Uploaded picture of your profile"
                            : "Upload picture of your profile"}
                        </Text>
                        <Text
                          style={tw`font-HalyardDisplaySemiBold text-xl text-red-500 relative -top-1`}
                        >
                          *
                        </Text>
                      </View>
                      {socialLinkDetails?.status === "unverified" ? (
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
                      ) : (
                        <View style={tw`py-6 flex-row gap-4 px-2`}>
                          <Image
                            source={helpers.getImgFullUrl(
                              socialLinkDetails?.profile_image
                            )}
                            style={tw`w-24 h-32 rounded-lg`}
                            contentFit="cover"
                          />
                        </View>
                      )}
                      <Text
                        style={tw`font-HalyardDisplaySemiBold text-xl text-white500`}
                      >
                        Notes (optional)
                      </Text>

                      <View
                        style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-28 mt-3`}
                      >
                        {socialLinkDetails?.status === "unverified" ? (
                          <TextInput
                            multiline={true}
                            textAlignVertical="top"
                            onChangeText={() => {}}
                            placeholder="Write additional note"
                            placeholderTextColor="#A4A4A4"
                            style={tw` text-white500 flex-1  px-4`}
                          />
                        ) : (
                          <Text style={tw` text-white500 flex-1  py-2 px-4`}>
                            {socialLinkDetails?.note}
                          </Text>
                        )}
                      </View>

                      {/* ================ rejection reason ================ */}
                      {socialLinkDetails?.status === "rejected" && (
                        <View>
                          <Text
                            style={tw`font-HalyardDisplaySemiBold text-xl text-red-500 mt-8`}
                          >
                            Rejection Reason
                          </Text>
                          <View
                            style={tw` border-borderColor  bg-inputBgColor rounded-xl  h-28 mt-3`}
                          >
                            <Text style={tw` text-white500 flex-1  px-4`}>
                              {socialLinkDetails?.rejection_reason}
                            </Text>
                          </View>
                        </View>
                      )}
                      {socialLinkDetails?.status === "verified" && (
                        <View style={tw`flex-row  items-center mt-8 gap-2`}>
                          <SvgXml xml={IconTickMark} />
                          <Text
                            style={tw`font-HalyardDisplayRegular text-base text-white500`}
                          >
                            Successfully verified by review team
                          </Text>
                        </View>
                      )}
                      {socialLinkDetails?.status === "pending" && (
                        <View style={tw`flex-row  items-center mt-8 gap-2`}>
                          <SvgXml xml={IconWarring} />
                          <Text
                            style={tw`font-HalyardDisplayRegular text-base text-white500`}
                          >
                            Successfully verified by review team
                          </Text>
                        </View>
                      )}
                    </View>
                  }
                  {/* ======================== dynamic button   ================ */}
                  <PrimaryButton
                    loading={isRemoveSocialAccountLoading}
                    buttonText={
                      socialLinkDetails?.status === "unverified"
                        ? "Cancel"
                        : "Remove"
                    }
                    buttonContainerStyle={tw`w-full h-12 mb-2 bg-secondaryBtn `}
                    buttonTextStyle={tw`text-red-500`}
                    onPress={() => {
                      socialLinkDetails?.status === "unverified"
                        ? handleDetailsModalClose()
                        : handleRemoveSocialStatus(socialLinkDetails?.id);
                    }}
                  />
                  <PrimaryButton
                    buttonText={
                      socialLinkDetails?.status === "unverified"
                        ? "Save Platform"
                        : "Close"
                    }
                    buttonContainerStyle={tw`w-full h-12 mb-1`}
                    onPress={() => {
                      socialLinkDetails?.status === "unverified"
                        ? handleRequestSocialVerify()
                        : handleDetailsModalClose();
                    }}
                  />
                </View>
              </BottomSheetScrollView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </ViewProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SocialLinks;
