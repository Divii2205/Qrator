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

export async function geminiScript(topic,tone = 'casual'){
  const url=`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const body={
    contents:[
      {parts:[{text: `Write a full YouTube video script about "${topic}" in a ${tone} tone. Include a hook, intro, 3 main points, and a call-to-action.`}]}
    ]
  };

  const response =await axios.post(url, body);
  const text =response.data.candidates[0]?.content?.parts[0]?.text || '';
  return text;
}


