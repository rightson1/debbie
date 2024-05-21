import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Vote, VoteFetched } from "@/types";
export const useAddVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vote: Vote[]): Promise<void> => axios.post("/api/votes", vote),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["votes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["voted"],
      });
    },
  });
};

export const useVoted = (id: string) => {
  return useQuery({
    queryKey: [`voted`, id],
    staleTime: 0 * 60 * 60 * 24,

    queryFn: (): Promise<number> =>
      axios.get(`/api/votes/voted?id=${id}`).then((res) => res.data),
    enabled: !!id,
  });
};
//getVotes
export const useGetVotes = (position?: string) => {
  return useQuery({
    queryKey: ["votes"],
    refetchOnMount: true,
    staleTime: 10,
    enabled: !!position,
    queryFn: (): Promise<VoteFetched[]> =>
      axios
        .get("/api/votes", {
          params: { position },
        })
        .then((res) => res.data),
  });
};
