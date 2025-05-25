import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import generateRoutes from './routes/generate.js';
import scriptRoutes from './routes/script.js';
import dashboardRoutes from './routes/dashboard.js';
import calendarRoutes from "./routes/calender.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/generate', generateRoutes);
app.use('/script',scriptRoutes);
app.use('/dashboard', dashboardRoutes);
app.use("/calendar", calendarRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`);
});

