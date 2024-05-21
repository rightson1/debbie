import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Settings, SettingsFetched } from "@/types";
export const useAddSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: Settings): Promise<void> =>
      axios.post("/api/settings", settings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
};
export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: Settings): Promise<void> =>
      axios.put("/api/settings", settings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
};
export const useGetSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: (): Promise<SettingsFetched> =>
      axios.get("/api/settings").then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
