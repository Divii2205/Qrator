import express from 'express';
import {geminigenerate} from '../services/Gemini.js';
import supabase from '../utils/supabaseClient.js';
const router= express.Router();

router.post('/idea',async(req,res)=> {
  const {userId,niche} = req.body;
  // console.log(req.body)
  const {goal , tone , targetAudience , contentType} = req.body
  // console.log(goal , tone)

  if(!userId || !niche) {
    return res.status(400).json({ error: 'userId and niche are required'});
  }

  try{
    const ideas = await geminigenerate(niche);

    for(const idea of ideas) {
      await supabase.from('ideas').insert([
        {
          user_id:userId,
          idea_text:idea,
          created_at:new Date().toISOString(),
        },
      ]);
    }
    res.status(200).json({ideas});
  }
  catch(err){
    console.error('Error generating ideas:',err.message);
    res.status(500).json({err:'Failed to generate ideas'});
  }
});
export default router;
