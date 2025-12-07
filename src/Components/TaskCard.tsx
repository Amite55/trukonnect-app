import { IconPoint } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { helpers } from "../lib/helper";
import tw from "../lib/tailwind";

interface TaskCardProps {
  userImage: any;
  profileName: string;
  date: any;
  title: string;
  description: string;
  total_tokens: number;
  task_from: string;
  onPress: () => void;
  social_image?: any;
}

const TaskCard = ({
  userImage,
  profileName,
  date,
  title,
  description,
  total_tokens,
  task_from,
  onPress,
  social_image,
}: TaskCardProps) => {
  return (
    <View style={tw`gap-3 bg-transparentBG  p-4 rounded-xl `}>
      <View style={tw`flex-row items-center gap-2`}>
        <Image
          contentFit="cover"
          style={tw`w-12 h-12 rounded-full `}
          source={helpers.getImgFullUrl(userImage)}
        />
        <View>
          <Text style={tw`font-HalyardDisplayMedium text-xl text-white500`}>
            {profileName}
          </Text>
          <Text
            style={tw`font-HalyardDisplayRegular text-xs text-subtitle mt-1`}
          >
            {date}
          </Text>
        </View>
      </View>

      <Text style={tw`font-HalyardDisplaySemiBold text-base text-white500`}>
        {title}
      </Text>
      <Text style={tw`font-HalyardDisplayRegular text-base text-subtitle`}>
        {description?.length > 100
          ? description?.slice(0, 100) + "..."
          : description}
      </Text>

      {/* --------------------------------------------- */}
      <View style={tw`flex-row items-center justify-between pt-3`}>
        <View style={tw`flex-row items-center gap-3 `}>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconPoint} />
            <Text
              style={tw`font-HalyardDisplaySemiBold text-base text-white500`}
            >
              {total_tokens}
            </Text>
          </View>

          <Image
            contentFit="cover"
            style={tw`w-6 h-6 rounded-full `}
            source={helpers.getImgFullUrl(social_image)}
          />
        </View>

        <TouchableOpacity
          onPress={onPress}
          style={tw`items-center justify-center w-24 h-10 rounded-3xl bg-secondaryBtn`}
        >
          <Text
            style={tw`font-HalyardDisplayRegular text-base text-primaryBtn underline`}
          >
            Open task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;
