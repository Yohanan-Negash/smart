import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPEN_AI_KEY;
const baseUrl = 'https://api.openai.com/v1/chat/completions';
const model = 'gpt-3.5-turbo';
const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(request: Request) {
  const requestBody = await request.json();

  const goal = requestBody.goal;

  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      { role: 'user', content: goal },
      {
        role: 'system',
        content: `Transform the following regular goal: ${goal} into a single, comprehensive S.M.A.R.T. goal using the S.M.A.R.T. methodology`,
      },
    ],
  });

  return NextResponse.json(response.choices[0].message.content);
}
