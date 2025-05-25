import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiidxodoixzmabpcuast.supabase.co'; // ← Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9paWR4b2RvaXh6bWFicGN1YXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjE1MzQsImV4cCI6MjA2MzIzNzUzNH0.TyiqrQfkyyaUmaIyG2YawN65SCT2ZwbJFW5n2qqvANU'; // ← Replace with your Supabase anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
