import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Candidate, CandidateFetched } from "@/types";
export const useAddCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (candidate: Candidate): Promise<void> =>
      axios.post("/api/candidates", candidate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidates"],
      });
    },
  });
};
export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (candidate: Candidate): Promise<void> =>
      axios.put("/api/candidates", candidate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidates"],
      });
    },
  });
};

export const useGetCandidates = () => {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: (): Promise<CandidateFetched[]> =>
      axios.get("/api/candidates").then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
export const useGetCandidate = (id: string) => {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: (): Promise<CandidateFetched> =>
      axios.get(`/api/candidates/single?id=${id}`).then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
//delete candidate
export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string): Promise<void> =>
      axios.delete(`/api/candidates?id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidates"],
      });
    },
  });
};
