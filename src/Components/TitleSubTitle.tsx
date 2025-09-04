import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";

interface TitleSubTitleProps {
  title: string;
  subTitle: string;
}

const TitleSubTitle = ({ title, subTitle }: TitleSubTitleProps) => {
  return (
    <View style={tw`justify-center items-center gap-3`}>
      <Text
        style={tw`font-HalyardDisplaySemiBold text-3xl text-white500 text-center`}
      >
        {title}
      </Text>
      <Text
        style={tw`text-subtitle font-HalyardDisplayRegular text-sm text-center`}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export default TitleSubTitle;
