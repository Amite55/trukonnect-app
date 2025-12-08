import { IconPlus, IconPoint, IconWarring } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { useUploadImage } from "@/src/hooks/useUploadImage";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import TaskDetailsSkeleton from "@/src/lib/Skeleton/TaskDetailsSkeleton";
import tw from "@/src/lib/tailwind";
import {
  useSaveTaskesMutation,
  useSingleTaskDetailsQuery,
  useTaskesSubmittedMutation,
} from "@/src/redux/api/performarSlices";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const TaskDetails = () => {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const { pickAndUpload, uploading, urls, visibleImage } = useUploadImage({
    uploadFn,
    multiple: true,
    imgLength: 4,
  });
  // ================ api end point call ======================
  const {
    data: taskDetailsData,
    isLoading: isTaskDetailsLoading,
    isError,
  } = useSingleTaskDetailsQuery(id);
  const [saveTask, { isLoading: isSaveTaskLoading }] = useSaveTaskesMutation();
  const [submitTask, { isLoading: isSubmitTaskLoading }] =
    useTaskesSubmittedMutation();

  // -------------------- custom image picker ----------------------
  const uploadFn = async (uris: string[]) => {
    const form = new FormData();
    uris.forEach((uri, index) => {
      form.append("files", {
        uri,
        type: "image/jpeg",
        name: `photo_${index}.jpg`,
      } as any);
    });
    return form;
  };

  // ================= submit task    ====================
  const handleSubmitTask = async () => {
    try {
      const formdata = new FormData();
      formdata.append("task_id", taskDetailsData?.data?.id);
      visibleImage.forEach((uri, index) => {
        formdata.append("task_attached[]", {
          uri: uri,
          type: "image/jpeg",
          name: `image_${index}.jpg`,
        } as any);
      });
      const res = await submitTask(formdata).unwrap();
      if (res) {
        router.push({
          pathname: `/Toaster`,
          params: { res: res?.message || "Task submitted successfully" },
        });
      }
    } catch (error: any) {
      console.log(error, "task not submitted ------------->");
      router.push({
        pathname: `/Toaster`,
        params: {
          res: error?.message || "Task not submitted please try again",
        },
      });
    }
  };

  // ======================= check box handler ======================
  const [isChecked, setIsChecked] = useState();
  const handleCheckBox = async () => {
    // const newValue = !isChecked;
    try {
      const res = await saveTask({
        task_id: taskDetailsData?.data?.id,
      }).unwrap();
      if (res) {
        // setIsChecked(taskDetailsData?.data?.is_saved_by_user);
        router.push({
          pathname: `/Toaster`,
          params: { res: res?.message || "Success" },
        });
      }
    } catch (error: any) {
      console.log(error, "Mark not added please try again");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Mark not added please try again" },
      });
    }
  };

  // ================ fast render this api ======================
  useEffect(() => {
    setIsChecked(taskDetailsData?.data?.is_saved_by_user);
  }, [taskDetailsData]);

  // ================== loading state -=======================
  if (isTaskDetailsLoading) {
    return (
      <ViewProvider containerStyle={tw`flex-1 px-4`}>
        <TaskDetailsSkeleton />
      </ViewProvider>
    );
  }

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <ScrollView style={tw`flex-1`}>
        {/* Back button */}
        <BackTitleButton title="Back" onPress={() => router.back()} />
        <View
          style={tw`flex-row self-end gap-2 items-center rounded-none pr-4 pb-4`}
        >
          {isSaveTaskLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <TouchableOpacity
              onPress={() => handleCheckBox()}
              style={tw.style(
                `border border-white500 w-5 h-5  justify-center items-center rounded-sm`,
                isChecked ? `bg-primaryBtn border-0` : `bg-transparent`
              )}
            >
              {isChecked ? (
                <Text style={tw`text-white500 text-sm`}>✔</Text>
              ) : null}
            </TouchableOpacity>
          )}
          <Text style={tw`text-subtitle text-xs`}>Mark for later</Text>
        </View>

        {/* Task card */}
        <View style={tw`gap-3 bg-transparentBG p-4 rounded-xl`}>
          {/* Header */}
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              contentFit="cover"
              style={tw`w-12 h-12 rounded-full`}
              source={helpers.getImgFullUrl(
                taskDetailsData?.data?.creator?.avatar
              )}
            />
            <View>
              <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
                {taskDetailsData?.data?.creator?.name}
              </Text>
              <Text
                style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
              >
                {helpers.formatDate(taskDetailsData?.data?.created_at)}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
            {taskDetailsData?.data?.engagement?.engagement_name}
          </Text>

          {/* Description */}
          <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
            {taskDetailsData?.data?.description}
          </Text>

          {/* Tokens */}
          <View style={tw`flex-row items-center justify-between mt-3`}>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-white500`}
            >
              Total tokens
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconPoint} />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                {taskDetailsData?.data?.per_perform}
              </Text>
            </View>
          </View>

          {/* Task from */}
          <View style={tw`flex-row items-center justify-between`}>
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-white500`}
            >
              Task from
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <Image
                contentFit="cover"
                style={tw`w-6 h-6 rounded-full `}
                source={helpers.getImgFullUrl(
                  taskDetailsData?.data?.social?.icon_url
                )}
              />
              <Text
                style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
              >
                {taskDetailsData?.data?.social?.name}
              </Text>
            </View>
          </View>

          {/* Perform Task button */}
          <PrimaryButton
            onPress={() => Linking.openURL(taskDetailsData?.data?.link)}
            buttonText="Perform Task"
            buttonContainerStyle={tw`bg-secondaryBtn mt-4 mb-1`}
            buttonTextStyle={tw`text-primaryBtn`}
          />
        </View>

        {/* Proof uploader */}
        <View style={tw`mt-4`}>
          <Text style={tw`font-HalyardDisplayRegular text-base text-white500`}>
            Upload proof of completion
          </Text>
        </View>

        <View style={tw`py-4 flex-row gap-4 px-2`}>
          {visibleImage && visibleImage.length > 0
            ? visibleImage.map((uri, index) => (
                <Image
                  key={index}
                  style={tw`w-20 h-28 rounded-lg`}
                  source={{ uri }}
                />
              ))
            : null}

          {visibleImage.length <= 4 && (
            <TouchableOpacity
              onPress={() => pickAndUpload()}
              activeOpacity={0.6}
              style={tw`w-20 h-28 justify-center items-center bg-secondaryBtn rounded-lg`}
            >
              <View
                style={tw`w-12 h-12  justify-center items-center bg-bgBaseColor rounded-3xl`}
              >
                <SvgXml xml={IconPlus} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* ====================== notice ------------------ */}

        <View style={tw`flex-row justify-start gap-2`}>
          <SvgXml xml={IconWarring} />

          <Text
            numberOfLines={6}
            style={tw`flex-1 font-HalyardDisplaySemiBold text-base text-red-600`}
          >
            Note:{" "}
            <Text
              style={tw`font-HalyardDisplayRegular text-base text-white500`}
            >
              Please take screenshots of the completed tasks and upload them
              from Task section. Also add your social media account at profile
              in linked social account.
            </Text>
          </Text>
        </View>

        {/* ------------- submit button ------------- */}
        <PrimaryButton
          loading={isSubmitTaskLoading}
          buttonText="Submit Proof"
          buttonContainerStyle={tw`bg-primaryBtn my-6`}
          // onPress={() => setModalVisible(true)}
          onPress={() => handleSubmitTask()}
        />
      </ScrollView>

      {/* ========================== success modal ================ */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={tw`flex-1 justify-center items-center `}>
          <View
            style={tw`w-[90%] rounded-lg bg-gray-800 flex justify-center items-center px-4 py-4 gap-4`}
          >
            <Image style={tw`w-36 h-36`} source={ImgSuccessGIF} />
            <Text
              style={tw`text-white500 font-HalyardDisplaySemiBold text-2xl text-center`}
            >
              Success
            </Text>
            <Text
              style={tw`text-subtitle font-HalyardDisplayRegular text-base text-center`}
            >
              Your proven file added successfully. Waiting for confirmation by
              review team.
            </Text>

            <PrimaryButton
              buttonContainerStyle={tw`w-full my-2`}
              buttonText="Back to Home"
              onPress={() => {
                setModalVisible(false);
                router.push("/taskPerformerSection/homeTabs/home");
              }}
            />
          </View>
        </View>
      </Modal>
    </ViewProvider>
  );
};

export default TaskDetails;
