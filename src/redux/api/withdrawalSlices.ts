import { api } from "../BaseApi";

const withdrawalSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getWalletInfo: builder.query<any, any>({
      query: () => ({
        url: "/app/withdrawal/walletinfo",
        method: "GET",
      }),
      providesTags: ["wallet"],
    }),
    getDashboardHistory: builder.query<any, any>({
      query: () => ({
        url: "/app/withdrawal/dashboardhistory",
      }),
      providesTags: ["wallet"],
    }),
    tokenConvert: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/withdrawal/tokenconvert",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wallet"],
    }),
  }),
});

export const {
  useGetWalletInfoQuery,
  useGetDashboardHistoryQuery,
  useTokenConvertMutation,
} = withdrawalSlices;
