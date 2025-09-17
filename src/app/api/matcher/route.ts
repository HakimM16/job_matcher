// This is where the mistral api route is defined.
import MistralClient from '@mistralai/mistralai';
import { MistralStream, StreamingTextResponse } from 'ai';
 
const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);
    
    // useCompletion sends data in 'prompt' field
    const prompt = body.prompt;
    console.log('Extracted prompt:', prompt);

    if (!prompt) {
      return new Response('No prompt provided', { status: 400 });
    }

    if (!process.env.MISTRAL_API_KEY) {
      console.error('MISTRAL_API_KEY not found in environment variables');
      return new Response('API key not configured', { status: 500 });
    }
 
   //  console.log('About to call Mistral API with model: open-mistral-7b');
   //  console.log('API Key exists:', !!process.env.MISTRAL_API_KEY);
   //  console.log('API Key length:', process.env.MISTRAL_API_KEY?.length);

   //  // Test if API key works with a simple call first
   //  try {
   //    console.log('Testing Mistral API connection...');
   //    const testResponse = await mistral.chat({
   //      model: 'open-mistral-7b',
   //      messages: [{ role: 'user', content: 'Hello' }],
   //    });
   //    console.log('Test response received:', !!testResponse);
   //  } catch (testError: any) {
   //    console.error('Mistral API test failed:', testError);
   //    return new Response(`Mistral API error: ${testError?.message || 'Unknown error'}`, { status: 500 });
   //  }
 
    const response = await mistral.chatStream({
    model: 'open-mistral-7b',
    messages: [{ 
      role: 'user',
      content: `CONTEXT: You are a career coach and labor market analyst.
You are funny and witty, with an edge. You talk like a mentor hyping the user up.
Tailor advice to the candidate's profile and keep it encouraging and concrete.
-------
TASK: 
- Analyze the resume below.
- Output: suggested career, skill gap analysis, salary predictions, and career path suggestions.
- Keep bullets concise (<= 80 chars each) and practical.
- Write in a witty, upbeat tone with 1-2 light metaphors max.
- Always speak to the user in 'you'.
- With suggested career, give one clear job title that fits the resume best.
-------
RESUME:
${prompt}
-------
OUTPUT FORMAT: 
<Suggested Career>...</Suggested Career>
<Skill Gap Analysis>
   <ul>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      ...
   </ul>
</Skill Gap Analysis>
<Salary Predictions>
   <ul>
      <li>Entry: £...</li>
      <li>Mid: £...</li>
      <li>Senior: £...</li>
   </ul>
</Salary Predictions>
<Career Path Suggestions>
   <ul>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      ...
   </ul>
</Career Path Suggestions>`
    }],
  });
  
//   console.log('Mistral response received:', !!response);
//   console.log('Response type:', typeof response);
  
  if (!response) {
    console.error('Mistral API returned null/undefined response');
    return new Response('Mistral API returned empty response', { status: 500 });
  }
 
  const stream = MistralStream(response);
  //console.log('Stream created:', !!stream);
 
  return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response('Internal server error', { status: 500 });
  }
}