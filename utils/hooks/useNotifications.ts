import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Notification, NotificationFetched } from "@/types";
export const useAddNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notification: Notification): Promise<void> =>
      axios.post("/api/notifications", notification),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notification: {
      _id: string;
      userId: string;
    }): Promise<void> => axios.put("/api/notifications", notification),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useGetNotifications = (id: string | undefined) => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: (): Promise<NotificationFetched[]> =>
      axios.get(`/api/notifications?id=${id}`).then((res) => res.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
//delete notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string): Promise<void> =>
      axios.delete(`/api/notifications?id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
