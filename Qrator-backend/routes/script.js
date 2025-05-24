import express from 'express';
import {geminiScript} from '../services/Gemini.js';
import supabase from '../utils/supabaseClient.js';
const router = express.Router();

router.post('/',async (req, res)=>{
  const {userId,ideaText,tone} =req.body;
  if(!userId || !ideaText){
    return res.status(400).json({error:'userId and ideaText are required'});
  }
  try{
    const script =await geminiScript(ideaText,tone);
    const {_,error} =await supabase.from('scripts').insert([
      {
        user_id: userId,
        idea_text: ideaText,
        script_text: script,
        created_at: new Date().toISOString()
    }
    ]);

    if(error) throw error;

    res.status(200).json({script});
  }
   catch(err){
    console.error('Script generation error:',err.message);
    res.status(500).json({ error: 'Failed to generate script'});
  }
});
export default router;
