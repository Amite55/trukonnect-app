import HomeProfileBar from "@/src/Components/HomeProfileBar";
import TaskCard from "@/src/Components/TaskCard";
import ViewProvider from "@/src/Components/ViewProvider";
import { ServiceData } from "@/src/Data/DataAll";
import { useProfile } from "@/src/hooks/useProfile";
import { helpers } from "@/src/lib/helper";
import TaskCardSkeletonList from "@/src/lib/Skeleton/TasksSkeletion";
import tw from "@/src/lib/tailwind";
import { useLazyGetTaskesQuery } from "@/src/redux/api/performarSlices";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  const [selectedService, setSelectedService] = React.useState("All");
  const { data: profileData } = useProfile();

  // ================= api end point call ======================
  const [takes, { data: taksResult, isLoading, isError }] =
    useLazyGetTaskesQuery();

  React.useEffect(() => {
    const fetchData = async () => {
      await takes({
        per_page: 10,
        page: 1,
        category: selectedService === "All" ? "" : selectedService,
        _timestamp: Date.now(),
      });
    };
    fetchData();
  }, [selectedService]);

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <ScrollView>
        {/* ---------------- header profile section ----------------- */}
        <HomeProfileBar
          onPress={() => router.push("/boutProfiles/profileMenus")}
          name={profileData?.data?.user?.name}
          image={profileData?.data?.user?.avatar}
        />

        {/* ------------------------- Services list  category ----------------   */}
        <FlatList
          data={ServiceData}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`flex-row py-2`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedService(item?.title)}
              style={[
                tw`mr-4 px-6 py-3 border border-borderColor rounded-3xl `,
                selectedService === item?.title && tw`bg-primaryBtn`,
              ]}
            >
              <Text
                style={[
                  tw`text-subtitle`,
                  selectedService === item?.title && tw`text-white500`,
                ]}
              >
                {item?.title}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* =============================== service item ================================ */}

        <View style={tw`flex-row justify-between items-center mt-4 mb-4`}>
          <Text style={tw`font-HalyardDisplaySemiBold text-2xl text-white500`}>
            Available tasks for you
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/taskPerformerSection/task/allTask")}
          >
            <Text
              style={tw`font-HalyardTextMedium text-base text-primaryBtn underline`}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>

        {/* --------------------- task card --------------------- */}
        <View style={tw`gap-3 py-4`}>
          {isLoading ? (
            <TaskCardSkeletonList dummyArray={7} />
          ) : !taksResult?.data?.tasks?.data ? (
            <Text
              style={tw`font-HalyardDisplaySemiBold text-lg text-gray-400 text-center`}
            >
              No Data Found
            </Text>
          ) : (
            taksResult?.data?.tasks?.data.map((item: any) => {
              return (
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
                      params: { id: item?.id },
                    })
                  }
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default Home;
