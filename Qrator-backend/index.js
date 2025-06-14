import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import generateRoutes from './routes/generate.js';
import scriptRoutes from './routes/script.js';
import dashboardRoutes from './routes/dashboard.js';
import calendarRoutes from "./routes/calender.js";

import seoRoutes from './routes/seo.js';
const app = express();

app.use(cors({
  origin: ["https://qrator-pi.vercel.app", "http://localhost:5173"]
}));
app.use(express.json());
app.use(express.urlencoded({extended : true})) 
app.use('/generate', generateRoutes);
app.use('/script',scriptRoutes);
app.use('/dashboard', dashboardRoutes);
app.use("/calendar", calendarRoutes);

app.use('/seo', seoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
  console.log(`Server running on https://qrator-pi.vercel.app/${PORT}`);
});

