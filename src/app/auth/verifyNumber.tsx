import { ImgFlagGhana, ImgFlagNigeria } from "@/assets/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import TitleSubTitle from "@/src/Components/TitleSubTitle";
import ViewProvider from "@/src/Components/ViewProvider";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as Yup from "yup";

const VerifyNumber = () => {
  const [value, setValue] = React.useState(null);

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

  const NumberSchema = Yup.object().shape({
    number: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Enter a valid phone number")
      .required("Phone number is required"),
  });

  return (
    <ViewProvider containerStyle={tw`flex-1 px-4`}>
      <BackTitleButton />

      <View style={tw`flex-1 justify-center`}>
        <TitleSubTitle
          title="Verify Contact"
          subTitle="Enter your contact number for get OTP code"
        />

        {/* ============================ contact Number ================================ */}
        <Formik
          initialValues={{
            number: "",
          }}
          validationSchema={NumberSchema}
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

              {/* ======================== button ==================== */}
              <PrimaryButton
                // onPress={handleSubmit}
                onPress={() => router.push("/auth/createNewPass")}
                buttonContainerStyle={tw`mt-10`}
                buttonText="Send "
              />
            </View>
          )}
        </Formik>
      </View>
    </ViewProvider>
  );
};

export default VerifyNumber;
