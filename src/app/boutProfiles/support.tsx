import { IconCross, IconPlus } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useOpenTicketMutation } from "@/src/redux/api/ticketSlices";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect } from "react";
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

const Support = () => {
  const [subject, setSubject] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(
    null
  );
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  // ====================== api end point =====================
  const [sendSupport, { isLoading }] = useOpenTicketMutation();

  const handleSendSupport = async () => {
    try {
      if (!subject) {
        router.push({
          pathname: `/Toaster`,
          params: {
            res: "Please Enter Email",
          },
        });
        return;
      } else if (!reason) {
        router.push({
          pathname: `/Toaster`,
          params: {
            res: "Please Enter Describe your problem or link;",
          },
        });
        return;
      } else if (!image) {
        router.push({
          pathname: `/Toaster`,
          params: {
            res: "Add your document",
          },
        });
        return;
      } else {
        let filename = image.fileName;
        if (!filename) {
          const uriParts = image.uri.split("/");
          filename = uriParts[uriParts.length - 1];
        }
        const ext = filename.split(".").pop()?.toLowerCase();
        let mimeType = "image/jpeg";
        if (ext === "jpg" || ext === "jpeg") {
          mimeType = "image/jpeg";
        } else if (ext === "png") {
          mimeType = "image/png";
        } else if (ext === "gif") {
          mimeType = "image/gif";
        }
        const uri = image.uri;
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("reason", reason);
        formData.append("attachment", {
          uri,
          type: mimeType,
          name: filename,
        } as any);
        // console.log(formData?._parts[2], "hare is the file name");
        const res = await sendSupport(formData).unwrap();
        if (res) {
          router.push({
            pathname: `/Toaster`,
            params: { res: "Send support success" },
          });
          setSubject("");
          setReason("");
          setImage(null);
        }
      }
    } catch (error: any) {
      console.log(error, "Send support not success ->>");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Send support not success" },
      });
    }
  };

  // ================= picked up image ---------------------
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        // aspect: [],
        quality: 1,
        selectionLimit: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImage(selectedImage);
      } else {
        setImage(null);
        console.log("Image selection cancelled");
      }
    } catch (error: any) {
      console.log(error, "Image not updated===>");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Image not updated" },
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
        <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 pt-8`}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              tw` flex-grow justify-between  `,
              isKeyboardVisible && tw`pb-16`,
            ]}
          >
            <View>
              <BackTitleButton title="Back" onPress={() => router.back()} />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-5`}
              >
                Subject
              </Text>
              <View
                style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-12 mt-3`}
              >
                <TextInput
                  onChangeText={(value) => {
                    setSubject(value);
                  }}
                  placeholder="Write your subject"
                  placeholderTextColor="#A4A4A4"
                  style={tw` text-white500 flex-1 px-4`}
                  value={subject}
                />
              </View>

              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
              >
                Describe the issue
              </Text>

              <View
                style={tw`border border-borderColor  bg-inputBgColor rounded-xl  h-28 mt-3`}
              >
                <TextInput
                  multiline={true}
                  textAlignVertical="top"
                  value={reason}
                  onChangeText={(value) => {
                    setReason(value);
                  }}
                  placeholder="Briefly describe your issue"
                  placeholderTextColor="#A4A4A4"
                  style={tw` text-white500 flex-1  px-4`}
                />
              </View>

              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
              >
                Attach Screenshots of the Issue
              </Text>

              <View style={tw`py-6 flex-row gap-4 px-2`}>
                {image?.uri ? (
                  <View style={tw`relative`}>
                    <Image
                      source={{ uri: image?.uri }}
                      style={tw`w-24 h-32 rounded-lg`}
                    />
                    <TouchableOpacity
                      style={tw`absolute top-1 right-1 `}
                      onPress={() => setImage(null)}
                    >
                      <SvgXml width={16} xml={IconCross} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={pickImage}
                    activeOpacity={0.7}
                    style={tw`w-24 h-32 justify-center items-center bg-secondaryBtn rounded-lg `}
                  >
                    <View
                      style={tw`w-12 h-12  justify-center items-center bg-bgBaseColor rounded-3xl`}
                    >
                      <SvgXml xml={IconPlus} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <PrimaryButton
              loading={isLoading}
              buttonText="Send"
              onPress={() => {
                handleSendSupport();
              }}
              buttonContainerStyle={tw` mb-4`}
            />
          </ScrollView>
        </ViewProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Support;
