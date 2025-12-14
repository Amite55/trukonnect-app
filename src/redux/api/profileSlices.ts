import { api } from "../BaseApi";

const profileSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<any, any>({
      query: () => ({
        url: "app/my/profile",
        method: "GET",
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
      query: ({ id, form }) => {
        console.log(
          form,
          "this is form data ",
          id,
          "this is id with api end point -------------->"
        );
        return {
          url: `/app/socialverification/${id}`,
          method: "PUT",
          body: form,
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
      invalidatesTags: ["profile"],
    }),
    deletedSocialAccount: builder.mutation<any, any>({
      query: (id) => ({
        url: `/app/delete/social/account/${id}`,
        method: "POST",
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
  useUpdateProfileImageMutation,
  useDeleteProfileMutation,
  useDeletedSocialAccountMutation,
} = profileSlices;
