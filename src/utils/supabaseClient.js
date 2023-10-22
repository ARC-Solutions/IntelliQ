import dotenv from 'dotenv';
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const dbURL = process.env.SUPABASE_URL;
const annonKEY = process.env.DATABASE_ANON_KEY;
export const supabase = createClient('https://chsqklewhwodzfitkmcy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoc3FrbGV3aHdvZHpmaXRrbWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDE0NDMsImV4cCI6MjAxMjk3NzQ0M30.8nl99gSAAOSv16tvxAJvu8wBfdVrTMCWh_SQG8Jvtj8');