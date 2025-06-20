// supabase/client.js

const SUPABASE_URL = 'https://owdnagyiuefjhuaqgacj.supabase.co'; // <-- INCOLLA QUI L'URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZG5hZ3lpdWVmamh1YXFnYWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NDU3MDcsImV4cCI6MjA2NjAyMTcwN30.QjG3HNICF30FLPgzcIyhmJTVd9cUaQjEQIEurOtn7JY'; // <-- INCOLLA QUI LA CHIAVE

// MODIFICA CHIAVE: Aggiungiamo un'opzione per disabilitare la persistenza
const supabaseOptions = {
  auth: {
    persistSession: false,
  },
};

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, supabaseOptions);