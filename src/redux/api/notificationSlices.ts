import { api } from "../BaseApi";

const notificationSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<any, any>({
      query: () => ({
        url: "/notification/center",
      }),
      providesTags: ["notification"],
    }),
    markAsRead: builder.mutation<any, any>({
      query: (id) => ({
        url: `notification/markAsRead/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
    markAllAsRead: builder.mutation<any, any>({
      query: () => ({
        url: "notification/markAllAsRead",
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
    deleteAllNotification: builder.mutation<any, any>({
      query: () => ({
        url: "notification/deleteAllNotification",
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useLazyGetNotificationQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteAllNotificationMutation,
} = notificationSlices;
