"use client";
import { useParams } from "next/navigation";
import EditCandidate from "@/components/EditCandidate";
import { useAuth } from "@/utils/AuthContext";
const Candidate = () => {
  const { user } = useAuth();

  return (
    <>
      <EditCandidate id={user._id} />
    </>
  );
};

export default Candidate;
