import { api } from "../BaseApi";

const TaskPerformerSlices = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTaskes: builder.query<any, any>({
        query: ({ per_page, page, search, category }) => {
          return {
            url: `/app/taskes?category=${category}&per_page=${per_page}&page=${page}&search=${search}`,
          };
        },
        providesTags: ["taskes"],
      }),
      saveTaskes: builder.mutation<any, any>({
        query: (task_id) => ({
          url: "/app/savetask",
          method: "POST",
          body: task_id,
        }),
        invalidatesTags: ["taskes"],
      }),
      taskesSubmitted: builder.mutation<any, any>({
        query: (formData) => ({
          url: "/app/tasksubmited",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        invalidatesTags: ["taskes"],
      }),
      getPerformTask: builder.query<any, any>({
        query: ({ per_page, page, status, search }) => {
          return {
            url: `/app/myperformtask?per_page=${per_page}&page=${page}&status=${status}&search=${search}`,
          };
        },
        providesTags: ["taskes"],
      }),
      singleTaskDetails: builder.query<any, any>({
        query: (taskId) => ({
          url: `/app/tasks/details/${taskId}`,
        }),
        providesTags: ["taskes"],
      }),
      getOngoingTask: builder.query<any, any>({
        query: ({ per_page, page }) => ({
          url: `/app/ongoing/tasks/?per_page=${per_page}&page=${page}`,
        }),
        providesTags: ["taskes"],
      }),
    };
  },
});

export const {
  useGetTaskesQuery,
  useLazyGetTaskesQuery,
  useSaveTaskesMutation,
  useTaskesSubmittedMutation,
  useGetPerformTaskQuery,
  useLazyGetPerformTaskQuery,
  useSingleTaskDetailsQuery,
  useLazySingleTaskDetailsQuery,
  useGetOngoingTaskQuery,
  useLazyGetOngoingTaskQuery,
} = TaskPerformerSlices;
