import { api } from "../BaseApi";

const BrandTakesSlieces = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getEngagementType: builder.query<any, any>({
        query: (id) => {
          return {
            url: `/app/task/engagement/type?sm_id=${id}`,
            method: "GET",
          };
        },
        providesTags: ["taskes"],
      }),
      getSocialMediaList: builder.query<any, any>({
        query: () => ({
          url: "/app/task/social/media",
          method: "GET",
        }),
        providesTags: ["taskes"],
      }),
      createTasks: builder.mutation<any, any>({
        query: (data) => {
          console.log(data, "hare is api end point ");
          return {
            url: "/app/task/create",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["taskes"],
      }),
      getMyTasks: builder.query<any, any>({
        query: ({ status, page, per_page, start_date }) => ({
          url: "/app/task/all",
          params: {
            status,
            page,
            per_page,
            ...(start_date ? { start_date } : {}),
          },
        }),
        providesTags: ["taskes"],
      }),
      editTasks: builder.mutation<any, any>({
        query: ({ data, id }) => {
          return {
            url: `/app/task/edit/${id}`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["taskes"],
      }),
      getMyTaskDetails: builder.query<any, any>({
        query: (id) => ({
          url: `/app/task/details/${id}`,
          method: "GET",
          body: id,
        }),
        providesTags: ["taskes"],
      }),
      getBrandHomePage: builder.query<any, any>({
        query: () => ({
          url: "/app/homepage",
        }),
        providesTags: ["taskes"],
      }),
      getOrderDetails: builder.query<any, any>({
        query: (id) => ({
          url: `/app/app/order/details/${id}`,
          body: id,
        }),
        providesTags: ["taskes"],
      }),
      getCompleteTask: builder.query<any, any>({
        query: () => ({
          url: "/app/order/complete",
        }),
        providesTags: ["taskes"],
      }),
      ongoingTasks: builder.query<any, any>({
        query: () => ({
          url: "/app/order/ongoing",
        }),
        providesTags: ["taskes"],
      }),
      getUsersPaid: builder.query<any, any>({
        query: () => ({
          url: "/app/task/who/got/paid",
        }),
        providesTags: ["taskes"],
      }),
    };
  },
});

export const {
  useGetEngagementTypeQuery,
  useLazyGetEngagementTypeQuery,
  useGetSocialMediaListQuery,
  useCreateTasksMutation,
  useGetMyTasksQuery,
  useEditTasksMutation,
  useGetMyTaskDetailsQuery,
  useLazyGetMyTasksQuery,
  useLazyGetMyTaskDetailsQuery,
  useGetBrandHomePageQuery,
  useGetOrderDetailsQuery,
  useGetCompleteTaskQuery,
  useLazyGetCompleteTaskQuery,
  useOngoingTasksQuery,
  useGetUsersPaidQuery,
  useLazyGetUsersPaidQuery,
} = BrandTakesSlieces;
