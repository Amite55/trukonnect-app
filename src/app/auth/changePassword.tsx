import { IconCloseEye, IconEyesShow, IconPasswordKey } from "@/assets/icons";
import { ImgchangePasswordBg, ImgSuccessGIF } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useChangePasswordMutation } from "@/src/redux/api/authSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // =============== api end point ===================
  const [changePass, { isLoading: isChangePassLoading }] =
    useChangePasswordMutation();

  // =============== handle change password ===================
  const handleChangePassword = async (values: any) => {
    try {
      const res = await changePass(values).unwrap();
      if (res) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          router.back();
        }, 1000);
      }
    } catch (error: any) {
      console.log(error, "change password not success ->>");
    }
  };

  // ==================== Validation Schema ====================
  const PasswordSchema = Yup.object().shape({
    current_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android keyboard behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ViewProvider containerStyle={tw`flex-1 bg-bgBaseColor px-4 `}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[tw``, isKeyboardVisible && tw`pb-16`]}
          >
            <BackTitleButton title="Back" />

            <Image
              style={tw`w-full h-56 justify-center items-center`}
              source={ImgchangePasswordBg}
              contentFit="cover"
            />

            <Formik
              initialValues={{
                current_password: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={(values) => handleChangePassword(values)}
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
                        onChangeText={handleChange("current_password")}
                        onBlur={handleBlur("current_password")}
                        value={values.current_password}
                        placeholder="*********"
                        placeholderTextColor="#A4A4A4"
                        style={tw`flex-1 text-white500`}
                        secureTextEntry={!showCurrentPassword}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      <SvgXml
                        xml={showCurrentPassword ? IconEyesShow : IconCloseEye}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.current_password && touched.current_password && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.current_password}
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
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="*********"
                        placeholderTextColor="#A4A4A4"
                        style={tw`flex-1 text-white500`}
                        secureTextEntry={!showNewPassword}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                      <SvgXml
                        xml={showNewPassword ? IconEyesShow : IconCloseEye}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.password}
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
                        onChangeText={handleChange("password_confirmation")}
                        onBlur={handleBlur("password_confirmation")}
                        value={values.password_confirmation}
                        placeholder="*********"
                        placeholderTextColor="#A4A4A4"
                        style={tw`flex-1 text-white500`}
                        secureTextEntry={!showConfirmPassword}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <SvgXml
                        xml={showConfirmPassword ? IconEyesShow : IconCloseEye}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password_confirmation &&
                    touched.password_confirmation && (
                      <Text style={tw`text-red-500 text-xs mt-1`}>
                        {errors.password_confirmation}
                      </Text>
                    )}

                  <PrimaryButton
                    buttonContainerStyle={tw`mt-8 mb-1`}
                    buttonText="Done"
                    loading={isChangePassLoading}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>

            {/* ================== success modal ================ */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              // onRequestClose={() => {
              //   setModalVisible(!modalVisible);
              // }}
              onDismiss={() => setModalVisible(!modalVisible)}
            >
              <View style={tw`flex-1 justify-center items-center `}>
                <View
                  style={tw`bg-white500 w-9/12  rounded-lg px-3  py-8 gap-4 justify-center items-center`}
                >
                  <Text style={tw`font-HalyardDisplaySemiBold text-lg`}>
                    Password Changed Successfully!
                  </Text>
                  <Image
                    style={tw`w-24 h-24 mt-2 mb-4`}
                    source={ImgSuccessGIF}
                    contentFit="cover"
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
        </ViewProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
