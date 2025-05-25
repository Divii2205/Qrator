// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiidxodoixzmabpcuast.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9paWR4b2RvaXh6bWFicGN1YXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjE1MzQsImV4cCI6MjA2MzIzNzUzNH0.TyiqrQfkyyaUmaIyG2YawN65SCT2ZwbJFW5n2qqvANU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
