import { api } from "../BaseApi";

const TaskPerformerSlices = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTaskes: builder.query<any, any>({
        query: () => ({
          url: "/app/taskes",
        }),
        providesTags: ["taskes"],
      }),
      saveTaskes: builder.mutation<any, any>({
        query: (tasksId) => ({
          url: "/app/performer/task/update-status",
          method: "POST",
          body: tasksId,
        }),
        invalidatesTags: ["taskes"],
      }),
      taskesSubmitted: builder.mutation<any, any>({
        query: (data) => ({
          url: "/app/tasksubmited",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["taskes"],
      }),
      getPerformTask: builder.query<any, any>({
        query: () => ({
          url: "/app/myperformtask",
        }),
        providesTags: ["taskes"],
      }),
    };
  },
});

export const {
  useGetTaskesQuery,
  useSaveTaskesMutation,
  useTaskesSubmittedMutation,
  useGetPerformTaskQuery,
} = TaskPerformerSlices;
