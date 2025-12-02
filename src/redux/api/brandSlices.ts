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
        query: () => ({
          url: "/app/task/all",
        }),
        providesTags: ["taskes"],
      }),
      editTasks: builder.mutation<any, any>({
        query: ({ data, tasksId }) => ({
          url: `/app/task/edit/${tasksId}`,
          method: "POST",
          body: data,
        }),
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
      getCompleteTaskes: builder.query<any, any>({
        query: () => ({
          url: "/app/order/complete",
        }),
        providesTags: ["taskes"],
      }),
      ongoingTaskes: builder.query<any, any>({
        query: () => ({
          url: "/app/order/ongoing",
        }),
        providesTags: ["taskes"],
      }),
    };
  },
});
