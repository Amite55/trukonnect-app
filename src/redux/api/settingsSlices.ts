import { api } from "../BaseApi";

const settingsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query<any, any>({
      query: () => ({
        url: "/privacy/policy",
      }),
      providesTags: ["profile"],
    }),
    getTermsAndConditions: builder.query<any, any>({
      query: () => ({
        url: "/terms/condition",
      }),
      providesTags: ["profile"],
    }),
    openTicketSupport: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/app/openticket",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
  useOpenTicketSupportMutation,
} = settingsSlices;
