import express from 'express';
import {geminigenerate} from '../services/Gemini.js';
import supabase from '../utils/supabaseClient.js';
const router= express.Router();

router.post('/idea',async(req,res)=> {
  console.log('BODY:', req.body);
  const {goal , tone , targetAudience , contentType} = req.body

  if (!tone || !targetAudience || !contentType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const prompt = goal && goal.trim() !== "" ?
  `Generate a ${tone} ${contentType} idea title for the following goal: "${goal}". The target audience is: ${targetAudience}.`
  : `Generate a ${tone} ${contentType} idea title. The target audience is: ${targetAudience}.`;


  try{
    const ideas = await geminigenerate(prompt);

    for(const idea of ideas) {
      await supabase.from('ideas').insert([
        {
          idea_text:idea,
          created_at:new Date().toISOString(),
        },
      ]);
    }
    res.status(200).json({ideas});
  }
  catch(err){
    console.error('Error generating ideas:',err.message);
    res.status(500).json({error:'Failed to generate ideas'});
  }
});
export default router;
