import express from 'express';
import {generateSeo} from '../services/Gemini.js';
import supabase from '../utils/supabaseClient.js';
const router = express.Router();

router.post('/',async(req,res)=>{
  const {userId,topic,tone,scriptId,ideaId} = req.body;
  if(!userId || !topic){
    return res.status(400).json({error:'userId and topic are required'});
  }
  try{
    const seo =await generateSeo(topic,tone);
    console.log('🧠Generated SEO:',seo);
    const {data,error} =await supabase.from('SEOData').insert([
      {
        user_id: userId,
        script_id: scriptId || null,
        idea_id: ideaId || null,
        title: seo.title,
        description: seo.description,
        hashtags: seo.hashtags,
        created_at: new Date().toISOString()
      }
    ]);

    if(error) throw error;
    res.status(200).json({seo});
  } 
  catch (err){
    console.error('SEO generation error:',err);
    res.status(500).json({error:'Failed to generate SEO content'});
  }
});

export default router;
