import { api } from "../BaseApi";

const profileSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<any, any>({
      query: () => ({
        url: "app/my/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    editProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/app/edit-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    switchRole: builder.mutation<any, any>({
      query: () => ({
        url: "/app/switchRole",
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
    getAllSocial: builder.query<any, any>({
      query: () => ({
        url: "/app/allsocial",
      }),
      providesTags: ["Profile"],
    }),
    socialVerification: builder.mutation<any, any>({
      query: ({ id, form }) => {
        // console.log(id, "4444444444", form, "==========");
        return {
          url: `/app/socialverification/${id}`,
          method: "POST",
          body: form,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["profile"],
    }),
    updateProfileImage: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "/app/edit-image-profile",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["profile"],
    }),
    deleteProfile: builder.mutation<any, any>({
      query: () => ({
        url: "/app/delete-profile",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    deletedSocialAccount: builder.mutation<any, any>({
      query: (id) => ({
        url: `/app/delete/social/account/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useEditProfileMutation,
  useSwitchRoleMutation,
  useGetAllSocialQuery,
  useSocialVerificationMutation,
  useUpdateProfileImageMutation,
  useDeleteProfileMutation,
  useDeletedSocialAccountMutation,
} = profileSlices;
