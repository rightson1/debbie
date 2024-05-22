"use client";
import { useParams } from "next/navigation";
import EditCandidate from "@/components/EditCandidate";
const Candidate = () => {
  const params = useParams();
  const id = params.candidate as string;

  return (
    <>
      <EditCandidate id={id} />
    </>
  );
};

export default Candidate;
