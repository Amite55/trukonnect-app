import { api } from "../BaseApi";

const leaderBoardSlices = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getLeaderBoard: builder.query<any, any>({
        query: ({ page, per_page }) => ({
          url: `/app/leaderboard/?page=${page}&per_page=${per_page}`,
        }),
        providesTags: ["profile"],
      }),
    };
  },
});

export const { useGetLeaderBoardQuery, useLazyGetLeaderBoardQuery } =
  leaderBoardSlices;
