import axios from 'axios';
import 'dotenv/config';

const API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro-vision-latest:generateContent?key=${API_KEY}`;

    const body = {
      contents: [
        {
          parts: [
            {
              text: "Give me 3 YouTube video titles about tech gadgets."
            }
          ]
        }
      ]
    };

    const res = await axios.post(url, body);
    console.log("✅ Success:", res.data);
  } catch (err) {
    console.error("Error:", err.response?.status, err.response?.data || err.message);
  }
}

testGemini();
