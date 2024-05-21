import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Vote from "@/utils/models/Vote";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  await db();
  const body = await request.json();
  const vote = await Vote.insertMany(body);

  return NextResponse.json(vote);
}

export async function GET(request: NextRequest) {
  try {
    await db();
    const result = await Vote.aggregate([
      {
        $group: {
          _id: "$candidateUserId", // Group by candidateUserId
          candidateName: { $first: "$candidateUserId" }, // Get the candidate name
          post: { $first: "$post" }, // Get the post
          totalVotes: { $sum: 1 }, // Count the votes per candidate
        },
      },
      {
        $lookup: {
          from: "users", // The name of the candidates collection
          localField: "_id", // The field from the votes collection
          foreignField: "_id", // The field from the candidates collection
          as: "candidateInfo",
        },
      },
      {
        $unwind: "$candidateInfo",
      },
      {
        $project: {
          id: "$_id", // Rename the _id field,
          label: "$candidateInfo.displayName", // Rename the candidateName field
          post: 1, // Include the post field
          value: "$totalVotes", // Rename the totalVotes field
        },
      },
    ]);

    // Return the result as JSON
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
