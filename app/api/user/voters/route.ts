import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import User from "@/utils/models/User";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await db();
    const users = await User.find({
      admin: false,
    });
    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
