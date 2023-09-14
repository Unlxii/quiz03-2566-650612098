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
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];

  role = checkToken;

  readDB();
  const rooms = request.nextUrl.searchParams.get("rooms");

  let filtered = DB.rooms;
  if (rooms !== null) {
    filtered = filtered.filter((std) => std.rooms === rooms);
  }

  if (found) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: `Room ${"replace this with room name"} already exists`,
  //   },
  //   { status: 400 }
  // );

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
