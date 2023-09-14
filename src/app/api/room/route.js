import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();
  const rooms = request.nextUrl.searchParams.get("rooms");

  let filtered = DB.rooms;
  if (rooms !== null) {
    filtered = filtered.filter((std) => std.rooms === rooms);
  }

  writeDB();

  return NextResponse.json({
    ok: true,
    rooms: filtered,
    totalRooms: `${rooms.length}`,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  const body = await request.json();
  const { roomName } = body;

  console.log(payload.role);
  if (payload === null) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  const foundRoom = DB.rooms.find((x) => x.roomName === roomName);
  if (!foundRoom) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${body.roomName} already exists`,
      },
      { status: 400 }
    );
  }

  const roomId = nanoid();

  //call writeDB after modifying Database
  DB.rooms.push({
    roomName,
  });
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${body.roomName} has been created`,
  });
};
