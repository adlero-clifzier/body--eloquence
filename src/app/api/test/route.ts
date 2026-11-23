import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM ConnectionTest ORDER BY id DESC",
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to retrieve records" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const [result] = await pool.execute(
      "INSERT INTO ConnectionTest (message) VALUES (?)",
      [message],
    );

    return NextResponse.json(
      {
        message: "Record created successfully",
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create record",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
