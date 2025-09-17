import {
  IconCloseEye,
  IconEyesShow,
  IconPasswordKey,
  IconPhone,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import TitleSubTitle from "@/src/Components/TitleSubTitle";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";

const LoginScreen = () => {
  const { role } = useLocalSearchParams();
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // -------------------------- handle login --------------------------
  const handleLogin = (values) => {
    console.log(values, "Login values ---->");
  };

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
    try {
      // await AsyncStorage.setItem("check", JSON.stringify(isChecked));
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };

  // ==================== Validation Schema ====================
  const LoginSchema = Yup.object().shape({
    number: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Please enter a valid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <ViewProvider containerStyle={tw`flex-1`}>
      <ScrollView
        style={tw`px-4 `}
        contentContainerStyle={tw`flex flex-grow justify-between`}
        showsVerticalScrollIndicator={false}
      >
        <View />

        {/* -------------------------- Login Form --------------------------   */}
        <View>
          <TitleSubTitle
            containerStyle={tw`mb-8`}
            title="Sign In"
            subTitle="Enter correct information to access your account"
          />
          <Formik
            initialValues={{ number: "", password: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={LoginSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
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
                    onChangeText={handleChange("number")}
                    onBlur={handleBlur("number")}
                    value={values.number}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#A4A4A4"
                    keyboardType="phone-pad"
                    style={tw`w-full text-white500`}
                  />
                </View>
                {errors.number && touched.number && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.number}
                  </Text>
                )}

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
                      key={showPassword ? "text" : "password"}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Password"
                      placeholderTextColor="#A4A4A4"
                      style={tw` text-white500`}
                      secureTextEntry={!showPassword}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <SvgXml xml={showPassword ? IconEyesShow : IconCloseEye} />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.password}
                  </Text>
                )}

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
                    <Link
                      href={"/auth/verifyNumber"}
                      style={tw`text-primaryBtn underline`}
                    >
                      Forget password?
                    </Link>
                  </Text>
                </View>
                {/* ======================== button ==================== */}

                <PrimaryButton
                  onPress={() => {
                    role === "taskPerformer"
                      ? router.push("/taskPerformerSection/homeTabs/home")
                      : router.push("/taskCreator/creatorHomTabs/dashboard");
                  }}
                  // onPress={handleSubmit}
                  buttonText="Sign In"
                />
              </View>
            )}
          </Formik>
        </View>

        <View style={tw`flex-row justify-center mb-1`}>
          <Text style={tw`font-HalyardDisplayRegular text-sm text-white500`}>
            Don’t have an account?{" "}
            <Link href={"/auth/singUp"} style={tw`text-primaryBtn`}>
              Sign up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default LoginScreen;
