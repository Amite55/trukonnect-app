import { IconCamera } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
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
import { SvgXml } from "react-native-svg";

const WithdrawProcedure = () => {
  const [saveCard, setSaveCard] = React.useState(true);

  const handleCheckBox = async () => {
    setSaveCard(!saveCard);
    try {
      // await AsyncStorage.setItem("check", JSON.stringify(isChecked));
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4 pt-3 bg-bgBaseColor`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw` flex-grow justify-between`}
      >
        <View>
          <BackTitleButton
            title="Withdraw Procedure"
            onPress={() => router.back()}
          />

          <View style={tw`flex-1 bg-black  py-6`}>
            <Text
              style={[
                tw`font-HalyardDisplaySemiBold text-white500 text-2xl mb-6`,
              ]}
            >
              Add card
            </Text>

            {/* Card Information */}
            <View style={tw` rounded-2xl p-4 mb-4`}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={[tw`font-HalyardDisplayMedium text-subtitle text-sm`]}
                >
                  Card information
                </Text>
                {/* Scan Icon */}
                <TouchableOpacity style={tw`flex-row items-center gap-3`}>
                  <SvgXml xml={IconCamera} />
                  <Text
                    style={tw`font-HalyardDisplayMedium text-sm text-primaryBtn`}
                  >
                    Scan card
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="Card number"
                placeholderTextColor="#666"
                style={[
                  tw`font-HalyardDisplaySemiBold text-base mt-3 border-b border-gray-400 pb-2 text-white500`,
                ]}
                keyboardType="numeric"
              />

              <View style={tw`flex-row mt-4`}>
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor="#666"
                  style={[
                    tw`flex-1 border-b border-gray-400 pb-2 text-white mr-3 font-HalyardDisplaySemiBold text-base`,
                  ]}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="CVC"
                  placeholderTextColor="#666"
                  style={[
                    tw`flex-1 border-b border-gray-400 pb-2 text-white font-HalyardDisplaySemiBold text-base`,
                  ]}
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            </View>

            {/* Billing Address */}
            <View style={tw` rounded-2xl p-4 mb-4`}>
              <Text
                style={[
                  tw`text-sm text-subtitle  mb-3 font-HalyardDisplayMedium`,
                ]}
              >
                Billing address
              </Text>
              <Text
                style={[tw`text-white text-base mb-2 font-HalyardDisplayBold`]}
              >
                United States
              </Text>
              <TextInput
                placeholder="ZIP"
                placeholderTextColor="#666"
                style={[
                  tw`border-b border-gray-400 pb-2 text-white font-HalyardDisplaySemiBold text-base`,
                ]}
                keyboardType="numeric"
              />
            </View>

            <View style={tw`flex-row gap-2 items-center rounded-none`}>
              <TouchableOpacity
                onPress={() => handleCheckBox()}
                style={tw.style(
                  `border border-white500 w-5 h-5  justify-center items-center rounded-sm`,
                  saveCard ? `bg-primaryBtn border-0` : `bg-transparent`
                )}
              >
                {saveCard ? (
                  <Text style={tw`text-white500 text-sm`}>✔</Text>
                ) : null}
              </TouchableOpacity>
              <Text style={tw`text-subtitle text-xs`}>Remember me</Text>
            </View>
          </View>
        </View>

        <PrimaryButton
          //   onPress={() => router.push("/taskPerformerSection/homeTabs/task")}
          buttonText="Withdraw"
          buttonContainerStyle={tw`w-full h-12 mb-2`}
        />
      </ScrollView>
    </ViewProvider>
  );
};

export default WithdrawProcedure;
