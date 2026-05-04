import { createInquiry, getInquiries } from "@/lib/api/inquiries";
import { requireAdminSession } from "@/lib/api/auth";
import { CreateInquiryRequest } from "@/types/inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body: CreateInquiryRequest = await req.json();

    if (!body.name || !body.email || !body.phone_number || !body.location) {
        return NextResponse.json(
            { error: "Missing Required fields" },
            { status: 400 } 
        )
    }

    if (body.shoes.length == 0 && body.collectibles.length == 0) {
        return NextResponse.json(
            { error: "Must include at least one item" },
            { status: 400 }
        )
    }

    const { data, error } = await createInquiry({
        name: body.name,
        email: body.email,
        phone_number: body.phone_number,
        location: body.location,
    },
        body.shoes ?? [],
        body.collectibles ?? []
    )

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
}


export async function GET(req: NextRequest) {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    const page = Number(req.nextUrl.searchParams.get("page") ?? 0);

    const { data, error } = await getInquiries(page);

    if (error) {
        return NextResponse.json({ error: error.message },  { status: 500 });
    }

    return NextResponse.json(data);
}