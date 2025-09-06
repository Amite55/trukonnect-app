import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";

interface TitleSubTitleProps {
  title: string;
  subTitle: string;
  containerStyle?: any;
  titleStyle?: any;
  subTitleStyle?: any;
}

const TitleSubTitle = ({
  title,
  subTitle,
  containerStyle = "",
  titleStyle = "",
  subTitleStyle = "",
}: TitleSubTitleProps) => {
  return (
    <View style={[tw`justify-center items-center gap-3`, containerStyle]}>
      <Text
        style={[
          tw`font-HalyardDisplaySemiBold text-3xl text-white500 text-center`,
          titleStyle,
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          tw`text-subtitle font-HalyardDisplayRegular text-sm text-center`,
          subTitleStyle,
        ]}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export default TitleSubTitle;
