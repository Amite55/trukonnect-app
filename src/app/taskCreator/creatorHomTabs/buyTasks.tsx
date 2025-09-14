import { IconGhanaCurrencyPrimaryColor } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import { SocialLinkData } from "@/src/Data/DataAll";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

const BuyTasks = () => {
  const [selectedId, setSelectedId] = React.useState(null);
  const [taskType, setTaskType] = React.useState(null);
  const handleCheckBox = async (id) => {
    try {
      if (selectedId === id) {
        setSelectedId(null);
      } else {
        setSelectedId(id);
      }
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };

  // ----------------------------- task type dropdown ------------------------------
  const taskTypeData = [
    {
      id: 1,
      name: "Facebook Follows",
    },
    {
      id: 2,
      name: "Facebook Likes",
    },
    {
      id: 3,
      name: "Facebook Comments",
    },
    {
      id: 4,
      name: "Facebook Shares",
    },
    {
      id: 5,
      name: "Facebook Page Likes",
    },
    {
      id: 6,
      name: "Facebook Group Likes",
    },
  ];

  const countryNameData = [
    {
      id: 1,
      name: "Ghana",
    },
    {
      id: 2,
      name: "Nigeria",
    },
  ];

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 `}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw` pb-8`}
      >
        <Text style={tw`font-HalyardDisplayBold text-2xl text-white500 py-4`}>
          Buy A New Task
        </Text>
        <Text
          style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
        >
          Select a social media
        </Text>
        <View style={tw`py-4 gap-3`}>
          {SocialLinkData.map((item, index) => {
            const isChecked = selectedId === item.id;
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                delayPressIn={0}
                delayPressOut={0}
                onPress={() => handleCheckBox(item.id)}
                style={tw`flex-row justify-between items-center bg-transparentBG rounded-xl py-4 px-2`}
                key={item.id}
              >
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml style={tw`w-6 h-6 `} xml={item.icon} />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-base text-subtitle`}
                  >
                    {item.name}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  delayPressIn={0}
                  delayPressOut={0}
                  onPress={() => handleCheckBox(item.id)}
                  style={tw.style(
                    `border border-white500 w-5 h-5  justify-center items-center rounded-full `,
                    isChecked ? `bg-primaryBtn border-0` : `bg-transparent`
                  )}
                >
                  {isChecked ? (
                    <Text style={tw`text-white500 text-sm`}>✔</Text>
                  ) : null}
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ======================== task type dropdown ===================== */}

        <Text
          style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
        >
          Task Type
        </Text>

        {/* -=--------------------------- dropdown picker --------------------------  */}
        <View style={tw`bg-inputBgColor h-14 rounded-lg  mt-3`}>
          <Dropdown
            style={tw.style(`h-14 rounded-lg px-4 bg-inputBgColor `)}
            placeholderStyle={tw`text-sm text-subtitle`}
            selectedTextStyle={tw`text-base text-white500`}
            containerStyle={tw`bg-black rounded-lg`}
            itemTextStyle={tw`text-white`}
            activeColor="rgba(255,255,255,0.1)"
            placeholder="Select the engagement type"
            data={taskTypeData}
            dropdownPosition="top"
            maxHeight={300}
            labelField="name"
            valueField="name"
            value={taskType}
            onChange={(item) => {
              setTaskType(item.name);
            }}
            renderItem={(item) => (
              <View style={tw`p-2 `}>
                <Text style={tw`text-white text-base `}>{item.name}</Text>
              </View>
            )}
          />
        </View>

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
            onChangeText={(value) => console.log(value)}
            placeholder="Enter the number of Engagements you need"
            keyboardType="phone-pad"
            placeholderTextColor="#A4A4A4"
            style={tw`w-full text-white500`}
          />
        </View>

        {/* ============================ Select Audience ========================== */}

        <Text
          style={tw`font-HalyardDisplaySemiBold text-xl text-white500 pt-4`}
        >
          Select Audience
        </Text>

        {/* -=--------------------------- country picker --------------------------  */}
        <View style={tw`bg-inputBgColor h-14 rounded-lg  mt-3`}>
          <Dropdown
            style={tw.style(`h-14 rounded-lg px-4 bg-inputBgColor `)}
            placeholderStyle={tw`text-sm text-subtitle`}
            selectedTextStyle={tw`text-base text-white500`}
            containerStyle={tw`bg-black rounded-lg`}
            itemTextStyle={tw`text-white`}
            activeColor="rgba(255,255,255,0.1)"
            placeholder="Select the country"
            data={countryNameData}
            dropdownPosition="top"
            maxHeight={300}
            labelField="name"
            valueField="name"
            value={taskType}
            onChange={(item) => {
              setTaskType(item.name);
            }}
            renderItem={(item) => (
              <View style={tw`p-2 `}>
                <Text style={tw`text-white text-base `}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        {/* ============================ Description ========================== */}

        <Text
          style={tw`font-HalyardDisplaySemiBold text-xl text-white500 py-4`}
        >
          Description
        </Text>

        <View style={tw`flex-1 h-24  px-4 rounded-lg bg-inputBgColor  gap-3`}>
          <TextInput
            onChangeText={(value) => console.log(value)}
            placeholder="Any description about the task"
            textAlignVertical="top"
            numberOfLines={8}
            multiline
            placeholderTextColor="#A4A4A4"
            style={tw`w-full text-white500`}
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
            onChangeText={(value) => console.log(value)}
            placeholder="Insert Link"
            multiline
            placeholderTextColor="#A4A4A4"
            style={tw` text-white500`}
          />

          <PrimaryButton
            buttonText="Preview Link"
            buttonTextStyle={tw`text-xs`}
            buttonContainerStyle={tw` rounded-md w-20 h-8 mb-0 mt-3`}
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
              5896.00
            </Text>
          </View>
        </View>

        <PrimaryButton
          buttonText="Make Payment"
          buttonContainerStyle={tw`mb-2`}
          onPress={() =>
            router.push(
              "/taskPerformerSection/withdrawProcedures/withdrawProcedure"
            )
          }
        />
      </ScrollView>
    </ViewProvider>
  );
};

export default BuyTasks;
