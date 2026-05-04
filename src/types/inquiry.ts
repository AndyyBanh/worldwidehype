import type { Database } from "../../types/supabase";

export type SellingInquiryInsert = Database["public"]["Tables"]["selling_inquiries"]["Insert"];
export type ShoeInquiryInsert = Database["public"]["Tables"]["shoe_inquiries"]["Insert"];
export type CollectibleInsert = Database["public"]["Tables"]["collectible_inquiries"]["Insert"];

export interface CreateInquiryRequest {
    name: string
    email: string
    phone_number: string
    location: "GTA" | "Across Canada" | "United States"
    shoes: ShoeInquiryInsert[]
    collectibles: CollectibleInsert[]
};

export const INQUIRY_STATUSES = ["pending", "contacted", "completed"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
