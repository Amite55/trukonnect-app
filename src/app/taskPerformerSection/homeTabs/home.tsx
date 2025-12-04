import { ImgFastSplash } from "@/assets/image";
import HomeProfileBar from "@/src/Components/HomeProfileBar";
import TaskCard from "@/src/Components/TaskCard";
import ViewProvider from "@/src/Components/ViewProvider";
import { ServiceData, TaskData } from "@/src/Data/DataAll";
import { useProfile } from "@/src/hooks/useProfile";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  const [selectedService, setSelectedService] = React.useState("All");
  const { data: profileData } = useProfile();

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
          {TaskData.map((item) => {
            return (
              <TaskCard
                key={item?.id}
                profileName={item?.profileName}
                userImage={ImgFastSplash}
                date={item?.date}
                title={item?.title}
                description={item?.description}
                total_tokens={item?.total_tokens}
                task_from={item?.task_from}
                onPress={() =>
                  router.push("/taskPerformerSection/task/taskDetails")
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default Home;
