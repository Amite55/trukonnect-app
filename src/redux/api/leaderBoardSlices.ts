import { api } from "../BaseApi";

const leaderBoardSlices = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPerformerLeaderBoard: builder.query<any, any>({
        query: () => ({
          url: "/app/performer/leaderboard",
        }),
        providesTags: ["profile"],
      }),
      getBrandLeaderBoard: builder.query<any, any>({
        query: () => ({
          url: "/app/brand/leaderboard",
        }),
        providesTags: ["profile"],
      }),
    };
  },
});

export const { useGetPerformerLeaderBoardQuery, useGetBrandLeaderBoardQuery } =
  leaderBoardSlices;
