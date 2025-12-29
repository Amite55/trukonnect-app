import { api } from "../BaseApi";

const paymentSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    brandPayment: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/brand-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment", "Profile"],
    }),
    getCallBack: builder.query<any, any>({
      query: (transaction_id) => ({
        url: `/app/callback/${transaction_id}`,
        method: "GET",
      }),
      providesTags: ["payment", "Profile"],
    }),
    getNetwork: builder.query<any, any>({
      query: () => ({
        url: "/app/networks",
      }),
      providesTags: ["payment", "Profile"],
    }),
    performerPayment: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/performer-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment", "Profile"],
    }),
    getAvailableBank: builder.query<any, any>({
      query: () => ({
        url: "/app/available/banks",
      }),
      providesTags: ["payment", "Profile"],
    }),
    customerAccountCheck: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/customer/bank/account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment", "Profile"],
    }),
  }),
});

export const {
  useBrandPaymentMutation,
  useGetCallBackQuery,
  useGetNetworkQuery,
  usePerformerPaymentMutation,
  useGetAvailableBankQuery,
  useCustomerAccountCheckMutation,
} = paymentSlices;
