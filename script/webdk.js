import { createClient } from "@supabase/supabase-js"



export const getSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    return supabase
  }
  
export const getStepUser = async (sol_address) => {
    const supabase = getSupabaseClient()
    
    const { data: existingUser } = await supabase.from('step_user').select()
        .match({ sol_address }).single();
    if (!existingUser) {
        return null
    }
    return existingUser 
}

export const createStepUser = async (userData) => {
    const supabase = getSupabaseClient()
    const { data: newUser } = await supabase.from('step_user').insert({
        created_at: new Date().toISOString(),
        ...userData,
    }).select()
    return newUser
}
