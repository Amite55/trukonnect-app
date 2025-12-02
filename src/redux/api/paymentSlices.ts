import { api } from "../BaseApi";

const paymentSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    brandPayment: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/brand-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    getCallBack: builder.query<any, any>({
      query: (transaction_id) => ({
        url: `/app/callback/${transaction_id}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    getNetwork: builder.query<any, any>({
      query: () => ({
        url: "/app/networks",
      }),
      providesTags: ["payment"],
    }),
    performerPayment: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/performer-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    getAvailableBank: builder.query<any, any>({
      query: () => ({
        url: "/app/available/banks",
      }),
      providesTags: ["payment"],
    }),
    customerAccountCheck: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/customer/bank/account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
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
