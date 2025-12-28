import { api } from "../BaseApi";

const withdrawalSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getWalletInfo: builder.query<any, any>({
      query: () => ({
        url: "/app/withdrawal/walletinfo",
        method: "GET",
      }),
      providesTags: ["wallet", "payment"],
    }),
    getDashboardHistory: builder.query<any, any>({
      query: ({ page, per_page }) => ({
        url: `/app/withdrawal/dashboardhistory/?page=${page}&per_page=${per_page}`,
      }),
      providesTags: ["wallet", "payment"],
    }),
    tokenConvert: builder.mutation<any, any>({
      query: (token) => ({
        url: "/app/withdrawal/tokenconvert",
        method: "POST",
        body: token,
      }),
      invalidatesTags: ["wallet", "payment"],
    }),
    getAllPromoLinks: builder.query<any, any>({
      query: () => ({
        url: "/links",
      }),
      providesTags: ["wallet", "payment"],
    }),
  }),
});

export const {
  useGetWalletInfoQuery,
  useGetDashboardHistoryQuery,
  useLazyGetDashboardHistoryQuery,
  useTokenConvertMutation,
  useGetAllPromoLinksQuery,
} = withdrawalSlices;
