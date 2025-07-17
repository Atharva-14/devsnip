import { connectDB } from "@/lib/db";
import Snippet from "@/models/Snippet";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const { title, language, tags, description, code } = body;
    if (!title || !language || !tags || !description || !code) {
      return new Response("Missing required fields", { status: 400 });
    }

    const snippet = await Snippet.create({
      title,
      language,
      tags,
      description,
      code,
    });

    return new Response(
      JSON.stringify({ message: "Snippet created successfully" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in POST /api/snippets:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  await connectDB();
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(snippets), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/snippets:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
