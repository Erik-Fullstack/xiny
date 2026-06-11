import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a coding expert.
                I want to know how I would write this code in Python?
                What problem does the code solve?
                Answer STRICTLY in this format:
                "{
                    "code": code snippet in python,
                    "problem": the problem the code solves
                }"\n\n${code}`,
        });

        return NextResponse.json({
            answer: response.text,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}