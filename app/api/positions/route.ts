import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Position from "@/utils/models/Position";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const position = await Position.create(body);
    return NextResponse.json(position);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const updatedPosition = await Position.findOneAndUpdate(
      {
        _id: body._id,
      },
      body.name,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedPosition), {
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
    if (id) {
      const position = await Position.findById(id);
      return new NextResponse(JSON.stringify(position), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const positions = await Position.find();
      return new NextResponse(JSON.stringify(positions), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
    const deletedPosition = await Position.findOneAndDelete({
      _id: id,
    });
    return new NextResponse(JSON.stringify(deletedPosition), {
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
