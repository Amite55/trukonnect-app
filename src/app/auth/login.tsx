import { IconCloseEye, IconPasswordKey, IconPhone } from "@/assets/icons";
import TitleSubTitle from "@/src/Components/TitleSubTitle";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { Link } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const LoginScreen = () => {
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
    try {
      // await AsyncStorage.setItem("check", JSON.stringify(isChecked));
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };

  return (
    <ViewProvider containerStyle={tw`flex-1`}>
      <ScrollView style={tw`px-4`} showsVerticalScrollIndicator={false}>
        <TitleSubTitle
          title="Sign In"
          subTitle="Enter correct information to access your account"
        />

        {/* -------------------------- Login Form --------------------------   */}

        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              {/* ==================================== Phone Number ================================ */}
              <Text
                style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
              >
                Number
              </Text>
              <View
                style={tw` h-14  flex-row items-center px-4 rounded-lg bg-inputBgColor gap-3`}
              >
                <SvgXml xml={IconPhone} />
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#A4A4A4"
                  keyboardType="phone-pad"
                  style={tw`w-full text-white500`}
                />
              </View>

              {/* ==================================== password Number ================================ */}
              <Text
                style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
              >
                Password
              </Text>
              <View
                style={tw` h-14  flex-row justify-between items-center px-4 rounded-lg bg-inputBgColor`}
              >
                <View style={tw`flex-1 flex-row items-center gap-3`}>
                  <SvgXml xml={IconPasswordKey} />
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#A4A4A4"
                    keyboardType="phone-pad"
                    style={tw` text-white500`}
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity>
                  <SvgXml xml={IconCloseEye} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View style={tw`flex-row justify-between my-8`}>
          <View style={tw`flex-row gap-2 items-center rounded-none`}>
            <TouchableOpacity
              onPress={() => handleCheckBox()}
              style={tw.style(
                `border border-white500 w-5 h-5  justify-center items-center rounded-sm`,
                isChecked ? `bg-primaryBtn border-0` : `bg-transparent`
              )}
            >
              {isChecked ? (
                <Text style={tw`text-white500 text-sm`}>✔</Text>
              ) : null}
            </TouchableOpacity>
            <Text style={tw`text-subtitle text-xs`}>Remember me</Text>
          </View>
          <Text
            style={tw`text-white500 border-b text-[12px] font-HalyardMicroBookRegular`}
          >
            <Link href={"/"} style={tw`text-primaryBtn underline`}>
              Forget password?
            </Link>
          </Text>
        </View>

        {/* ======================== button ==================== */}

        <TouchableOpacity
          style={tw`h-14 bg-primaryBtn rounded-full justify-center items-center flex-row gap-2 mb-8`}
        >
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={tw`text-white500 font-HalyardDisplayBold text-xl`}>
            Sing In
          </Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center `}>
          <Text style={tw`font-HalyardDisplayRegular text-sm text-white500`}>
            Don’t have an account?
            <Text style={tw`text-primaryBtn`}>Sign up</Text>
          </Text>
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default LoginScreen;
