import {
  IconBuyTaskActive,
  IconBuyTaskInActive,
  IconDashboardActive,
  IconDashboardInActive,
  IconMyTaskActive,
  IconMyTaskInActive,
  IconProfileActive,
  IconProfileInActive,
} from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const _layout = () => {
  function MyTabBar({ state, descriptors, navigation }) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          // Get the icon based on route name
          const getIcon = () => {
            switch (route.name) {
              case "dashboard":
                return isFocused ? IconDashboardActive : IconDashboardInActive;
              case "buyTasks":
                return isFocused ? IconBuyTaskActive : IconBuyTaskInActive;
              case "myTask":
                return isFocused ? IconMyTaskActive : IconMyTaskInActive;
              case "profile":
                return isFocused ? IconProfileActive : IconProfileInActive;
              default:
                return IconDashboardActive;
            }
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              key={route.name}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tw`flex-1 items-center justify-center relative`}
            >
              {isFocused && (
                <View
                  style={[
                    tw`absolute -top-3 bg-primaryBtn h-1 w-24 mb-2  rounded-b-full`,
                    {
                      // iOS shadow
                      shadowColor: "#FF6600",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      // Android shadow
                      elevation: 5,
                    },
                  ]}
                />
              )}
              <SvgXml
                xml={getIcon()}
                width={24}
                height={24}
                style={[tw`mb-1`]}
              />
              <Text style={{ color: isFocused ? "orange" : "white" }}>
                {label}
              </Text>
            </PlatformPressable>
          );
        })}
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", headerShown: false }}
      />
      <Tabs.Screen name="buyTasks" options={{ title: "Buy Tasks" }} />
      <Tabs.Screen name="myTask" options={{ title: "My Task" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default _layout;
