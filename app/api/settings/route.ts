import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Settings from "@/utils/models/Settings";
import { SettingsFetched } from "@/types";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  await db();
  const body = await request.json();
  const settings = await Settings.create(body);
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<SettingsFetched> = await request.json();
    const updatedSettings = await Settings.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedSettings), {
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

    const settings = await Settings.findOne({ main: true });
    return NextResponse.json(settings);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
