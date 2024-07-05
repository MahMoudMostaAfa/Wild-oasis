import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://iaiadlibxklcwhnjeabg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhaWFkbGlieGtsY3dobmplYWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3Nzc0MzMsImV4cCI6MjAzMzM1MzQzM30._2tfEo1CT1Bd4U7O_lUzphcUhFCOA57URfMaCH0UaHU";
const supabase = createClient(supabaseUrl, supabaseKey);
// when i create new user i dont wannt to delete current session token
export const supabase2 = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "s1",
  },
});
export default supabase;
