import { ApiError, GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Convert this code to Python and explain what problem it solves:
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

        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof ApiError) {
            console.error(error.message)
            return NextResponse.json(
                { error: error.message },
                { status: error.status }
            )
        } else {
            console.error(error)
            return NextResponse.json(
                { error: "Failed to generate response" },
                { status: 500 }
            );
        }
    }
}