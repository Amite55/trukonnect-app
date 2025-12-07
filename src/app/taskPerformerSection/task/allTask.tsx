import { IconSearch } from "@/assets/icons";
import TaskCard from "@/src/Components/TaskCard";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper";
import tw from "@/src/lib/tailwind";
import { useLazyGetTaskesQuery } from "@/src/redux/api/performarSlices";
import { router } from "expo-router";
import React from "react";
import { FlatList, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AllTask = () => {
  const [searchValue, setSearchValue] = React.useState("");

  // ================= api end point call ======================
  const [takes, { data: taksResult, isLoading, isError }] =
    useLazyGetTaskesQuery();

  React.useEffect(() => {
    const fetchData = async () => {
      await takes({
        per_page: 10,
        page: 1,
        category: searchValue ? searchValue : "",
        _timestamp: Date.now(),
      });
    };
    fetchData();
  }, [searchValue]);

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
        data={taksResult?.data?.tasks?.data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`gap-3 py-4`}
        ListHeaderComponent={RenderHeader}
        renderItem={({ item }) => (
          <TaskCard
            key={item?.id}
            profileName={item?.creator?.name}
            userImage={item?.creator?.avatar}
            date={helpers.formatDate(item?.created_at)}
            title={item?.engagement?.engagement_name}
            description={item?.description}
            total_tokens={item?.per_perform}
            task_from={item?.task_from}
            social_image={item?.social?.icon_url}
            onPress={() =>
              router.push({
                pathname: "/taskPerformerSection/task/taskDetails",
                params: { taskId: item?.id },
              })
            }
          />
        )}
      />
    </ViewProvider>
  );
};

export default AllTask;
