import { api } from "../BaseApi";

const tickedSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    openTicket: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/openticket",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const { useOpenTicketMutation } = tickedSlices;
