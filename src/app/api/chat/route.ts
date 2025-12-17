import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cvSystemPrompt } from "@/app/prompts/cvPrompt";

// Simple in-memory rate limiter (for development)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 10; // Adjust based on your quota

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(req: Request) {
  // const { messages } = await req.json();

  try {
    // const { message } = await req.json();
    const { message } = await req.json();
    // const lastMessage = message[message.length - 1];
const identifier = req.headers.get("x-forwarded-for") || "default";

    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { 
          error: "Rate limit exceeded. Please wait a minute before trying again.",
          retryAfter: 60 
        },
        { status: 429 }
      );
    }
    const prompt = `${cvSystemPrompt}\nUser: ${message}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("CHAT API ERROR:", error);

    if (error instanceof Error && "status" in error && error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
