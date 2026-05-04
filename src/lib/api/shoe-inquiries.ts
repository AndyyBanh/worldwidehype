import { Database } from "../../../types/supabase";
import { createClient } from "../supabase/server";

export async function getShoeInquiriesById(id: string) {
    const supabase = await createClient();

    return supabase.from("shoe_inquiries")
    .select("*")
    .eq("id", id)
    .single();
}

export async function deleteShoeInquiry(id: string) {
     const supabase = await createClient();

    return supabase.from("shoe_inquiries")
    .delete()
    .eq("id", id);
}