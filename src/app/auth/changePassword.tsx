import { IconCloseEye, IconEyesShow, IconPasswordKey } from "@/assets/icons";
import { ImgchangePasswordBg } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
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

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // ==================== Validation Schema ====================
  const PasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 `}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BackTitleButton title="Back" />

        <Image
          style={tw`w-full h-56 justify-center items-center`}
          source={ImgchangePasswordBg}
          contentFit="cover"
        />

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={PasswordSchema}
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
              {/* ==================================== current password  ================================ */}
              <Text
                style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
              >
                Current Password
              </Text>
              <View
                style={tw` h-14  flex-row justify-between items-center px-4 rounded-lg bg-inputBgColor`}
              >
                <View style={tw`flex-1 flex-row items-center gap-3`}>
                  <SvgXml xml={IconPasswordKey} />
                  <TextInput
                    key={showCurrentPassword ? "text" : "password"}
                    onChangeText={handleChange("currentPassword")}
                    onBlur={handleBlur("currentPassword")}
                    value={values.currentPassword}
                    placeholder="*********"
                    placeholderTextColor="#A4A4A4"
                    style={tw` text-white500`}
                    secureTextEntry={!showCurrentPassword}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <SvgXml
                    xml={showCurrentPassword ? IconEyesShow : IconCloseEye}
                  />
                </TouchableOpacity>
              </View>
              {errors.currentPassword && touched.currentPassword && (
                <Text style={tw`text-red-500 text-xs mt-1`}>
                  {errors.currentPassword}
                </Text>
              )}

              {/* ==================================== new password  ================================ */}
              <Text
                style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-8 mb-2`}
              >
                New Password
              </Text>
              <View
                style={tw` h-14  flex-row justify-between items-center px-4 rounded-lg bg-inputBgColor`}
              >
                <View style={tw`flex-1 flex-row items-center gap-3`}>
                  <SvgXml xml={IconPasswordKey} />
                  <TextInput
                    key={showNewPassword ? "text" : "password"}
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    value={values.newPassword}
                    placeholder="*********"
                    placeholderTextColor="#A4A4A4"
                    style={tw` text-white500`}
                    secureTextEntry={!showNewPassword}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <SvgXml xml={showNewPassword ? IconEyesShow : IconCloseEye} />
                </TouchableOpacity>
              </View>
              {errors.currentPassword && touched.newPassword && (
                <Text style={tw`text-red-500 text-xs mt-1`}>
                  {errors.newPassword}
                </Text>
              )}

              {/* ==================================== confirm password  ================================ */}
              <Text
                style={tw`text-white500 font-HalyardDisplaySemiBold text-lg mt-6 mb-2`}
              >
                Retype New Password
              </Text>
              <View
                style={tw` h-14  flex-row justify-between items-center px-4 rounded-lg bg-inputBgColor`}
              >
                <View style={tw`flex-1 flex-row items-center gap-3`}>
                  <SvgXml xml={IconPasswordKey} />
                  <TextInput
                    key={showConfirmPassword ? "text" : "password"}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    placeholder="*********"
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
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={tw`text-red-500 text-xs mt-1`}>
                  {errors.confirmPassword}
                </Text>
              )}

              <PrimaryButton
                buttonContainerStyle={tw`mt-8 mb-1`}
                buttonText="Done"
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </ViewProvider>
  );
};

export default ChangePassword;
