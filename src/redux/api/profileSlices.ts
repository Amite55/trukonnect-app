import { api } from "../BaseApi";

const profileSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<any, any>({
      query: () => ({
        url: "/app/my/profile",
      }),
      providesTags: ["profile"],
    }),
    editProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/edit-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    switchRole: builder.mutation<any, any>({
      query: () => ({
        url: "/app/switchRole",
        method: "POST",
      }),
      invalidatesTags: ["profile"],
    }),
    getAllSocial: builder.query<any, any>({
      query: () => ({
        url: "/app/allsocial",
      }),
      providesTags: ["profile"],
    }),
    socialVerification: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        url: `/app/socialverification/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useEditProfileMutation,
  useSwitchRoleMutation,
  useGetAllSocialQuery,
  useSocialVerificationMutation,
} = profileSlices;
