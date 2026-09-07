import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Conversion from "@/models/Conversion";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ conversions: [] });
    }

    await dbConnect();

    // Simple text search on problemDescription
    const conversions = await Conversion.find({
      problemDescription: { $regex: query, $options: "i" },
    }).limit(10);

    return NextResponse.json({ conversions });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search conversions" },
      { status: 500 },
    );
  }
}
