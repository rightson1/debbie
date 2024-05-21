import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Vote from "@/utils/models/Vote";
import { Types } from "mongoose";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await db();
    const voterId = request.nextUrl.searchParams.get("id");
    if (!voterId) {
      return new NextResponse(
        JSON.stringify({ message: "voterId is required" }),
        { status: 400 }
      );
    }
    const votes = await Vote.find({
      voterId: new Types.ObjectId(voterId),
    }).countDocuments();
    return new NextResponse(JSON.stringify(votes), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
