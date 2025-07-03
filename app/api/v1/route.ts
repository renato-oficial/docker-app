import OpenAI from "openai"

const modelName = "openai/gpt-4o";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ENDPOINT =  process.env.ENDPOINT;

export async function POST(request: Request) {
  const client = new OpenAI({ baseURL: ENDPOINT, apiKey: GITHUB_TOKEN });


  const { prompt } = await request.json();
  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName
  });
  return new Response(
    JSON.stringify({
      message: response.choices[0].message.content,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}