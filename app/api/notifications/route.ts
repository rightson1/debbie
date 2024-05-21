import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Notification from "@/utils/models/Notification";
import { NotificationFetched } from "@/types";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  await db();
  const body = await request.json();
  const notification = await Notification.create(body);
  return NextResponse.json(notification);
}

export async function PUT(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const updatedNotification = await Notification.findOneAndUpdate(
      {
        _id: body._id,
      },
      { $addToSet: { views: body.userId } },
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedNotification), {
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
    const id = request.nextUrl.searchParams.get("id");

    const notifications = await Notification.find({
      views: { $nin: [id] },
    });
    return new NextResponse(JSON.stringify(notifications), {
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
//delete by id

export async function DELETE(request: NextRequest) {
  try {
    await db();
    const id = request.nextUrl.searchParams.get("id");
    const deletedNotification = await Notification.findOneAndDelete({
      _id: id,
    });
    return new NextResponse(JSON.stringify(deletedNotification), {
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
