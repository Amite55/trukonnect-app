import { IconCloseEye, IconEyesShow, IconPasswordKey } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import TitleSubTitle from "@/src/Components/TitleSubTitle";
import ViewProvider from "@/src/Components/ViewProvider";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";

const CreateNewPass = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  //   -------------------------------- validation schema -----------------------------
  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    CPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <View style={tw`flex-1 justify-center`}>
        <TitleSubTitle
          title="Create a new password"
          subTitle="Enter the new password you want to change to"
        />

        {/* ============================ contact Number ================================ */}
        <Formik
          initialValues={{
            password: "",
            CPassword: "",
          }}
          validationSchema={PasswordSchema}
          onSubmit={(values) => console.log(values)}
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
                    placeholder="Password"
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

              {/* ======================== button ==================== */}
              <PrimaryButton
                // onPress={handleSubmit}
                onPress={() => router.push("/auth/login")}
                buttonContainerStyle={tw`mt-10`}
                buttonText="Done"
              />
            </View>
          )}
        </Formik>
      </View>
    </ViewProvider>
  );
};

export default CreateNewPass;
