export async function GET() {
  return new Response(JSON.stringify({
    status: 'ok',
    hasMistralKey: !!process.env.MISTRAL_API_KEY,
    mistralKeyLength: process.env.MISTRAL_API_KEY?.length || 0,
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
