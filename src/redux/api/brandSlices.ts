import { api } from "../BaseApi";

const BrandTakesSlieces = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      createTasks: builder.mutation<any, any>({
        query: (data) => ({
          url: "/app/task/create",
          method: "POST",
          body: data,
        }),
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
    };
  },
});

export const {
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
} = BrandTakesSlieces;
