import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Candidate from "@/utils/models/Candidate";
import { CandidateFetched } from "@/types";
import User from "@/utils/models/User";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await db();
    const _id = request.nextUrl.searchParams.get("id");
    User;
    const candidate = await Candidate.findOne({
      $or: [{ _id }, { userId: _id }],
    }).populate("userId");
    const candidateWithUser = {
      ...candidate.toJSON(),
      user: candidate.userId,
      userId: candidate.userId._id,
    };

    return NextResponse.json(candidateWithUser);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
