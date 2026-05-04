import { CollectibleInsert, InquiryStatus, SellingInquiryInsert, ShoeInquiryInsert } from "@/types/inquiry";
import { createClient } from "../supabase/server";

export async function createInquiry(
    inquiry: SellingInquiryInsert, 
    shoes: ShoeInquiryInsert[], 
    collectibles: CollectibleInsert[]
) {
    const supabase = await createClient();

    // create new entity selling inquiry in DB
    const { data, error } = await supabase.from("selling_inquiries")
    .insert(inquiry)
    .select()
    .single()

    if (error || !data) return {data: null, error};

    // map parent id to children marking many to one relation
    if (shoes.length > 0) {
        await supabase.from("shoe_inquiries")
        .insert(shoes.map(shoe => ({... shoe, inquiry_id: data.id})));
    }

    if (collectibles.length > 0) {
        await supabase.from("collectible_inquiries")
        .insert(collectibles.map(collectible => ({...collectible, inquiry_id: data.id})));
    }


    return {data, error: null};
}


export async function getInquiries(page: number = 0, limit: number = 20) {
    const supabase = await createClient();

    return supabase.from("selling_inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .range(page * limit, (page+1) * limit - 1);
}

export async function getInquiryById(id: string) {
    const supabase = await createClient();

    return supabase.from("selling_inquiries")
    .select(`
        *,
        shoe_inquiries(*),
        collectible_inquiries(*)
    `)
    .eq("id", id)
    .single();
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
    const supabase = await createClient();

    return supabase.from("selling_inquiries")
    .update({ status })
    .eq("id", id);
}

// If selling inquiry is deleted its children will also since cascade
export async function deleteInquiry(id: string) {
    const supabase = await createClient();

    return supabase.from("selling_inquiries")
    .delete()
    .eq("id", id);
}