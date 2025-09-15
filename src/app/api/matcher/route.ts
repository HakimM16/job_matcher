// This is where the mistral api route is defined.
import MistralClient from '@mistralai/mistralai';
import { MistralStream, StreamingTextResponse } from 'ai';
 
const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { prompt } = await req.json();
 
  const response = mistral.chatStream({
    model: 'mistral-large-latest',
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
      <li>Entry: $...</li>
      <li>Mid: $...</li>
      <li>Senior: $...</li>
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
 
  const stream = MistralStream(response);
 
  return new StreamingTextResponse(stream);
}