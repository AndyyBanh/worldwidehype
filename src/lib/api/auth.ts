import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";

export async function requireAdminSession(): Promise<NextResponse | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return null;
}
