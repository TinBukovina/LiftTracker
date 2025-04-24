import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fozpfbmnqlnkozcgaftk.supabase.co";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
