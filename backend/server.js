import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import connectDB from './db/connectDB.js';
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
})
