import { IconSearch } from "@/assets/icons";
import { ImgFourthSplash } from "@/assets/image";
import TaskCard from "@/src/Components/TaskCard";
import ViewProvider from "@/src/Components/ViewProvider";
import { TaskData } from "@/src/Data/DataAll";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AllTask = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const RenderHeader = () => {
    return (
      <View>
        <BackTitleButton title="Back" onPress={() => router.back()} />

        <View
          style={tw` h-12  flex-row items-center px-4 rounded-xl bg-inputBgColor gap-3`}
        >
          <SvgXml xml={IconSearch} />
          <TextInput
            placeholder="Search by name of task creator"
            placeholderTextColor="#A4A4A4"
            style={tw`w-full text-white500`}
            onChangeText={(value) => setSearchValue(value)}
          />
        </View>
      </View>
    );
  };
  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <FlatList
        data={TaskData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`gap-3 py-4`}
        ListHeaderComponent={RenderHeader}
        renderItem={({ item }) => (
          <TaskCard
            profileName={item.profileName}
            userImage={ImgFourthSplash}
            date={item.date}
            title={item.title}
            description={item.description}
            total_tokens={item.total_tokens}
            task_from={item.task_from}
            onPress={() =>
              router.push("/taskPerformerSection/task/taskDetails")
            }
          />
        )}
      />
    </ViewProvider>
  );
};

export default AllTask;
