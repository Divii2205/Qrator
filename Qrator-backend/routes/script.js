import express from 'express';
import {geminiScript} from '../services/Gemini.js';
import supabase from '../utils/supabaseClient.js';
const router = express.Router();

router.post('/text',async (req, res)=>{
  const {userId,ideaText,tone} =req.body;
  if(!userId || !ideaText){
    return res.status(400).json({error:'userId and ideaText are required'});
  }
  try{
    console.log('🧠 Calling Gemini with:', { topic: ideaText, tone });
    const script =await geminiScript(ideaText,tone);
    console.log('🧠 Generated script:', script);

    // 📝 Log what you're about to insert into Supabase
    const payload = {
      user_id: userId,
      script_text: script,
      created_at: new Date().toISOString()
    };
    console.log('📝 Insert payload:', payload);
    const {data,error} =await supabase.from('Scripts').insert([payload]);
    console.log("supabase insert data:",data)
    console.log("supabase insert error",error)
    if(error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message || error });
    }
    res.status(200).json({script});
  }
   catch(err){
    console.error('Script generation error:',err);
    res.status(500).json({ error: 'Failed to generate script'});
  }
});
export default router;
