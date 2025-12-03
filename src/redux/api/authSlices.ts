import { api } from "../BaseApi";

const authSlices = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      singIn: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth/signin",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["singIn"],
      }),
      singUp: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth/signup",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["singUp"],
      }),
      sendOTP: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth//otp/send",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["forgetPassword"],
      }),
      forgotOTPVerify: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth//otp/verify",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["forgetPassword"],
      }),
      forgetPassword: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth/forgot-password",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["forgetPassword"],
      }),
      phoneVerifyOTP: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth/verify-phone-otp",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["singIn"],
      }),
      resendPhoneOTP: builder.mutation<any, any>({
        query: (phone) => ({
          url: "/auth/resend-phone-otp",
          method: "POST",
          body: phone,
        }),
        invalidatesTags: ["singIn"],
      }),
      ChangePassword: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth/changepassword",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["singIn"],
      }),
      logout: builder.mutation<any, any>({
        query: (data) => ({
          url: "/auth/signout",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["singIn"],
      }),
    };
  },
});

export const {
  useSingInMutation,
  useSingUpMutation,
  useSendOTPMutation,
  usePhoneVerifyOTPMutation,
  useResendPhoneOTPMutation,
  useChangePasswordMutation,
  useForgotOTPVerifyMutation,
  useForgetPasswordMutation,
  useLogoutMutation,
} = authSlices;
