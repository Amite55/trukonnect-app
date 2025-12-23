import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

// Type for the args that will be passed to axios (base query arguments)

const baseQueryWithPath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args
) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const result: AxiosResponse = await axios({
      // baseURL: "http://10.10.10.90:8001/api",
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (result?.status === 403) {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    }

    if (result?.status === 401) {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    }
    if (typeof result?.data === "string") {
      const withCurly = (result.data += "}");
      return { data: JSON.parse(withCurly) };
    }
    if (typeof result?.data === "object") {
      return { data: result?.data };
    }
    return { data: result?.data };
  } catch (error: any) {
    if (error.response?.data) {
      if (typeof error.response?.data === "string") {
        const withCurly = (error.response.data += "}");
        return { error: JSON.parse(withCurly) };
      } else {
        return { error: error.response?.data };
      }
    }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || "Something went wrong",
      },
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  keepUnusedDataFor: 0,
  reducerPath: "api",
  baseQuery: baseQueryWithPath,
  endpoints: () => ({}),
  tagTypes: [
    "singIn",
    "logout",
    "singUp",
    "forgetPassword",
    "taskes",
    "wallet",
    "Profile",
    "profile",
    "ticket",
    "payment",
    "notification",
  ],
});
// export const imageUrl = "http://10.10.10.90:8001/storage";
export const imageUrl = process.env.EXPO_PUBLIC_IMG_URL;
