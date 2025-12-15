import { api } from "../BaseApi";

const tickedSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    openTicket: builder.mutation<any, any>({
      query: (formdata) => ({
        url: "/app/openticket",
        method: "POST",
        body: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const { useOpenTicketMutation } = tickedSlices;
