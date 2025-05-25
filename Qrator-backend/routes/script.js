import express from "express";
import { geminiScript } from "../services/Gemini.js";
import supabase from "../utils/supabaseClient.js";
const router = express.Router();

router.post("/text", async (req, res) => {
  const { scriptType, targetAudience, duration, style, topic, keyPoints } =
    req.body;
  console.log(req.body);
  if (
    !topic ||
    !style ||
    !scriptType ||
    !duration ||
    !targetAudience ||
    !keyPoints
  ) {
    return res.status(400).json({
      error:
        "All fields are required: topic, style, scriptType, duration, targetAudience, keyPoints",
    });
  }

  const prompt = `Generate a ${style} ${scriptType} script for the topic "${topic}". Target audience: ${targetAudience}. Duration: ${duration}. Key points: ${keyPoints}.`;

  try {
    console.log("🧠 Calling Gemini with:", { prompt });
    const script = await geminiScript(prompt);
    console.log("🧠 Generated script:", script);

    // Insert into Supabase
    const payload = {
      script_text: script,
      created_at: new Date().toISOString(),
    };
    console.log("📝 Insert payload:", payload);
    const { data, error } = await supabase.from("scripts").insert([payload]);
    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message || error });
    }
    res.status(200).json({ script });
  } catch (err) {
    console.error("Script generation error:", err);
    res.status(500).json({ error: "Failed to generate script" });
  }
});
export default router;
