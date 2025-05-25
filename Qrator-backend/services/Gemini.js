import axios from 'axios';
export async function geminigenerate(niche) {
  // const url =`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const url =`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [{ text: `Give me 3 engaging YouTube video ideas for a channel about ${niche}. Only return the titles.`}],
      },
    ],
  };

  try{
    const response =await axios.post(url, body);
    const text = response.data.candidates[0]?.content?.parts[0]?.text || '';
    const ideas = text.split('\n').map(line => line.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
    return ideas;
  }
  catch (err) {
    console.error('Gemini Error:', err.message);
    throw err;
  }
}

export async function geminiScript(topic,tone = 'casual') {
  const url =`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const body = {
    contents: [
      {
        parts: [
          {
            text: `Write a full YouTube video script about "${topic}" in a ${tone} tone. Include a hook, intro, 3 main points, and a call-to-action.`
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, body);
    const text = response.data.candidates[0]?.content?.parts[0]?.text || '';
    console.log('Gemini raw SEO response:', text);
    return text;
  } catch (err) {
    console.error('Gemini Script Error:', err.message);
    throw err;
  }
}

export async function generateSeo(topic,tone ='casual'){
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const prompt = `You are a YouTube SEO assistant. Generate SEO content for a video titled: "${topic}" in a ${tone} tone. Only respond with raw JSON in the format below, without code blocks or commentary:
  {
  "title": "Optimized video title here",
  "description": "Short, engaging YouTube description (2–3 sentences).",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
}`;
  const body = {contents:[{parts:[{text:prompt}]}]};

  const response = await axios.post(url,body);
  const text = response.data.candidates[0]?.content?.parts[0]?.text || ''
  console.log('🔍 Raw SEO response from Gemini:', text);
  try {
  // Try to find the first JSON block in the text
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    return JSON.parse(match[0]);
  } else {
    throw new Error('No JSON found in Gemini response');
  }
} catch (err) {
  console.error('⚠️ Failed to parse SEO JSON:', text);
  throw new Error('Failed to parse SEO response');
}
}




