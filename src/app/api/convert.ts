import { NextResponse } from 'next/server';

const apiKey = process.env.OPENAI_KEY;
const baseUrl = 'https://api.openai.com/v1/chat/completions';
const model = 'gpt-3.5-turbo';

export async function POST(request: Request) {
  const { goal } = request.body;

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 500,
        prompt: `Transform the following regular goal: ${goal} into a single, comprehensive S.M.A.R.T. goal using the S.M.A.R.T. methodology`,
      }),
    });

    const convertedGoal = response.formData.choices[0].text;
    console.log(convertedGoal);
  } catch (err) {
    console.error(`Error: ${error}`);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
