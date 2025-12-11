import { IconCross, IconEditCamera, IconLogout } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { useProfile } from "@/src/hooks/useProfile";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import {
  useEditProfileMutation,
  useUpdateProfileImageMutation,
} from "@/src/redux/api/profileSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const EditProfile = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { data: profileData } = useProfile();
  const [nameValue, setNameValue] = useState(profileData?.data?.user?.name);

  // ''''''''''''''''''''''' api end point ''''''''''''''''''''
  const [editProfile, { isLoading: isEditProfileLoading }] =
    useEditProfileMutation();
  const [updateProfileImage, { isLoading: isUpdateProfileImageLoading }] =
    useUpdateProfileImageMutation();

  const handleEditModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleEditModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);

  // -------------------- custom image picker ----------------------

  // ==================== edit profile handler ==================== //
  const handleEditProfile = async () => {
    try {
      const res = await editProfile({
        name: nameValue,
        _method: "PUT",
      }).unwrap();
      if (res) {
        handleEditModalClose();
      }
    } catch (error: any) {
      console.log(error, "User profile not change ========>");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "User profile not change" },
      });
    }
  };

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 `}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw``}
        contentContainerStyle={tw`flex-grow justify-between`}
      >
        <View>
          <BackTitleButton title="Back" />
          <View style={tw`items-center`}>
            <View style={tw`relative`}>
              {isUpdateProfileImageLoading ? (
                <ActivityIndicator color="white" size={"large"} />
              ) : (
                <Image
                  source={helpers.getImgFullUrl(
                    profileData?.data?.user?.avatar
                  )}
                  style={tw`w-32 h-32   rounded-full border-2 border-white500`}
                  contentFit="cover"
                />
              )}
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.7}
                style={tw`absolute p-2 rounded-full bg-primaryBtn bottom-2 right-2`}
              >
                <SvgXml xml={IconEditCamera} />
              </TouchableOpacity>
            </View>
          </View>

          {/* '''''''''''''''''''''''Basic information '''''''''''''''' */}

          <Text
            style={tw`font-HalyardDisplayMedium text-2xl text-white500 pt-8`}
          >
            Basic information
          </Text>

          <View style={tw`gap-2 py-6 px-2`}>
            <View style={tw`flex-row items-center justify-between `}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
              >
                Full name
              </Text>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                {profileData?.data?.user?.name}
              </Text>
            </View>

            <View style={tw`flex-row items-center justify-between `}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
              >
                Email
              </Text>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                {profileData?.data?.user?.email}
              </Text>
            </View>

            <View style={tw`flex-row items-center justify-between `}>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-subtitle`}
              >
                Phone number
              </Text>
              <Text
                style={tw`font-HalyardDisplayRegular text-base text-white500`}
              >
                {profileData?.data?.user?.phone}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <PrimaryButton
            onPress={() => setModalVisible(true)}
            buttonText="Delete your account"
            buttonTextStyle={tw`text-red-600`}
            buttonContainerStyle={tw`mb-3 bg-red-950`}
          />
          {/* ---------------- edit profile Button ---------------- */}
          <PrimaryButton
            onPress={() => handleEditModalOpen()}
            buttonText="Edit Profile"
            buttonContainerStyle={tw`mb-3`}
          />
        </View>
      </ScrollView>

      {/* =============================== edit modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={editBottomSheetModalRef}
          snapPoints={["100%"]}
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
                  <Text
                    style={tw`font-HalyardDisplaySemiBold text-3xl text-white500`}
                  >
                    Edit Profile
                  </Text>
                  <TouchableOpacity onPress={() => handleEditModalClose()}>
                    <SvgXml xml={IconCross} />
                  </TouchableOpacity>
                </View>

                {/* =============================== name input =============================== */}
                <Text
                  style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
                >
                  Full Name
                </Text>
                <View
                  style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-12`}
                >
                  <TextInput
                    defaultValue={nameValue}
                    placeholder="Enter your full name"
                    placeholderTextColor="#A4A4A4"
                    style={tw` text-white500 flex-1 px-4`}
                    value={nameValue}
                    onChangeText={(value) => setNameValue(value)}
                  />
                </View>
              </View>

              <View style={tw`gap-3`}>
                <PrimaryButton
                  onPress={() => handleEditModalClose()}
                  buttonContainerStyle={tw`mb-2 bg-secondaryBtn`}
                  buttonTextStyle={tw`text-red-700`}
                  buttonText="Cancel"
                />

                <PrimaryButton
                  onPress={() => {
                    handleEditProfile();
                  }}
                  loading={isEditProfileLoading}
                  buttonContainerStyle={tw`mb-1`}
                  buttonText="Save Changes"
                />
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      {/* ================================ delete account modal ================================ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={tw`flex-1 justify-center items-center `}>
          <View
            style={tw`w-[90%] rounded-2xl bg-gray-800 flex justify-center items-center px-4 py-4 gap-4`}
          >
            <SvgXml width={50} height={50} xml={IconLogout} />
            <Text
              style={tw`text-red-300 text-xl font-HalyardDisplaySemiBold text-center`}
            >
              Are you sure you want to delete your account?
            </Text>
            <View style={tw`flex-row items-center  gap-3 pt-6`}>
              <PrimaryButton
                buttonContainerStyle={tw`flex-1 my-2 bg-bgBaseColor`}
                buttonText="Cancel"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <PrimaryButton
                buttonTextStyle={tw`text-red-600`}
                buttonContainerStyle={tw`flex-1 my-2 bg-red-950`}
                buttonText="Delete"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ViewProvider>
  );
};

export default EditProfile;
