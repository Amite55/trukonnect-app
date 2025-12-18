import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useEditTasksMutation } from "@/src/redux/api/brandSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const EditTask = () => {
  const { id } = useLocalSearchParams();
  const [description, setDescription] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  // ============= api end point ---------------------
  const [editTask, { isLoading: isEditTaskLoading }] = useEditTasksMutation();

  // ============= const handels edit tasks ====================
  const handleEditTask = async () => {
    try {
      if (!description) {
        router.push({
          pathname: `/Toaster`,
          params: {
            res: "Please enter description",
          },
        });
        return;
      } else if (!link) {
        router.push({
          pathname: `/Toaster`,
          params: {
            res: "Please enter link",
          },
        });
        return;
      } else {
        const payload = {
          description: description,
          link: link,
        };
        const res = await editTask({
          id,
          data: payload,
        }).unwrap();
        if (res) {
          setDescription(" ");
          setLink(" ");
          router.push({
            pathname: `/Toaster`,
            params: { res: res?.message || "Task edited successfully" },
          });
          setTimeout(() => {
            router.replace("/taskCreator/creatorHomTabs/myTask");
          }, 2000);
        }
      }
    } catch (error: any) {
      console.log(error, "Edit task not success ------------->");
      router.push({
        pathname: `/Toaster`,
        params: {
          res: error?.message || "Edit task not success please try again",
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
        <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              tw` flex-grow justify-between`,
              isKeyboardVisible ? tw`pb-14` : tw`pb-0`,
            ]}
          >
            <View>
              <BackTitleButton title="Completed orders" />

              {/* ============================ Description ========================== */}
              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500 py-4`}
              >
                Description
              </Text>
              <View
                style={tw`flex-1 h-24  px-4 rounded-lg bg-inputBgColor  gap-3`}
              >
                <TextInput
                  onChangeText={(value) => setDescription(value)}
                  value={description}
                  placeholder="Any description about the task"
                  textAlignVertical="top"
                  numberOfLines={8}
                  multiline
                  placeholderTextColor="#A4A4A4"
                  style={tw`w-full text-white500 flex-1`}
                />
              </View>

              {/* ============================ Link ========================== */}
              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500 py-4`}
              >
                Link
              </Text>
              <View
                style={tw`flex-1 h-14 flex-row justify-between    px-4 rounded-lg bg-inputBgColor  gap-3`}
              >
                <TextInput
                  onChangeText={(value) => setLink(value)}
                  placeholder="Insert Link"
                  multiline
                  placeholderTextColor="#A4A4A4"
                  style={tw` text-white500 flex-1`}
                  value={link}
                />
              </View>
            </View>

            <PrimaryButton
              onPress={handleEditTask}
              buttonText="Save Changes"
              buttonContainerStyle={tw` w-full h-12 mb-0 mt-3`}
              loading={isEditTaskLoading}
            />
          </ScrollView>
        </ViewProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditTask;
