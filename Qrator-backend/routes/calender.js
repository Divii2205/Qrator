import express from "express";
import supabase from "../utils/supabaseClient.js";

const router = express.Router();

// Add a new event
router.post("/", async (req, res) => {
  const { user_id, event, publish_date } = req.body;

  if (!user_id || !event || !publish_date) {
    return res.status(400).json({ error: "user_id, event, and publish_date are required" });
  }

   const { data, error } = await supabase
    .from("ContentCalendar")
    .insert([{ user_id, event, publish_date }])
    .select();

   if (error) return res.status(500).json({ error: error.message });

  if (!data || data.length === 0) {
    return res.status(500).json({ error: "Insert succeeded but no data returned" });
  }

  res.status(201).json(data[0]);
});

//Get all the calender eventsof a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("ContentCalendar")
    .select("*")
    .eq("user_id", userId)
    .order("publish_date", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

// update an event by id of calender
 router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { event, publish_date } = req.body;

  const { data, error } = await supabase
    .from("ContentCalendar")
    .update({ event, publish_date })
    .eq("id", id)
    .select(); 

  if (error) return res.status(500).json({ error: error.message });

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No event found with the given id" });
  }

  res.status(200).json(data[0]);
});

 
// Delete an event by id of calender
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

   const { error } = await supabase
    .from("ContentCalendar")
    .delete()
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(204).send();
});

export default router;
