import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";

interface PrimaryButtonProps {
  buttonContainerStyle?: any;
  buttonTextStyle?: any;
  buttonText?: string;
  loading?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({
  buttonContainerStyle = "",
  buttonTextStyle = "",
  buttonText = "",
  loading = false,
  onPress,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      delayPressIn={0}
      delayPressOut={0}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        tw`h-12 bg-primaryBtn rounded-full justify-center items-center flex-row gap-2 mb-8`,
        buttonContainerStyle,
      ]}
    >
      {loading && <ActivityIndicator size="small" color="#ffffff" />}
      <Text
        style={[
          tw`text-white500 font-HalyardDisplayBold text-xl`,
          buttonTextStyle,
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
