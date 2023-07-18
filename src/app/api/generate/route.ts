import {ChatGPTMessage, OpenAIStream, OpenAIStreamPayload} from "@/app/utils/openAIStream";
import {defaultMode, maxToken} from '../../settings';
import {Modes} from "@/app/types/interfaces";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

// Do not DELETE me!
export const config = {
  runtime: "edge",
};

export async function POST(req: Request): Promise<Response> {
  const { prompt, model, messages, mode } = (await req.json()) as {
    prompt?: string;
    mode: Modes[];
    model: string;
    messages: ChatGPTMessage[];
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  if(mode) {
    const content = mode.length > 1 ? mode.map(obj => obj.action).join('') : defaultMode;
    messages.unshift({ role: 'system', content: content });
  }

  // [{ role:'user', content: prompt }]
  const payload: OpenAIStreamPayload = {
    model: model,
    messages: messages,
    temperature: 0.7,
    max_tokens: maxToken,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}