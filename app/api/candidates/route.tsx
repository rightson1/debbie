import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Candidate from "@/utils/models/Candidate";
import { CandidateFetched } from "@/types";
import User from "@/utils/models/User";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  await db();
  const body = await request.json();
  const candidate = await Candidate.find({
    userId: body.userId,
  }).countDocuments();
  if (candidate === 0) {
    const candidate = await Candidate.create(body);
    return NextResponse.json(candidate);
  } else {
    return NextResponse.json({ message: "Candidate already exists" });
  }
}

export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<CandidateFetched> = await request.json();
    const updatedCandidate = await Candidate.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedCandidate), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await db();
    User;
    //sort , the latest candidate will be on top, use created at
    const candidates = await Candidate.find({}).populate("userId").sort({
      createdAt: -1,
    });
    ///userId to user
    const candidatesWithUser = candidates.map((candidate) => {
      return {
        ...candidate.toJSON(),
        user: candidate.userId,
        userId: candidate.userId._id,
      };
    });

    return NextResponse.json(candidatesWithUser);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//delete by id

export async function DELETE(request: NextRequest) {
  try {
    await db();
    const id = request.nextUrl.searchParams.get("id");
    const deletedCandidate = await Candidate.findOneAndDelete({
      _id: id,
    });
    return new NextResponse(JSON.stringify(deletedCandidate), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
