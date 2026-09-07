import { ApiError, GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Conversion from "@/models/Conversion";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { code, firstLang, finalLang, variables } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Convert this ${firstLang} code to ${finalLang} and explain what problem it solves:
                ${code}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            code: { type: "string" },
            problem: { type: "string" },
          },
          required: ["code", "problem"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response text from AI");
    }

    const data = JSON.parse(response.text);

    // Save to database
    try {
      await dbConnect();
      await Conversion.create({
        sourceLanguage: firstLang,
        targetLanguage: finalLang,
        pythonCode: data.code,
        variables: variables || [],
        problemDescription: data.problem,
      });
    } catch (dbError) {
      console.error("Failed to save conversion to database:", dbError);
      // We don't throw here to still return the converted code to the user
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(error.message);
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    } else {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 },
      );
    }
  }
}
