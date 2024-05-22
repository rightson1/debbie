import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { IPosition, IPositionFetched } from "@/types";

const invalidate = (queryClient: QueryClient, key: string) => {
  queryClient.invalidateQueries({
    queryKey: [key],
  });
};

export const useAddPosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (position: IPosition): Promise<void> =>
      axios.post("/api/positions", position),
    onSuccess: () => {
      invalidate(queryClient, "positions");
    },
  });
};
export const useUpdatePosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (position: IPositionFetched): Promise<void> =>
      axios.put("/api/positions", position),
    onSettled: () => {
      invalidate(queryClient, "positions");
    },
  });
};
export const useGetPositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: (): Promise<IPositionFetched[]> =>
      axios.get("/api/positions").then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
//delete position
export const useDeletePosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string): Promise<void> =>
      axios.delete(`/api/positions?id=${id}`),
    onSuccess: () => {
      invalidate(queryClient, "positions");
    },
  });
};
