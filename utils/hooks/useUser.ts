import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User, UserFetched } from "@/types";
export const useAddUser = () => {
  return useMutation({
    mutationFn: (user: User): Promise<void> => axios.post("/api/user", user),
  });
};
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: User): Promise<void> => axios.put("/api/user", user),
  });
};
export const useGetVoters = () => {
  return useQuery({
    queryKey: ["voters"],
    queryFn: (): Promise<UserFetched[]> =>
      axios.get("/api/user/voters").then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
