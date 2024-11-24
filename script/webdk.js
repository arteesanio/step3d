import { createClient } from "@supabase/supabase-js"


export const getSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    return supabase
  }

  export const createSolanaRequest = async (data) => {
    const supabase = getSupabaseClient()
    const { data: newRequest } = await supabase.from('solana_requests').insert({
        ...data,
    }).select()
    return newRequest
}
  export const getStepUserByTgId = async (tg_id) => {
    const supabase = getSupabaseClient()
    const { data: existingUser } = await supabase.from('step_user').select()
        .match({ telegram_id: tg_id }).single();
    return existingUser
  } 

  
export const getStepUserByAddress = async (sol_address) => {
    const supabase = getSupabaseClient()
    
    const { data: existingUser } = await supabase.from('step_user').select()
        .match({ sol_address }).single();
    if (!existingUser) {
        return null
    }
    return existingUser 
}

export const getStepUser = async (tg_id, sol_address) => {
    const supabase = getSupabaseClient()
    const { data: existingUser } = await supabase.from('step_user').select()
        .match({ telegram_id: tg_id, sol_address: sol_address }).single();
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

export async function checkExistingSolanaRequest(solAddress) {
    console.log("checkExistingSolanaRequest solAddress", solAddress);
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('solana_requests')
        .select()
        .match({ sol_address: solAddress })


        .single();
    
    if (error && error.code !== 'PGRST116') {
        throw error;
    }
    
    console.log("data", data);
    return data;
}
export async function checkExistingSolanaRequestWithTg(solAddress, tg_id) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('solana_requests')
        .select()
        .match({ sol_address: solAddress, telegram_id: tg_id })
        .single();
    if (error && error.code !== 'PGRST116') {
        throw error;
    }
    return data;
}
export async function checkExistingStepUser(solAddress) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('step_user')
        .select()
        .eq('sol_address', solAddress)
        .single();
    
    if (error && error.code !== 'PGRST116') {
        throw error;
    }
    
    return data;
}
