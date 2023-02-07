import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cotikmecrrykjmssypxs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdGlrbWVjcnJ5a2ptc3N5cHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3NDMzMzksImV4cCI6MTk5MTMxOTMzOX0.vpBq2Kh1jo_DRQR3oHsFpOyOcVzjK6vZ2tpg33ROCx8"

console.log(supabaseUrl,  supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
