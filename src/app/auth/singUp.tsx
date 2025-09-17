import {
  IconCloseEye,
  IconEyesShow,
  IconLoginUser,
  IconMail,
  IconPasswordKey,
} from "@/assets/icons";
import { ImgFlagGhana, ImgFlagNigeria } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import TitleSubTitle from "@/src/Components/TitleSubTitle";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";

const SingUpScreen = () => {
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [value, setValue] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // -------------------------- handle login --------------------------
  const handleSingUp = (values) => {
    console.log(values, "SingUp values ---->");
    router.push("/auth/verifyOTPScreen");
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
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    number: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Enter a valid phone number")
      .required("Phone number is required"),
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    CPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // ==================== country code data ==================
  const countryData = [
    { code: "+233", country: "GH(+233)", flag: ImgFlagGhana },
    { code: "+234", country: "NG(+234)", flag: ImgFlagNigeria },
  ];

  useEffect(() => {
    if (countryData.length > 0) {
      setValue(countryData[0].code);
    }
  }, []);

  return (
    <ViewProvider containerStyle={{ flex: 1 }}>
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
            title="Sign Up"
            subTitle="Create an account with correct information."
          />
          <Formik
            initialValues={{
              email: "",
              password: "",
              number: "",
              fullName: "",
              CPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => handleSingUp(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                {/* ==================================== email ================================ */}
                <Text
                  style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
                >
                  Email
                </Text>
                <View
                  style={tw` h-14  flex-row items-center px-4 rounded-lg bg-inputBgColor gap-3`}
                >
                  <SvgXml xml={IconMail} />
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Enter your phone Email"
                    placeholderTextColor="#A4A4A4"
                    style={tw`w-full text-white500`}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.email}
                  </Text>
                )}

                {/* ============================ contact Number ================================ */}
                <Text
                  style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
                >
                  Contact Number
                </Text>

                <View style={tw`flex-row gap-1 items-center`}>
                  {/* -=--------------------------- country picker --------------------------  */}
                  <View style={tw`bg-inputBgColor h-14 w-28`}>
                    <Dropdown
                      style={tw.style(`h-14 rounded-lg px-2 bg-inputBgColor `)}
                      placeholderStyle={tw`text-sm text-subtitle`}
                      selectedTextStyle={tw`text-xs text-white500`}
                      containerStyle={tw`bg-black rounded-lg`}
                      itemTextStyle={tw`text-white`}
                      activeColor="rgba(255,255,255,0.1)"
                      placeholder="country code"
                      data={countryData}
                      maxHeight={300}
                      labelField="country"
                      valueField="code"
                      value={value}
                      onChange={(item) => {
                        setValue(item.code);
                      }}
                      renderSelectedItem={(item) => {
                        if (!item) return null;
                        const selectedItem = countryData.find(
                          (c) => c.code === value
                        );
                        return (
                          <Text style={tw`text-white500 text-xs`}>
                            {selectedItem?.country}
                          </Text>
                        );
                      }}
                      renderItem={(item) => (
                        <View style={tw`p-2`}>
                          <Text style={tw`text-white text-base`}>
                            {item.country}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                  <View
                    style={tw`flex-1 h-14  flex-row items-center px-4 rounded-lg bg-inputBgColor gap-3`}
                  >
                    <TextInput
                      onChangeText={handleChange("number")}
                      onBlur={handleBlur("number")}
                      value={values.number}
                      placeholder="1234567890"
                      keyboardType="phone-pad"
                      placeholderTextColor="#A4A4A4"
                      style={tw`w-full text-white500`}
                    />
                  </View>
                </View>

                {errors.number && touched.number && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.number}
                  </Text>
                )}

                {/* -------------------- full name ---------------- */}
                <Text
                  style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
                >
                  Full Name
                </Text>
                <View
                  style={tw` h-14  flex-row items-center px-4 rounded-lg bg-inputBgColor gap-3`}
                >
                  <SvgXml xml={IconLoginUser} />
                  <TextInput
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#A4A4A4"
                    style={tw`w-full text-white500`}
                  />
                </View>
                {errors.fullName && touched.fullName && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.fullName}
                  </Text>
                )}

                {/* ==================================== password  ================================ */}
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

                {/* ==================================== Retype password  ================================ */}
                <Text
                  style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
                >
                  Retype Password
                </Text>
                <View
                  style={tw` h-14  flex-row justify-between items-center px-4 rounded-lg bg-inputBgColor`}
                >
                  <View style={tw`flex-1 flex-row items-center gap-3`}>
                    <SvgXml xml={IconPasswordKey} />
                    <TextInput
                      key={showConfirmPassword ? "text" : "password"}
                      onChangeText={handleChange("CPassword")}
                      onBlur={handleBlur("CPassword")}
                      value={values.CPassword}
                      placeholder="CPassword"
                      placeholderTextColor="#A4A4A4"
                      style={tw` text-white500`}
                      secureTextEntry={!showConfirmPassword}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <SvgXml
                      xml={showConfirmPassword ? IconEyesShow : IconCloseEye}
                    />
                  </TouchableOpacity>
                </View>
                {errors.CPassword && touched.CPassword && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.CPassword}
                  </Text>
                )}

                <View style={tw`flex-row gap-2 items-center rounded-none my-6`}>
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
                  <View style={tw`flex-1`}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={tw` font-HalyardMicroBookRegular text-subtitle text-xs`}
                    >
                      By creating this account, you are agree to our{" "}
                      <Text style={tw`text-primaryBtn`}>terms of use</Text> &{" "}
                      <Text style={tw`text-primaryBtn`}>privacy policy</Text>.
                    </Text>
                  </View>
                </View>

                {/* ======================== button ==================== */}

                <PrimaryButton
                  // onPress={handleSubmit}
                  onPress={() => router.push("/auth/verifyOTPScreen")}
                  buttonText="Sign Up"
                />
              </View>
            )}
          </Formik>
        </View>

        <View style={tw`flex-row justify-center mb-2`}>
          <Text style={tw`font-HalyardDisplayRegular text-sm text-white500`}>
            Do you have an account?{" "}
            <Link href={"/auth/login"} style={tw`text-primaryBtn`}>
              Sign in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ViewProvider>
  );
};

export default SingUpScreen;
