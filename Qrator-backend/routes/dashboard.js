import express from "express";
import supabase from "../utils/supabaseClient.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // 🧠 Get idea titles
    const { data: ideas, error: ideaError } = await supabase
      .from("ideas")
      .select("idea_text")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

      

    if (ideaError) throw ideaError;

    // 🖼️ Get thumbnail URLs
    /*const { data: thumbnails, error: thumbnailError } = await supabase
      .from("thumbnails")
      .select("image_url")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (thumbnailError) throw thumbnailError;*/

    // 📝 Get script text
    const { data: scripts, error: scriptError } = await supabase
      .from("scripts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
      

    if (scriptError) throw scriptError;

    res.status(200).json({
      ideas,
      scripts
    });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.status(500).json({ error: "Failed to fetch dashboard data", detail: err.message });
  }
});

export default router;
