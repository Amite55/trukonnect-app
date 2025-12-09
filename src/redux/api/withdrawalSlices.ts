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
      query: (token) => ({
        url: "/app/withdrawal/tokenconvert",
        method: "POST",
        body: token,
      }),
      invalidatesTags: ["wallet"],
    }),
    getAllPromoLinks: builder.query<any, any>({
      query: () => ({
        url: "/links",
      }),
      providesTags: ["wallet"],
    }),
  }),
});

export const {
  useGetWalletInfoQuery,
  useGetDashboardHistoryQuery,
  useTokenConvertMutation,
  useGetAllPromoLinksQuery,
} = withdrawalSlices;
