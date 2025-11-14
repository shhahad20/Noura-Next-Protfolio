import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cvSystemPrompt } from "@/app/prompts/cvPrompt";

export async function POST(req: Request) {
  // const { messages } = await req.json();

  try {
    // const { message } = await req.json();
    const { message } = await req.json();
    const lastMessage = message[message.length - 1];

    const prompt = `${cvSystemPrompt}\nUser: ${lastMessage.content}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
