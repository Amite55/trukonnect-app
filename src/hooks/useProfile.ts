import { useGetMyProfileQuery } from "../redux/api/profileSlices";

export const useProfile = () => {
  return useGetMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
  });
};
