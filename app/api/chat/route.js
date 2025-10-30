import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';

    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
    const streamResult = await model.generateContentStream(lastUserMsg);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of streamResult.stream) {
          const text = chunk.text();
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
