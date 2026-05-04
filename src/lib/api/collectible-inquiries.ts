import { createClient } from "../supabase/server";


export async function getCollectibleById(id: string) {
    const supabase = await createClient();

    return supabase.from("collectible_inquiries")
    .select("*")
    .eq("id", id)
    .single();
}

export async function deleteCollectibleInquiry(id: string) {
    const supabase = await createClient();

    return supabase.from("collectible_inquiries")
    .delete()
    .eq("id", id);
}