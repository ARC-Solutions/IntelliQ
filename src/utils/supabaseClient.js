import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const dbURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const annonKEY = process.env.NEXT_PUBLIC_DATABASE_ANON_KEY;

export const supabase = createClient(dbURL, annonKEY);
