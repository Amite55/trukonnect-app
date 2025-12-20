import { IconGhanaCurrencyPrimaryColor } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { helpers } from "@/src/lib/helper";
import SocialListSkeleton from "@/src/lib/Skeleton/SocialListSkeleton";
import tw from "@/src/lib/tailwind";
import {
  useCreateTasksMutation,
  useGetSocialMediaListQuery,
  useLazyGetEngagementTypeQuery,
} from "@/src/redux/api/brandSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
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
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

const BuyTasks = () => {
  const [selectedId, setSelectedId] = React.useState(null);
  const [taskType, setTaskType] = React.useState<any | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [link, setLink] = React.useState("");
  const [unitPrice, setUnitPrice] = React.useState<number>(0);

  // multifunction per unit price and quantity ======================
  const price = Number(unitPrice);
  const qty = Number(quantity);
  const totalPrice = price * qty;
  const formattedTotal = totalPrice.toFixed(2);

  // ============= api end point    ==================
  const { data: socialMediaList, isLoading: isLoadingSocial } =
    useGetSocialMediaListQuery({});
  const [
    engagementType,
    {
      data: engagementTypeData,
      isLoading: isLoadingEngagementType,
      isFetching,
      error: engagementTypeError,
    },
  ] = useLazyGetEngagementTypeQuery();
  const [createTask, { isLoading: isCreateTaskLoading }] =
    useCreateTasksMutation();

  // ============== create task handler ==================
  const handleCreateTask = async () => {
    try {
      const payload = {
        description: description,
        quantity: quantity,
        link: link,
        sms_id: taskType,
        sm_id: selectedId,
      };
      const res = await createTask(payload).unwrap();
      if (res) {
        router.push({
          pathname: `/Toaster`,
          params: { res: res?.message || "Task created successfully" },
        });
      }
    } catch (error: any) {
      console.log(error, "Not created your task please try again");
      router.push({
        pathname: `/Toaster`,
        params: {
          res: error?.message || "Not created your task please try again",
        },
      });
    }
  };

  // ============== handle selected social list ================
  const handleCheckBox = useCallback(
    async (id: any) => {
      try {
        if (selectedId === id) {
          setSelectedId(null);
        } else {
          setSelectedId(id);
          setTaskType(null);
          await engagementType(id).unwrap();
        }
      } catch (error) {
        console.log(error, "User Info Storage not save ---->");
      }
    },
    [selectedId, engagementTypeData, isFetching]
  );

  // ----------------------------- task type dropdown ------------------------------
  const engagementTypeDataList = engagementTypeData?.data || [];

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
        <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 `}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw` pb-8`}
          >
            <Text
              style={tw`font-HalyardDisplayBold text-2xl text-white500 py-4`}
            >
              Buy A New Task
            </Text>
            <Text
              style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
            >
              Select a social media
            </Text>
            <View style={tw`py-4 gap-3`}>
              {isLoadingSocial ? (
                <SocialListSkeleton count={6} />
              ) : socialMediaList?.data?.length === 0 ? (
                <Text
                  style={tw`font-HalyardDisplayMedium text-base text-subtitle`}
                >
                  No Social Media Found
                </Text>
              ) : (
                socialMediaList?.data.map((item: any) => {
                  const isChecked = selectedId === item?.id;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      delayPressIn={0}
                      delayPressOut={0}
                      onPress={() => handleCheckBox(item?.id)}
                      style={tw`flex-row justify-between items-center bg-transparentBG rounded-xl py-4 px-2`}
                      key={item?.id}
                    >
                      <View style={tw`flex-row items-center gap-2`}>
                        <Image
                          style={tw`w-6 h-6 rounded-full`}
                          contentFit="cover"
                          source={helpers.getImgFullUrl(item?.icon_url)}
                        />
                        <Text
                          style={tw`font-HalyardDisplayMedium text-base text-subtitle`}
                        >
                          {item?.name}
                        </Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={1}
                        delayPressIn={0}
                        delayPressOut={0}
                        onPress={() => handleCheckBox(item?.id)}
                        style={tw.style(
                          `border border-white500 w-5 h-5  justify-center items-center rounded-full `,
                          isChecked
                            ? `bg-primaryBtn border-0`
                            : `bg-transparent`
                        )}
                      >
                        {isChecked ? (
                          <Text style={tw`text-white500 text-sm`}>✔</Text>
                        ) : null}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>

            {/* ======================== task type dropdown ===================== */}

            <Text
              style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
            >
              Task Type
            </Text>

            {/* -=--------------------------- dropdown picker --------------------------  */}
            {isFetching ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : engagementTypeDataList?.length === 0 ? (
              <View style={tw`my-4`}>
                <Text style={tw`text-center font-GucinaMedium text-gray-400`}>
                  No Engagement Type Found
                </Text>
              </View>
            ) : (
              <View style={tw`bg-inputBgColor h-14 rounded-lg  mt-3`}>
                <Dropdown
                  disable={selectedId ? false : true}
                  style={tw.style(`h-14 rounded-lg px-4 bg-inputBgColor `)}
                  placeholderStyle={tw`text-sm text-subtitle`}
                  selectedTextStyle={tw`text-base text-white500`}
                  containerStyle={tw`bg-black rounded-lg`}
                  itemTextStyle={tw`text-white`}
                  activeColor="rgba(255,255,255,0.1)"
                  placeholder="Select the engagement type"
                  data={engagementTypeDataList}
                  dropdownPosition="bottom"
                  maxHeight={300}
                  labelField="engagement_name"
                  valueField="id"
                  value={taskType}
                  onChange={(item) => {
                    setTaskType(item?.id);
                    setUnitPrice(item?.unit_price);
                  }}
                  renderItem={(item) => {
                    return (
                      <View style={tw`p-2 `}>
                        <Text style={tw`text-white text-base `}>
                          {item?.engagement_name}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            )}

            {/* =============================== quantity =============================== */}

            <Text
              style={tw`font-HalyardDisplaySemiBold text-xl text-white500 py-4`}
            >
              Quantity
            </Text>
            <View
              style={tw`flex-1 h-14  flex-row items-center px-4 rounded-lg bg-inputBgColor  gap-3`}
            >
              <TextInput
                onChangeText={(value) => setQuantity(value)}
                placeholder="Enter the number of Engagements you need"
                keyboardType="phone-pad"
                placeholderTextColor="#A4A4A4"
                style={tw`flex-1 text-white500`}
                value={quantity}
              />
            </View>

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
                placeholder="Any description about the task"
                textAlignVertical="top"
                numberOfLines={10}
                multiline
                placeholderTextColor="#A4A4A4"
                style={tw`flex-1 text-white500`}
                value={description}
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
                style={tw`flex-1 text-white500`}
                value={link}
              />
            </View>

            <View style={tw`flex-row items-center justify-between mt-6`}>
              <Text
                style={tw`font-HalyardDisplaySemiBold text-xl text-white500 py-4`}
              >
                Price
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconGhanaCurrencyPrimaryColor} />
                <Text
                  style={tw`font-HalyardDisplayMedium text-primaryBtn text-2xl`}
                >
                  {formattedTotal}
                </Text>
              </View>
            </View>

            <PrimaryButton
              loading={isCreateTaskLoading}
              buttonText="Make Payment"
              buttonContainerStyle={tw`mb-2`}
              onPress={
                () => handleCreateTask()
                // router.push(
                //   "/taskPerformerSection/withdrawProcedures/withdrawProcedure"
                // )
              }
            />
          </ScrollView>
        </ViewProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BuyTasks;
