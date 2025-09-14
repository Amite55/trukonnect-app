import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const EditTask = () => {
  const [taskType, setTaskType] = React.useState(null);

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
    <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw` flex-grow justify-between`}
      >
        <View>
          <BackTitleButton title="Completed orders" />
          {/* ============================ Select Audience ========================== */}
          <Text style={tw`font-HalyardDisplaySemiBold text-xl text-white500 `}>
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
              dropdownPosition="bottom"
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
        </View>

        <PrimaryButton
          buttonText="Save Changes"
          buttonContainerStyle={tw` w-full h-12 mb-0 mt-3`}
        />
      </ScrollView>
    </ViewProvider>
  );
};

export default EditTask;
