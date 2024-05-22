import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Vote from "@/utils/models/Vote";
import { Types } from "mongoose";
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
    const position_raw = request.nextUrl.searchParams.get("position");
    const position = new Types.ObjectId(position_raw || "");
    console.log(position);
    const result = await Vote.aggregate([
      {
        $match: {
          position: position,
        },
      },
      {
        $group: {
          _id: "$candidateId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $unwind: "$candidate",
      },
      {
        $lookup: {
          from: "users",
          localField: "candidate.userId",
          foreignField: "_id",
          as: "candidateUser",
        },
      },
      {
        $unwind: "$candidateUser",
      },
      {
        $lookup: {
          from: "positions",
          localField: "candidate.position",
          foreignField: "_id",
          as: "position",
        },
      },
      {
        $unwind: "$position",
      },
      //project, i want to have, candidate name, candidate position, candidate votes and candidate id
      {
        $project: {
          candidateName: "$candidateUser.displayName",
          candidatePosition: "$position.name",
          candidateVotes: "$count",
          candidateId: "$_id",
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
